import { Router } from 'express';
import multer from 'multer';

import Paths from '@src/common/constants/Paths';

import { storage } from '../repos/FileRepo';
import ClipRoutes from './ClipRoutes';
import SampleRoutes from './SampleRoutes';

const apiRouter = Router();
const upload = multer({ storage });

const sampleRouter = Router();

sampleRouter.get(Paths.Samples.Get, SampleRoutes.getAll);
sampleRouter.get(Paths.Samples.GetOne, SampleRoutes.getOne);
sampleRouter.post(
  Paths.Samples.Add,
  upload.single('sampleFile'),
  SampleRoutes.add,
);

apiRouter.use(Paths.Samples._, sampleRouter);

const clipRouter = Router();
clipRouter.get(Paths.Clips.Get, ClipRoutes.getAll);

export default apiRouter;
