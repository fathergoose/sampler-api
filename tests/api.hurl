# tests/api.hurl
#
# Integration tests for the clip API. Run with:
#   hurl --test --variable host=http://localhost:3000 tests/api.hurl
#
# Prereqs:
#   - npm run dev                       (server on :3000)
#   - docker-compose up -d && npx dbmate up
#   - tests/fixtures/silence.wav exists (content doesn't matter — multer
#     accepts anything; `mkdir -p tests/fixtures && dd if=/dev/zero \
#     of=tests/fixtures/silence.wav bs=1k count=1` is enough)
#
# Heads-up: as of this writing the clip router in src/routes/apiRouter.ts
# is defined but never .use()'d, and only `getAll` is registered. Wire the
# router up at Paths.Clips._ and add the POST/GetOne handlers before these
# tests will pass end-to-end.


# ─── List clips (smoke — works on an empty table) ────────────────────────
GET {{host}}/api/clips/all
HTTP 200
[Asserts]
jsonpath "$" isCollection


# ─── Seed: create a sample so the clip has something to FK to ────────────
POST {{host}}/api/samples/add
[MultipartFormData]
sample: {"name":"hurl-sample","path":"unused"}
sampleFile: file,fixtures/silence.wav; audio/wav
HTTP 201


# ─── Capture the sample id (POST returns no body, so re-fetch the list) ──
GET {{host}}/api/samples/all
HTTP 200
[Captures]
sample_id: jsonpath "$[?(@.name=='hurl-sample')].id" nth 0


# ─── Create a clip referencing that sample ───────────────────────────────
POST {{host}}/api/clips/add
[FormParams]
clip: {"name":"hurl-clip","startAt":0.5,"endAt":2.0,"gain":0.8,"sampleId":{{sample_id}}}
HTTP 201


# ─── List again — ours should be in there ────────────────────────────────
GET {{host}}/api/clips/all
HTTP 200
[Asserts]
jsonpath "$[?(@.name=='hurl-clip')]" count >= 1
[Captures]
clip_id: jsonpath "$[?(@.name=='hurl-clip')].id" nth 0


# ─── Fetch by id ─────────────────────────────────────────────────────────
GET {{host}}/api/clips/{{clip_id}}
HTTP 200
[Asserts]
jsonpath "$.name"     == "hurl-clip"
jsonpath "$.startAt"  == 0.5
jsonpath "$.endAt"    == 2.0
jsonpath "$.gain"     == 0.8
jsonpath "$.sampleId" == {{sample_id}}
