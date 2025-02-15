import { FileRouter } from "@/file-router";
import { createRouteHandler } from "uploadthing/next";

export const { GET, POST } = createRouteHandler({
  router: FileRouter,
});
