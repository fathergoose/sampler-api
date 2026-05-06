/* eslint-disable no-console */
import Sample, { ISample, ISampleParams } from '@src/models/Sample.model';

import * as db from './db';
import { sql } from '@src/common/sql';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get one sample.
 */
async function getOne(id: number): Promise<ISample | null> {
  try {
    const result = await db.query<ISample>(sql`
      SELECT
        *
      FROM
        samples
      WHERE
        id = ${id}
    `);
    const sample = Sample.new(result.rows[0]);
    return sample;
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}

/**
 * See if a sample with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const result = await db.query(sql`
    SELECT
      1
    FROM
      samples
    WHERE
      id = ${id}
  `);
  return result.rows.length > 0;
}

/**
 * Get all samples.
 */
async function getAll(): Promise<ISample[]> {
  const result = await db.query<ISample>(sql`
    SELECT
      id,
      name,
      path,
      source,
      created
    FROM
      samples
  `);
  return result.rows;
}

/**
 * Add one sample.
 */
async function add(sample: ISampleParams): Promise<void> {
  await db.query(sql`
    INSERT INTO
      samples (name, path, source)
    VALUES
      (
        ${sample.name},
        ${sample.path},
        ${'default'}
      )
  `);
}

/**
 * Update a sample.
 */
async function update(sample: ISample): Promise<void> {
  await db.query(sql`
    UPDATE samples
    SET
      name = ${sample.name},
      path = ${sample.path},
      source = ${sample.source}
    WHERE
      id = ${sample.id}
  `);
}

/**
 * Delete one sample.
 */
async function delete_(id: number): Promise<void> {
  await db.query(sql`
    DELETE FROM samples
    WHERE
      id = ${id}
  `);
}

// **** Unit-Tests Only **** //

/**
 * @testOnly
 *
 * Delete every sample record.
 */
async function deleteAll(): Promise<void> {
  await db.query(sql`DELETE FROM samples`);
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
    const result = await db.query(sql`
      INSERT INTO
        samples (name, path, source)
      VALUES
        (
          ${sample.name},
          ${sample.path},
          ${sample.source}
        )
      RETURNING
        *
    `);
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
