import DeleteAlert from "@/components/delete-alert";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileUploader } from "@/components/uploader/file-uploader";
import { useUploadFile } from "@/hooks/use-upload-file";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import UploadedFilesCardSingle from "./uploaded-files-card-single";
import { UploadedFileOmit } from "@/lib/types";

type UploaderFormProps = {
  defaultUploadedFile?: UploadedFileOmit;
  onChange: (data: UploadedFileOmit) => void;
  onSuccessfullyDeletion?: (
    uploadedFiles: UploadedFileOmit
  ) =>
    | Promise<{ success: boolean; message?: string }>
    | { success: boolean; message?: string };
};

export function UploaderFormSingle({
  defaultUploadedFile,
  onChange,
  onSuccessfullyDeletion,
}: UploaderFormProps) {
  const { uploadedFiles, onUpload, progresses, onDelete, isDeleting } =
    useUploadFile("imageUploader", {
      defaultUploadedFiles: defaultUploadedFile ? [defaultUploadedFile] : [],
    });

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | undefined>();

  const onDeleteCallback = useCallback(
    async (key: string[]) => {
      const { newMedia, message, success } = await onDelete(key);

      if (onSuccessfullyDeletion && newMedia.length > 0)
        await onSuccessfullyDeletion(newMedia[0]);

      return { message, success };
    },
    [onDelete, onSuccessfullyDeletion]
  );

  useEffect(() => {
    onChange(uploadedFiles[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles]);

  return (
    <>
      <div>
        {uploadedFiles.length == 0 && (
          <FileUploader
            maxFileCount={1}
            onUpload={onUpload}
            multiple={false}
            maxSize={4 * 1024 * 1024}
          />
        )}

        <div className="my-4">
          <AnimatePresence>
            {Object.entries(progresses).map(([fileName, progress]) => (
              <motion.div
                key={fileName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={isDeleting ? "opacity-50" : "opacity-100"}
              >
                <Card className="mb-4">
                  <CardContent className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                        <motion.div
                          className="h-6 w-6 rounded-full bg-primary"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{fileName}</p>
                        <Progress value={progress} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <UploadedFilesCardSingle
          uploadedFiles={
            uploadedFiles.length > 0 ? uploadedFiles[0] : undefined
          }
          onDelete={(key) => {
            setSelectedKey(key);
            setOpenDeleteAlert(true);
          }}
        />
      </div>

      <DeleteAlert
        description="Are you sure you want to delete this image? this action can't be undone"
        title="Delete selected image"
        mutateKey={`Delete-image-${selectedKey}`}
        onDelete={() => onDeleteCallback([selectedKey ?? ""])}
        onOpenChange={setOpenDeleteAlert}
        open={openDeleteAlert}
      />
    </>
  );
}
