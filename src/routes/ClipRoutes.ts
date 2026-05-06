import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import Clip from '@src/models/Clip.model';
import ClipService from '@src/services/ClipService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

/******************************************************************************
                                Constants
******************************************************************************/

const reqValidators = {
  add: parseReq({ clip: Clip.isCompleteNew }),
  // update: parseReq({ user: Clip.isComplete }),
  // delete: parseReq({ id: transform(Number, isNumber) }),
} as const;

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all clip.
 *
 * @route GET /api/users/all
 */
async function getAll(_: Req, res: Res) {
  const clips = await ClipService.getAll();
  res.status(HttpStatusCodes.OK).json(clips);
}

/**
 * Get one clip.
 *
 * @route GET /api/clips/:id
 */
async function getOne(req: Req, res: Res) {
  const id = parseInt(req.params.id);
  const clip = await ClipService.getOne(id);
  res.status(HttpStatusCodes.OK).json(clip);
}

/**
 * Add one user.
 *
 * @route POST /api/clips/add
 */
async function add(req: Req, res: Res) {
  console.log('request add');
  console.log(req.body);
  const payload = {
    clip: req.body as unknown,
  };
  const { clip } = reqValidators.add(payload);
  await ClipService.addOne(clip);
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
  getOne,
  add,
  // update,
  // delete: delete_,
} as const;
