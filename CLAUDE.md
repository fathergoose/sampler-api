# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Hot-reload dev (nodemon + ts-node) + browser-sync, via concurrently
npm run dev:basic    # ts-node, no watch / no browser-sync
npm test             # vitest (NODE_ENV=test)
npm run lint         # ESLint
npm run format       # Prettier
npm run type-check   # tsc --noEmit
npm run build        # lint + tsc (tsconfig.prod.json) + copy static + seed dist db file
npm start            # Run the production build (must build first)
```

**Important:** dev mode does not type-check at runtime (`swc`/`ts-node` transpile-only). Always run `npm run type-check` separately, or rely on your IDE.

**Single test:** `npx vitest run tests/<file>.test.ts` (no test files exist yet under `tests/` — the suite was scaffolded but specs have not been added).

**Database (requires Docker):**
```bash
docker-compose up -d         # PostgreSQL on :5432, password: badpassword (see docker-compose.yml)
npx dbmate up                # Run pending migrations
npx dbmate new <name>        # Create a new migration
```
The `pg` client reads `PG*` env vars from `config/.env.development` (PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE).

## Architecture

Express 5 + TypeScript REST API with a strict layered pattern:

```
Route → Service → Repo → Storage (PostgreSQL)
```

- **Routes** (`src/routes/`) — parse/validate request shape with `parseReq` (jet-validators schemas), call the service, return the response. Per-resource routers are composed inside `src/routes/apiRouter.ts`.
- **Services** (`src/services/`) — business logic; throw `RouteError` (`src/common/utils/route-errors.ts`) for typed HTTP error responses.
- **Repos** (`src/repos/`) — data access only; no business logic. SQL goes through `db.query<T>()` in `src/repos/db.ts`, a thin generic wrapper around a `pg.Pool`.
- **Models** (`src/models/`) — TS interfaces, jet-validators `Schema`, plus factory (`new`) and type-guard (`isComplete`, `isCompleteNew`) helpers.

The API mounts at `/api` (see `Paths._` in `src/common/constants/Paths.ts`). Current resources: `samples` and `clips`. Note: `Paths.Clips._` is currently the same string as `Paths.Samples._` (`/samples`) — verify before adding new clip routes.

## File uploads

`POST /api/samples/add` accepts a multipart upload field `sampleFile` via `multer` configured in `src/repos/FileRepo.ts` (disk storage under `./uploads/`). The same directory is served as static at `/uploads` from `src/server.ts`. Sample/clip routes parse the JSON body field (`req.body.sample`, `req.body.clip`) and merge `req.file?.path` before validating.

## Database & migrations

`dbmate` manages migrations in `db/migrations/`. The current applied state is dumped to `db/schema.sql` — treat it as generated, not hand-edited. Two tables exist: `samples` (id, name, path, source, created; `path` is UNIQUE) and `clips` (id, name, start_at, end_at, gain, sample_id; FK → samples ON DELETE SET NULL).

Beware: SQL columns use snake_case (`start_at`, `sample_id`) but the TS interfaces and current repo queries use camelCase identifiers (e.g. `SELECT id, name, startAt, endAt, gain, sampleId FROM clips`). Postgres folds unquoted identifiers to lowercase, so these queries currently rely on case-insensitive resolution and will need explicit `AS` aliases or column renames if any column is added that breaks the mapping.

## Path aliases

`@src/*` → `src/` in TypeScript (`tsconfig`) and `dist/` in the built output (`package.json` `_moduleAliases`, registered via `module-alias/register` in `npm start`).

## Environment

Env vars are typed via `jet-env` in `src/common/constants/env.ts` — add new vars there. Per-environment values live in `config/.env.{development,test,production}`. `NODE_ENV` selects the file (test runner sets `NODE_ENV=test`).

## Conventions

- `Paths.ts` is the single source of truth for route path strings. Don't hardcode paths in routers.
- Throw `RouteError` from services for HTTP errors; the global error handler in `src/server.ts` formats them.
- Express request/response types are aliased as `Req`/`Res` in `src/routes/common/express-types.ts`.
- Validate request payloads with `parseReq({ field: model.isCompleteNew })` — failures throw `ValidationError`.
