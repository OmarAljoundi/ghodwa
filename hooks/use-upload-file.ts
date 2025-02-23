import * as React from "react";
import { toast } from "sonner";
import { type UploadFilesOptions } from "uploadthing/types";
import { getErrorMessage } from "@/lib/handle-error";
import { uploadFiles } from "@/lib/uploadthing";
import { UploadedFile, UploadedFileOmit } from "@/lib/types";
import { FileRouter } from "@/file-router";

interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<any>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {
  defaultUploadedFiles?: Omit<UploadedFile, "serverData">[];
}

export function useUploadFile(
  endpoint: keyof FileRouter,
  { defaultUploadedFiles = [], ...props }: UseUploadFileProps = {}
) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<UploadedFileOmit[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file.name]: progress,
            };
          });
        },
      });

      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res));
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  async function onDelete(keys: string[]) {
    setIsDeleting(true);
    try {
      //await deleteUTFiles(keys);
      const newMedia = uploadedFiles.filter((file) => !keys.includes(file.key));
      setUploadedFiles(newMedia);
      setIsDeleting(false);

      return { success: true, message: "Deleted successfully", newMedia };
    } catch (err) {
      setIsDeleting(false);
      return { success: false, message: err as string, newMedia: [] };
    }
  }

  const onChangeUploadFiles = (newUploadedFiles: UploadedFileOmit[]) =>
    setUploadedFiles(newUploadedFiles);

  return {
    onUpload,
    onDelete,
    isDeleting,
    uploadedFiles,
    onChangeUploadFiles,
    progresses,
    isUploading,
  };
}
