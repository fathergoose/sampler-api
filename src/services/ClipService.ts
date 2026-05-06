import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';
import { IClip, IClipParams } from '@src/models/Clip.model';
import ClipRepo from '@src/repos/ClipRepo';

/******************************************************************************
                                Constants
******************************************************************************/

const Errors = {
  USER_NOT_FOUND: 'User not found',
} as const;

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all users.
 */
function getAll(): Promise<IClip[]> {
  return ClipRepo.getAll();
}

/**
 * Get one user.
 */
function getOne(id: number): Promise<IClip | null> {
  return ClipRepo.getOne(id);
}

/**
 * Add one user.
 */
function addOne(clip: IClipParams): Promise<number> {
  return ClipRepo.add(clip);
}

/**
 * Update one user.
 */
// async function updateOne(user: IClip): Promise<void> {
//   const persists = await UserRepo.persists(user.id);
//   if (!persists) {
//     throw new RouteError(HttpStatusCodes.NOT_FOUND, Errors.USER_NOT_FOUND);
//   }
//   return UserRepo.update(user);
// }

/**
 * Delete a user by their id.
 */
// async function deleteOne(id: number): Promise<void> {
//   const persists = await UserRepo.persists(id);
//   if (!persists) {
//     throw new RouteError(HttpStatusCodes.NOT_FOUND, Errors.USER_NOT_FOUND);
//   }
//   return UserRepo.delete(id);
// }

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  Errors,
  getAll,
  addOne,
  getOne,
  // updateOne,
  // delete: deleteOne,
} as const;
