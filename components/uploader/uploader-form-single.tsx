import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileUploader } from '@/components/uploader/file-uploader';
import { useUploadFile } from '@/hooks/use-upload-file';
import type { FileSchema } from '@/schema/upload-schema';
import { UploadedFilesCardSingle } from './uploaded-files-card-single';
import { UploadedImagesCardSingle } from './uploaded-images-card-single';

type UploaderFormProps = {
  defaultUploadedFile?: FileSchema;
  type?: 'image' | 'files';
  onChange: (data: FileSchema) => void;
  onSuccessfullyDeletion?: (
    uploadedFiles: FileSchema,
  ) => Promise<{ success: boolean; message?: string }> | { success: boolean; message?: string };
};

export function UploaderFormSingle({
  defaultUploadedFile,
  onChange,
  onSuccessfullyDeletion,
  type = 'image',
}: UploaderFormProps) {
  const { uploadedFiles, onUpload, progresses, onDelete, isDeleting } = useUploadFile({
    defaultUploadedFiles: defaultUploadedFile ? [defaultUploadedFile] : [],
  });

  const onDeleteCallback = useCallback(
    async (key: string[]) => {
      const { newMedia, message, success } = await onDelete(key);

      if (onSuccessfullyDeletion && newMedia.length > 0) await onSuccessfullyDeletion(newMedia[0]);

      return { message, success };
    },
    [onDelete, onSuccessfullyDeletion],
  );

  // Keep the latest onChange in a ref so the sync effect doesn't depend on it.
  // The callers pass an inline `(e) => field.onChange(e)` that is a new function
  // every render; depending on it here re-ran the effect → setState → re-render
  // on a loop ("Maximum update depth exceeded"). We only want to propagate when
  // the actually-uploaded file changes, not on every parent render.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const lastSyncedPath = useRef<string | undefined>(defaultUploadedFile?.path);

  useEffect(() => {
    const next = uploadedFiles[0];
    if (next?.path === lastSyncedPath.current) return;
    lastSyncedPath.current = next?.path;
    onChangeRef.current(next);
  }, [uploadedFiles]);

  return (
    <div>
      {uploadedFiles.length === 0 && (
        <FileUploader
          maxFileCount={1}
          onUpload={onUpload}
          multiple={false}
          maxSize={4 * 1024 * 1024}
          accept={type === 'image' ? { 'image/*': [] } : { '*': [] }}
        />
      )}

      <div>
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

      {type === 'image' && (
        <UploadedImagesCardSingle
          uploadedFiles={uploadedFiles.length > 0 ? uploadedFiles[0] : undefined}
          onDelete={(key) => onDeleteCallback([key])}
        />
      )}

      {type === 'files' && (
        <UploadedFilesCardSingle
          uploadedFiles={uploadedFiles.length > 0 ? uploadedFiles[0] : undefined}
          onDelete={(key) => onDeleteCallback([key])}
        />
      )}
    </div>
  );
}
