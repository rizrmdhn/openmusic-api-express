import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(1).max(50),
  password: z.string().min(6),
  fullname: z.string().min(1).max(100),
});

export const userParamsSchema = z.object({
  id: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
