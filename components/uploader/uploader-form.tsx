'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileUploader } from '@/components/uploader/file-uploader';
import UploadedFilesCard from '@/components/uploader/uploaded-files-card';
import { useUploadFile } from '@/hooks/use-upload-file';
import type { FileSchema } from '@/schema/upload-schema';

type UploaderFormProps = {
  defaultUploadedFiles: FileSchema[];
  onChange: (data: FileSchema[]) => void;
  onSuccessfullyDeletion?: (
    uploadedFiles: FileSchema[],
  ) => Promise<{ success: boolean; message?: string }> | { success: boolean; message?: string };
};

export default function UploaderForm({
  defaultUploadedFiles,
  onChange,
  onSuccessfullyDeletion,
}: UploaderFormProps) {
  const { uploadedFiles, onUpload, progresses, onDelete, isDeleting, onChangeUploadFiles } =
    useUploadFile({
      defaultUploadedFiles: defaultUploadedFiles,
    });

  const onDeleteCallback = useCallback(
    async (key: string[]) => {
      const { newMedia, message, success } = await onDelete(key);
      if (onSuccessfullyDeletion) await onSuccessfullyDeletion(newMedia);

      onChange(newMedia);

      return { message, success };
    },
    [onDelete, onSuccessfullyDeletion, onChange],
  );

  useEffect(() => {
    onChange(uploadedFiles);
  }, [uploadedFiles, onChange]);

  return (
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
              className={isDeleting ? 'opacity-50' : 'opacity-100'}
            >
              <Card className="mb-4">
                <CardContent className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <motion.div
                        className="h-6 w-6 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" title={fileName}>
                        {fileName}
                      </p>
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
        onDelete={(key) => onDeleteCallback([key])}
      />
    </div>
  );
}
