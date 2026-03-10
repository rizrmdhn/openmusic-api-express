import { eq } from 'drizzle-orm';
import type { DBorTx } from '@/config/database';
import type { CreateAlbumDto, UpdateAlbumDto } from './album.schema';
import { albums } from './album.table';

export async function createAlbum(db: DBorTx, data: CreateAlbumDto) {
  const [album] = await db.insert(albums).values(data).returning();

  return album;
}

export async function findAlbumById(db: DBorTx, id: string) {
  const album = await db.query.albums.findFirst({
    where: eq(albums.id, id),
    with: {
      songs: true,
    },
  });

  return album;
}

export async function updateAlbum(
  db: DBorTx,
  id: string,
  data: UpdateAlbumDto
) {
  const [album] = await db
    .update(albums)
    .set(data)
    .where(eq(albums.id, id))
    .returning();

  return album;
}

export async function deleteAlbum(db: DBorTx, id: string) {
  const [album] = await db.delete(albums).where(eq(albums.id, id)).returning();

  return album;
}
