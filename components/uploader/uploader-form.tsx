"use client";
import UploadedFilesCard from "@/components/uploader/uploaded-files-card";
import DeleteAlert from "@/components/delete-alert";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileUploader } from "@/components/uploader/file-uploader";
import { useUploadFile } from "@/hooks/use-upload-file";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { UploadedFileOmit } from "@/lib/types";

type UploaderFormProps = {
  defaultUploadedFiles: UploadedFileOmit[];
  onChange: (data: UploadedFileOmit[]) => void;
  onSuccessfullyDeletion?: (
    uploadedFiles: UploadedFileOmit[]
  ) =>
    | Promise<{ success: boolean; message?: string }>
    | { success: boolean; message?: string };
};

export default function UploaderForm({
  defaultUploadedFiles,
  onChange,
  onSuccessfullyDeletion,
}: UploaderFormProps) {
  const {
    uploadedFiles,
    onUpload,
    progresses,
    onDelete,
    isDeleting,
    onChangeUploadFiles,
  } = useUploadFile("imageUploader", {
    defaultUploadedFiles: defaultUploadedFiles as UploadedFileOmit[],
  });

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | undefined>();

  const onDeleteCallback = useCallback(
    async (key: string[]) => {
      const { newMedia, message, success } = await onDelete(key);
      if (onSuccessfullyDeletion) await onSuccessfullyDeletion(newMedia);

      return { message, success };
    },
    [onDelete, onSuccessfullyDeletion]
  );

  useEffect(() => {
    onChange(uploadedFiles);
  }, [uploadedFiles]);

  return (
    <>
      <div>
        <FileUploader
          maxFileCount={10}
          onUpload={onUpload}
          multiple={true}
          maxSize={4 * 1024 * 1024}
        />

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

        <UploadedFilesCard
          onChange={onChangeUploadFiles}
          uploadedFiles={uploadedFiles}
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
