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
function new_(file?: Partial<IClip>): IClip {
  return parseClip({ ...getDefaults(), ...file }, (errors) => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: new_,
  isComplete: isCompleteClip,
  isCompleteNew: isCompleteNewClip,
  getDefaults: getDefaults,
} as const;
