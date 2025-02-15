import {
  createUploadthing,
  type FileRouter as UploadThing,
} from "uploadthing/next";

const f = createUploadthing();

export const FileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 8 } })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(() => {}),
} satisfies UploadThing;

export type FileRouter = typeof FileRouter;
