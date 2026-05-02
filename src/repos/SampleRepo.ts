import { getRandomInt } from '@src/common/utils/number-utils';
import Sample, { ISample, ISampleParams } from '@src/models/Sample.model';

import * as db from './db';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get one sample.
 */
async function getOne(id: number): Promise<ISample | null> {
  try {
    const result = await db.query<ISample>(
      'SELECT * FROM samples WHERE id = $1',
      [id],
    );
    const sample = Sample.new(result.rows[0]);
    return sample;
  } catch (error) {
    return null;
  }
}

/**
 * See if a sample with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const result = await db.query('SELECT 1 FROM samples WHERE id = $1', [id]);
  return result.rows.length > 0;
}

/**
 * Get all samples.
 */
async function getAll(): Promise<ISample[]> {
  const result = await db.query(
    'SELECT id, name, path, source, created FROM samples',
  );
  return result.rows as ISample[];
}

/**
 * Add one sample.
 */
async function add(sample: ISampleParams): Promise<number> {
  const result = await db.query(
    'INSERT INTO samples (name, path, source) VALUES ($1, $2, $3) RETURNING id',
    [sample.name, sample.path, 'default'],
  );
  return result.rows[0] as number;
}

/**
 * Update a sample.
 */
async function update(sample: ISample): Promise<void> {
  await db.query(
    'UPDATE samples SET name = $1, path = $2, source = $3 WHERE id = $4',
    [sample.name, sample.path, sample.source, sample.id],
  );
}

/**
 * Delete one sample.
 */
async function delete_(id: number): Promise<void> {
  await db.query('DELETE FROM samples WHERE id = $1', [id]);
}

// **** Unit-Tests Only **** //

/**
 * @testOnly
 *
 * Delete every sample record.
 */
async function deleteAll(): Promise<void> {
  await db.query('DELETE FROM samples');
}

/**
 * @testOnly
 *
 * Insert multiple samples.
 */
async function insertMultiple(
  samples: ISample[] | readonly ISample[],
): Promise<ISample[]> {
  const samplesF = [...samples];
  for (const sample of samplesF) {
    const result = await db.query(
      'INSERT INTO samples (name, path, source) VALUES ($1, $2, $3) RETURNING *',
      [sample.name, sample.path, sample.source],
    );
    Object.assign(sample, result.rows[0]);
  }
  return samplesF;
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  deleteAll,
  insertMultiple,
} as const;
