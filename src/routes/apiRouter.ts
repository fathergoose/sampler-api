import { Router } from 'express';
import multer from 'multer';

import Paths from '@src/common/constants/Paths';

import { storage } from '../repos/FileRepo';
import SampleRoutes from './SampleRoutes';
import UserRoutes from './UserRoutes';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();
const upload = multer({ storage });

// ----------------------- Add SampleRouter --------------------------------- //

const sampleRouter = Router();

sampleRouter.get(Paths.Samples.Get, SampleRoutes.getAll);
sampleRouter.post(
  Paths.Samples.Add,
  upload.single('sampleFile'),
  SampleRoutes.add,
);
// sampleRouter.put(Paths.Samples.Update, UserRoutes.update);
// sampleRouter.delete(Paths.Samples.Delete, UserRoutes.delete);

apiRouter.use(Paths.Samples._, sampleRouter);

// ----------------------- Add UserRouter --------------------------------- //

const userRouter = Router();

userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

apiRouter.use(Paths.Users._, userRouter);

/******************************************************************************
                                Export
******************************************************************************/

export default apiRouter;
