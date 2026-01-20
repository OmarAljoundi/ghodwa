import { createRouteHandler } from 'uploadthing/next';
import { FileRouter } from '@/file-router';

export const { GET, POST } = createRouteHandler({
  router: FileRouter,
});
