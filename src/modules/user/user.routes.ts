import { Router, type Router as ExpressRouter } from 'express';
import { validate } from '@/middleware/validate.middleware';
import { asyncHandler } from '@/utils/asyncHandler';
import { createUserSchema, userParamsSchema } from './user.schema';
import { createUserHandler, getUserByIdHandler } from './user.controller';

const router: ExpressRouter = Router();

router.post('/', validate({ body: createUserSchema }), asyncHandler(createUserHandler));
router.get('/:id', validate({ params: userParamsSchema }), asyncHandler(getUserByIdHandler));

export default router;
