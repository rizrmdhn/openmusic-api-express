import { index, text, uuid, integer } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';
import { createTable, timestamps } from '@/db/utils';

export const albums = createTable(
  'albums',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .$default(() => uuidv7()),
    name: text('name').notNull(),
    year: integer('year').notNull(),
    ...timestamps,
  },
  (table) => [index('albums_id_idx').on(table.id)]
);
