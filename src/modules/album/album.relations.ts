import { relations } from 'drizzle-orm';
import { albums } from './album.table';
import { songs } from '../song/song.table';

export const albumRelations = relations(albums, ({ many }) => ({
  songs: many(songs),
}));
