import type { DBorTx } from '@/config/database';
import type { CreateAlbumDto, UpdateAlbumDto } from './album.schema';
import {
  createAlbum,
  deleteAlbum,
  findAlbumById,
  updateAlbum,
} from './album.repository';
import { ApiError } from '@/utils/ApiError';

export async function addAlbum(db: DBorTx, data: CreateAlbumDto) {
  const album = await createAlbum(db, data);
  return album;
}

export async function getAlbumById(db: DBorTx, id: string) {
  const album = await findAlbumById(db, id);
  if (!album) throw ApiError.notFound('Album not found');
  return album;
}

export async function editAlbumById(
  db: DBorTx,
  id: string,
  data: UpdateAlbumDto
) {
  const album = await findAlbumById(db, id);
  if (!album) throw ApiError.notFound('Album not found');
  const updatedAlbum = await updateAlbum(db, id, data);
  return updatedAlbum;
}

export async function deleteAlbumById(db: DBorTx, id: string) {
  const album = await findAlbumById(db, id);
  if (!album) throw ApiError.notFound('Album not found');
  const deletedAlbum = await deleteAlbum(db, id);
  return deletedAlbum;
}
