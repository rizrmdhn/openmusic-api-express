import type { Request, Response } from 'express';
import { db } from '@/config/database';
import { registerUser, getUserById } from './user.service';
import { sendSuccess } from '@/utils/ApiResponse.helpers';

export async function createUserHandler(req: Request, res: Response) {
  const user = await registerUser(db, req.body);
  sendSuccess(res, { userId: user.id }, { message: 'User created', statusCode: 201 });
}

export async function getUserByIdHandler(req: Request, res: Response) {
  const user = await getUserById(db, req.params.id as string);
  const { password: _password, ...safeUser } = user;
  sendSuccess(res, safeUser);
}
