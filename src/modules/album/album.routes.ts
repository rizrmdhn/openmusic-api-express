import { Router, type Router as ExpressRouter } from 'express';
import { validate } from '@/middleware/validate.middleware';
import {
  albumParamsSchema,
  createAlbumSchema,
  updateAlbumSchema,
} from './album.schema';
import { asyncHandler } from '@/utils/asyncHandler';
import {
  createAlbumHandler,
  deleteAlbumByIdHandler,
  getAlbumByIdHandler,
  updateAlbumByIdHandler,
} from './album.controller';

const router: ExpressRouter = Router();

router.post(
  '/',
  validate({ body: createAlbumSchema }),
  asyncHandler(createAlbumHandler)
);
router.get(
  '/:id',
  validate({
    params: albumParamsSchema,
  }),
  asyncHandler(getAlbumByIdHandler)
);
router.put(
  '/:id',
  validate({
    params: albumParamsSchema,
    body: updateAlbumSchema,
  }),
  asyncHandler(updateAlbumByIdHandler)
);
router.delete(
  '/:id',
  validate({
    params: albumParamsSchema,
  }),
  asyncHandler(deleteAlbumByIdHandler)
);

export default router;
