import { Router, type Router as ExpressRouter } from 'express';
import albumRoutes from '@/modules/album/album.routes';
import songRoutes from '@/modules/song/song.routes';

export const router: ExpressRouter = Router();
router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);
