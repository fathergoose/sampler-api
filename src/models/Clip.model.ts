import {
  isNonEmptyString,
  isNullableUnsignedInteger,
  isNumber,
  isString,
  isUnsignedInteger,
} from 'jet-validators';
import { parseObject, Schema, testObject } from 'jet-validators/utils';

import { transformIsDate } from '@src/common/utils/validators';

import { Entity } from './common/types';
import { ISample } from './Sample.model';

/******************************************************************************
                                 Constants
******************************************************************************/

const getDefaults = (): IClip => ({
  id: 0,
  name: ' ',
  startAt: 0,
  endAt: 0,
  gain: 1,
  sampleId: null,
  created: new Date(),
});

const schema: Schema<IClip> = {
  id: isUnsignedInteger,
  name: isNonEmptyString,
  startAt: isNumber,
  endAt: isNumber,
  gain: isNumber,
  sampleId: isNullableUnsignedInteger,
  created: transformIsDate,
};

/******************************************************************************
                                  Types
******************************************************************************/

export interface IClipParams {
  name: string;
  startAt: number;
  endAt: number;
  gain: number;
  sampleId: number | null;
}

export interface IClipWithSample extends IClip {
  sample: ISample | null;
}

/**
 * @entity clip
 */
export interface IClip extends Entity, IClipParams {}

/******************************************************************************
                                  Setup
******************************************************************************/

// Set the "parseClip" function
const parseClip = parseObject<IClip>(schema);

// For the APIs make sure the right fields are complete
const isCompleteClip = testObject<IClip>({
  ...schema,
  name: isString,
  startAt: isNumber,
  endAt: isNumber,
  gain: isNumber,
  sampleId: isUnsignedInteger,
});

const isCompleteNewClip = testObject<IClipParams>({
  name: isString,
  startAt: isNumber,
  endAt: isNumber,
  gain: isNumber,
  sampleId: isUnsignedInteger,
});

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * New user object.
 */
function new_(clip?: Partial<IClip>): IClip {
  return parseClip({ ...getDefaults(), ...clip }, (errors) => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

export type ClipRow = {
  id: number;
  name: string;
  startAt: number;
  endAt: number;
  gain: number;
  created: Date;
  sampleId: number | null;
  sample_id: number | null;
  sample_name: string | null;
  sample_path: string | null;
  sample_source: string | null;
  sample_created: Date | null;
};

function newFromRow(r: ClipRow): IClipWithSample {
  return {
    id: r.id,
    name: r.name,
    startAt: r.startAt,
    endAt: r.endAt,
    gain: r.gain,
    sampleId: r.sampleId,
    created: r.created,
    sample:
      r.sample_id == null
        ? null
        : {
            id: r.sample_id,
            name: r.sample_name!,
            path: r.sample_path!,
            source: r.sample_source!,
            created: r.sample_created!,
          },
  };
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: new_,
  fromRow: newFromRow,
  isComplete: isCompleteClip,
  isCompleteNew: isCompleteNewClip,
  getDefaults: getDefaults,
} as const;
