import type { Request, Response } from 'express';
import { db } from '@/config/database';
import {
  addAlbum,
  deleteAlbumById,
  editAlbumById,
  getAlbumById,
} from './album.service';
import { sendSuccess } from '@/utils/ApiResponse.helpers';
import type { CreateAlbumDto, UpdateAlbumDto } from './album.schema';

export async function createAlbumHandler(req: Request, res: Response) {
  const album = await addAlbum(db, req.body as CreateAlbumDto);
  sendSuccess(
    res,
    { albumId: album.id },
    { message: 'Album created', statusCode: 201 }
  );
}

export async function getAlbumByIdHandler(req: Request, res: Response) {
  const album = await getAlbumById(db, req.params.id as string);
  sendSuccess(res, {
    album: {
      ...album,
    },
  });
}

export async function updateAlbumByIdHandler(req: Request, res: Response) {
  const album = await editAlbumById(
    db,
    req.params.id as string,
    req.body as UpdateAlbumDto
  );
  sendSuccess(
    res,
    {
      album: {
        ...album,
      },
    },
    { message: 'Album updated' }
  );
}

export async function deleteAlbumByIdHandler(req: Request, res: Response) {
  const album = await deleteAlbumById(db, req.params.id as string);
  sendSuccess(
    res,
    {
      album: {
        ...album,
      },
    },
    { message: 'Album deleted' }
  );
}
