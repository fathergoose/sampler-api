/* eslint-disable no-console */
import { sql } from '@src/common/sql';
import Clip, {
  IClip,
  IClipParams,
  IClipWithSample,
  ClipRow,
} from '@src/models/Clip.model';

import * as db from './db';

async function getOne(id: number): Promise<IClip | null> {
  try {
    const result = await db.query<ClipRow>(sql`
      SELECT
        c.id,
        c.name,
        c.start_at AS "startAt",
        c.end_at AS "endAt",
        c.gain,
        c.created,
        c.sample_id AS "sampleId",
        s.id AS "sample_id",
        s.name AS "sample_name",
        s.path AS "sample_path",
        s.source AS "sample_source",
        s.created AS "sample_created"
      FROM
        clips c
        LEFT JOIN samples s ON s.id = c.sample_id
      WHERE
        c.id = ${id}
    `);
    const record = result.rows[0];
    if (record) {
      return Clip.fromRow(record);
    }
    return null;
  } catch (error) {
    console.error('Error: ' + error);
    return null;
  }
}

async function getAll(): Promise<IClipWithSample[]> {
  try {
    const result = await db.query<ClipRow>(sql`
      SELECT
        c.id,
        c.name,
        c.start_at AS "startAt",
        c.end_at AS "endAt",
        c.gain,
        c.created,
        c.sample_id AS "sampleId",
        s.id AS "sample_id",
        s.name AS "sample_name",
        s.path AS "sample_path",
        s.source AS "sample_source",
        s.created AS "sample_created"
      FROM
        clips c
        LEFT JOIN samples s ON s.id = c.sample_id
    `);
    const clips = result.rows.map(
      (record: ClipRow): IClipWithSample => Clip.fromRow(record),
    );

    return clips;
  } catch (error) {
    console.error('Error: ' + error);
    return [];
  }
}

async function add(clip: IClipParams): Promise<number> {
  const result = await db.query(sql`
    INSERT INTO
      clips (name, start_at, end_at, gain, sample_id)
    VALUES
      (
        ${clip.name},
        ${clip.startAt},
        ${clip.endAt},
        ${clip.gain},
        ${clip.sampleId}
      )
    RETURNING
      id
  `);
  return (result.rows[0]?.id ?? 0) as number;
}

const UPDATABLE_COLUMNS: Record<keyof IClipParams, string> = {
  name: 'name',
  startAt: 'start_at',
  endAt: 'end_at',
  gain: 'gain',
  sampleId: 'sample_id',
};

async function update(id: number, clip: Partial<IClipParams>): Promise<void> {
  const sets: string[] = [];
  const values: unknown[] = [];

  for (const [key, column] of Object.entries(UPDATABLE_COLUMNS)) {
    const value = clip[key as keyof IClipParams];
    if (value === undefined) continue;
    values.push(value);
    sets.push(`${column} = $${values.length}`);
  }

  if (sets.length === 0) return;

  values.push(id);

  await db.query({
    text: `UPDATE clips SET ${sets.join(', ')} WHERE id = $${values.length}`,
    values: values,
  });
}

export default {
  getOne,
  getAll,
  add,
  update,
} as const;
