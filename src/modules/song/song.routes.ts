import { Router, type Router as ExpressRouter } from 'express';
import {
  createSongHandler,
  deleteSongByIdHandler,
  getSongByIdHandler,
  getSongsHandler,
  updateSongByIdHandler,
} from './song.controller';
import { asyncHandler } from '@/utils/asyncHandler';
import { validate } from '@/middleware/validate.middleware';
import {
  createSongSchema,
  searchSongsSchema,
  songParamsSchema,
  updateSongSchema,
} from './song.schema';

const router: ExpressRouter = Router();

router.get(
  '/',
  validate({
    query: searchSongsSchema,
  }),
  asyncHandler(getSongsHandler)
);
router.get(
  '/:id',
  validate({
    params: songParamsSchema,
  }),
  asyncHandler(getSongByIdHandler)
);
router.post(
  '/',
  validate({ body: createSongSchema }),
  asyncHandler(createSongHandler)
);
router.put(
  '/:id',
  validate({
    params: songParamsSchema,
    body: updateSongSchema,
  }),
  asyncHandler(updateSongByIdHandler)
);
router.delete(
  '/:id',
  validate({
    params: songParamsSchema,
  }),
  asyncHandler(deleteSongByIdHandler)
);

export default router;
