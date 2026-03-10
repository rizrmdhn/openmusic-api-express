import { DBorTx } from '@/config/database';
import {
  createSong,
  deleteSong,
  findSongById,
  findSongs,
  updateSong,
} from './song.repository';
import { CreateSongDto, UpdateSongDto } from './song.schema';
import { ApiError } from '@/utils/ApiError';

export async function getSongs(db: DBorTx) {
  const songs = await findSongs(db);

  return songs;
}

export async function getSongById(db: DBorTx, id: string) {
  const song = await findSongById(db, id);
  if (!song) throw ApiError.notFound('Song not found');
  return song;
}

export async function addSong(db: DBorTx, data: CreateSongDto) {
  const song = await createSong(db, data);

  return song;
}

export async function editSongById(
  db: DBorTx,
  id: string,
  data: UpdateSongDto
) {
  const song = await findSongById(db, id);
  if (!song) throw ApiError.notFound('Song not found');
  const updatedSong = await updateSong(db, id, data);
  return updatedSong;
}

export async function deleteSongById(db: DBorTx, id: string) {
  const song = await findSongById(db, id);
  if (!song) throw ApiError.notFound('Song not found');
  const deletedSong = await deleteSong(db, id);
  return deletedSong;
}
