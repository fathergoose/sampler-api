import { isNonEmptyString, isString, isUnsignedInteger } from 'jet-validators';
import { parseObject, Schema, testObject } from 'jet-validators/utils';

import { transformIsDate } from '@src/common/utils/validators';

import { Entity } from './common/types';

/******************************************************************************
                                 Constants
******************************************************************************/

const getDefaults = (): ISample => ({
  id: 0,
  name: '',
  path: '',
  created: new Date(),
});

const schema: Schema<ISample> = {
  id: isUnsignedInteger,
  name: isString,
  path: isString,
  created: transformIsDate,
};

/******************************************************************************
                                  Types
******************************************************************************/

export interface ISampleParams {
  name: string;
  path: string;
}

/**
 * @entity sample
 */
export interface ISample extends Entity, ISampleParams {}

/******************************************************************************
                                  Setup
******************************************************************************/

// Set the "parseSample" function
const parseSample = parseObject<ISample>(schema);

// For the APIs make sure the right fields are complete
const isCompleteSample = testObject<ISample>({
  ...schema,
  name: isString,
  path: isString,
});

const isCompleteNewSample = testObject<ISampleParams>({
  name: isString,
  path: isString,
});

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * New user object.
 */
function new_(file?: Partial<ISample>): ISample {
  return parseSample({ ...getDefaults(), ...file }, (errors) => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: new_,
  isComplete: isCompleteSample,
  isCompleteNew: isCompleteNewSample,
  getDefaults: getDefaults,
} as const;
