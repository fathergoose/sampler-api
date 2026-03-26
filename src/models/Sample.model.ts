import { isNonEmptyString, isString, isUnsignedInteger } from 'jet-validators';
import { parseObject, Schema, testObject } from 'jet-validators/utils';

import { transformIsDate } from '@src/common/utils/validators';

import { Entity } from './common/types';

/******************************************************************************
                                 Constants
******************************************************************************/

const GetDefaults = (): ISample => ({
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

/**
 * @entity sample
 */
export interface ISample extends Entity {
  name: string;
  path: string;
}

/******************************************************************************
                                  Setup
******************************************************************************/

// Set the "parseSample" function
const parseSample = parseObject<ISample>(schema);

// For the APIs make sure the right fields are complete
const isCompleteSample = testObject<ISample>({
  ...schema,
  name: isNonEmptyString,
  path: isNonEmptyString,
});

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * New user object.
 */
function new_(file?: Partial<ISample>): ISample {
  return parseSample({ ...GetDefaults(), ...file }, (errors) => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: new_,
  isComplete: isCompleteSample,
} as const;
