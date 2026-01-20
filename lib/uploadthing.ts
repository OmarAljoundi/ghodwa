import { generateReactHelpers } from '@uploadthing/react';
import type { FileRouter } from '@/file-router';

export const { useUploadThing, uploadFiles } = generateReactHelpers<FileRouter>();
