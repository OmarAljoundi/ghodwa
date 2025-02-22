import {
  createUploadthing,
  type FileRouter as UploadThing,
} from "uploadthing/next";

const f = createUploadthing();

export const FileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 8 },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "4MB",
      maxFileCount: 8,
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
      maxFileCount: 8,
    },
    "application/pdf": { maxFileSize: "4MB", maxFileCount: 8 },
    "application/octet-stream": { maxFileSize: "4MB", maxFileCount: 8 },
    "application/vnd.ms-excel": { maxFileSize: "4MB", maxFileCount: 8 },
    "application/vnd.ms-powerpoint": { maxFileSize: "4MB", maxFileCount: 8 },
    "application/msword": { maxFileSize: "4MB", maxFileCount: 8 },
    pdf: { maxFileSize: "4MB", maxFileCount: 8 },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(() => {}),
} satisfies UploadThing;

export type FileRouter = typeof FileRouter;
