import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';
import { ISample, ISampleParams } from '@src/models/Sample.model';
import SampleRepo from '@src/repos/SampleRepo';

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
function getAll(): Promise<ISample[]> {
  return SampleRepo.getAll();
}

/**
 * Get one user.
 */
function getOne(id): Promise<ISample[]> {
  return SampleRepo.getOne(id);
}


/**
 * Add one user.
 */
function addOne(sample: ISampleParams): Promise<number> {
  return SampleRepo.add(sample);
}

/**
 * Update one user.
 */
// async function updateOne(user: ISample): Promise<void> {
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
