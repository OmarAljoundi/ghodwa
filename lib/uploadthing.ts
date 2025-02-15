import { FileRouter } from "@/file-router";
import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<FileRouter>();
