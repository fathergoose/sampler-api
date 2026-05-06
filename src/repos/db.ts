import { SqlQuery } from '@src/common/sql';
import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool();

export function query<T extends QueryResultRow = Record<string, unknown>>(
  q: SqlQuery,
): Promise<QueryResult<T>> {
  return pool.query<T>(q.text, q.values);
}
