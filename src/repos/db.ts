import { Pool } from 'pg';

const pool = new Pool();

export const query = (text: string, params?) => {
  return pool.query(text, params);
};
