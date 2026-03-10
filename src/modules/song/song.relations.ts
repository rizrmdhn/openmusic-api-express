import { relations } from 'drizzle-orm';
import { albums } from '../album/album.table';
import { songs } from './song.table';

export const songRelations = relations(songs, ({ one }) => ({
  album: one(albums, {
    fields: [songs.albumId],
    references: [albums.id],
  }),
}));
