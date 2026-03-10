import { eq } from 'drizzle-orm';
import type { DBorTx } from '@/config/database';
import { users, type NewUser } from './user.table';

export async function createUser(db: DBorTx, data: NewUser) {
  const [user] = await db.insert(users).values(data).returning();
  return user;
}

export async function findUserById(db: DBorTx, id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user ?? null;
}

export async function findUserByUsername(db: DBorTx, username: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return user ?? null;
}
