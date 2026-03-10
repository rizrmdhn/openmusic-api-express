import { uuid, integer, varchar } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';
import { createTable, timestamps } from '@/db/utils';
import { albums } from '../album/album.table';

export const songs = createTable('songs', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .$default(() => uuidv7()),
  title: varchar('title', { length: 255 }).notNull(),
  year: integer('year').notNull(),
  genre: varchar('genre', { length: 100 }).notNull(),
  performer: varchar('performer', { length: 255 }).notNull(),
  duration: integer('duration'),
  albumId: uuid('album_id').references(() => albums.id),
  ...timestamps,
});
