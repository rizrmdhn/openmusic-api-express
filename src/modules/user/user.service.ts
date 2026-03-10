import { ApiError } from '@/utils/ApiError';
import type { DBorTx } from '@/config/database';
import { createUser, findUserById, findUserByUsername } from './user.repository';
import type { CreateUserDto } from './user.schema';

export async function registerUser(db: DBorTx, data: CreateUserDto) {
  const existing = await findUserByUsername(db, data.username);
  if (existing) throw ApiError.badRequest('Username already taken');
  return createUser(db, data);
}

export async function getUserById(db: DBorTx, id: string) {
  const user = await findUserById(db, id);
  if (!user) throw ApiError.notFound('User not found');
  return user;
}
