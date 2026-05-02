import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool();

export function query<T extends QueryResultRow = Record<string, unknown>>(
  sql: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  return pool.query<T>(sql, params);
}
