'use server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export const deleteUTFiles = async (files: string[]) => {
  try {
    await utapi.deleteFiles(files);
    Promise.allSettled([utapi.deleteFiles(files)]);
  } catch (error) {
    console.error('UTAPI: Error deleting files', error);
  }
};

export const uploadUTFiles = async (files: File[]) => {
  try {
    return await utapi.uploadFiles(files);
  } catch (error) {
    console.error('UTAPI: Error uploading files', error);
    return [];
  }
};
