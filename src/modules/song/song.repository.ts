import { DBorTx } from '@/config/database';
import { CreateSongDto, SearchSongsDto, UpdateSongDto } from './song.schema';
import { songs } from './song.table';
import { and, eq, ilike } from 'drizzle-orm';

export async function createSong(db: DBorTx, data: CreateSongDto) {
  const [song] = await db.insert(songs).values(data).returning();

  return song;
}

export async function findSongs(db: DBorTx, search: SearchSongsDto) {
  const songsList = await db.query.songs.findMany({
    columns: {
      id: true,
      title: true,
      performer: true,
    },
    where: and(
      search.title ? ilike(songs.title, `%${search.title}%`) : undefined,
      search.performer
        ? ilike(songs.performer, `%${search.performer}%`)
        : undefined
    ),
  });

  return songsList;
}

export async function findSongById(db: DBorTx, id: string) {
  const [song] = await db.select().from(songs).where(eq(songs.id, id));

  return song;
}

export async function updateSong(db: DBorTx, id: string, data: UpdateSongDto) {
  const [song] = await db
    .update(songs)
    .set(data)
    .where(eq(songs.id, id))
    .returning();

  return song;
}

export async function deleteSong(db: DBorTx, id: string) {
  const [song] = await db.delete(songs).where(eq(songs.id, id)).returning();

  return song;
}
