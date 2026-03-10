import type { Request, Response } from 'express';
import { db } from '@/config/database';
import { sendSuccess } from '@/utils/ApiResponse.helpers';
import {
  addSong,
  deleteSongById,
  editSongById,
  getSongById,
  getSongs,
} from './song.service';

export async function getSongsHandler(req: Request, res: Response) {
  const songs = await getSongs(db);
  sendSuccess(res, {
    songs: songs,
  });
}

export async function getSongByIdHandler(req: Request, res: Response) {
  const song = await getSongById(db, req.params.id as string);
  sendSuccess(res, {
    song: song,
  });
}

export async function createSongHandler(req: Request, res: Response) {
  const song = await addSong(db, req.body);
  sendSuccess(
    res,
    {
      songId: song.id,
      song: song,
    },
    { message: 'Song created', statusCode: 201 }
  );
}

export async function updateSongByIdHandler(req: Request, res: Response) {
  const song = await editSongById(db, req.params.id as string, req.body);
  sendSuccess(
    res,
    {
      song: song,
    },
    { message: 'Song updated' }
  );
}

export async function deleteSongByIdHandler(req: Request, res: Response) {
  const song = await deleteSongById(db, req.params.id as string);
  sendSuccess(
    res,
    {
      song: song,
    },
    { message: 'Song deleted' }
  );
}
