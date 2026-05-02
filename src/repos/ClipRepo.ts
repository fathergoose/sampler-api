import { getRandomInt } from '@src/common/utils/number-utils';
import Clip, { IClip, IClipParams } from '@src/models/Clip.model';

import * as db from './db';

async function getOne(id: number): Promise<IClip | null> {
  try {
    const result = await db.query('SELECT * FROM clips WHERE id = $1', [id]);
    const record = result.rows[0];
    if (record) {
      const clip = Clip.new(record);
      return clip;
    }
    return null;
  } catch (error) {
    console.error('Error: ' + error);
    return null;
  }
}

async function getAll(): Promise<IClip[]> {
  const result = await db.query(
    'SELECT id, name, startAt, endAt, gain, sampleId FROM clips',
  );
  return result.rows as IClip[];
}

async function add(clip: IClipParams): Promise<number> {
  const result = await db.query(
    'INSERT INTO clips (name, startAt, endAt, gain, sampleId) ' +
      'VALUES ($1, $2, $3, $4, $5) ' +
      'RETURNING id',
    [clip.name, clip.startAt, clip.endAt, clip.gain, clip.sampleId],
  );
  return result.rows[0] as number;
}

export default {
  getOne,
  getAll,
  add,
} as const;
