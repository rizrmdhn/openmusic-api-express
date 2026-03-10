import { DBorTx } from '@/config/database';
import { CreateSongDto, UpdateSongDto } from './song.schema';
import { songs } from './song.table';
import { eq } from 'drizzle-orm';

export async function createSong(db: DBorTx, data: CreateSongDto) {
  const [song] = await db.insert(songs).values(data).returning();

  return song;
}

export async function findSongs(db: DBorTx) {
  const songsList = await db.select().from(songs);

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
