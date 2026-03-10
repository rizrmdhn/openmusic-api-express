import { z } from 'zod';

export const albumParamsSchema = z.object({
  id: z.uuidv7(),
});

export const createAlbumSchema = z.object({
  name: z.string().min(1),
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
});

export type CreateAlbumDto = z.infer<typeof createAlbumSchema>;

export const updateAlbumSchema = z.object({
  name: z.string().min(1),
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
});

export type UpdateAlbumDto = z.infer<typeof updateAlbumSchema>;
