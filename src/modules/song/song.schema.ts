import { z } from 'zod';

export const songParamsSchema = z.object({
  id: z.uuidv7(),
});

export const createSongSchema = z.object({
  title: z.string().min(1),
  year: z
    .number()
    .int()
    .refine(
      (year) => {
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear;
      },
      {
        message: `Year must be a valid four-digit number between 1900 and the current year`,
      }
    ),
  genre: z.string().min(1),
  performer: z.string().min(1),
  duration: z.number().int().positive().optional(),
  albumId: z.uuidv7().optional(),
});

export type CreateSongDto = z.infer<typeof createSongSchema>;

export const updateSongSchema = z.object({
  title: z.string().min(1),
  year: z
    .number()
    .int()
    .refine(
      (year) => {
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear;
      },
      {
        message: `Year must be a valid four-digit number between 1900 and the current year`,
      }
    ),
  genre: z.string().min(1),
  performer: z.string().min(1),
  duration: z.number().int().positive().optional(),
  albumId: z.uuidv7().optional(),
});

export type UpdateSongDto = z.infer<typeof updateSongSchema>;
