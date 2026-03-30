import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import Sample from '@src/models/Sample.model';
import SampleService from '@src/services/SampleService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

/******************************************************************************
                                Constants
******************************************************************************/

const reqValidators = {
  add: parseReq({ sample: Sample.isCompleteNew }),
  // update: parseReq({ user: Sample.isComplete }),
  // delete: parseReq({ id: transform(Number, isNumber) }),
} as const;

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all users.
 *
 * @route GET /api/users/all
 */
async function getAll(_: Req, res: Res) {
  const samples = await SampleService.getAll();
  res.status(HttpStatusCodes.OK).json(samples);
}

/**
 * Add one user.
 *
 * @route POST /api/users/add
 */
async function add(req: Req, res: Res) {
  console.log(req.file);
  console.log(req.body);
  const payload = {
    sample: { ...JSON.parse(req.body.sample), ...{ path: req.file?.path } },
  };
  console.log('payload: ', payload);
  const { sample } = reqValidators.add(payload);
  await SampleService.addOne(sample);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 *
 * @route PUT /api/users/update
 */
// async function update(req: Req, res: Res) {
//   const { user } = reqValidators.update(req.body);
//   await UserService.updateOne(user);
//   res.status(HttpStatusCodes.OK).end();
// }

/**
 * Delete one user.
 *
 * @route DELETE /api/users/delete/:id
 */
// async function delete_(req: Req, res: Res) {
//   const { id } = reqValidators.delete(req.params);
//   await UserService.delete(id);
//   res.status(HttpStatusCodes.OK).end();
// }

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  add,
  // update,
  // delete: delete_,
} as const;
