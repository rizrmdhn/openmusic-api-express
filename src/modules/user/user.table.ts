import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const users = pgTable('users', {
  id: varchar('id', { length: 50 }).primaryKey().$defaultFn(() => uuidv4()),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  fullname: varchar('fullname', { length: 100 }).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
