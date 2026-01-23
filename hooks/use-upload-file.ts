import axios from 'axios';
import * as React from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/handle-error';
import { deleteSupabaseFiles } from '@/lib/uploadthing.server';
import type { FileSchema } from '@/schema/upload-schema';

interface UseUploadFileProps {
  defaultUploadedFiles?: FileSchema[];
  onUploadBegin?: (fileName: string) => void;
  onUploadProgress?: (progress: number) => void;
}

export function useUploadFile({ defaultUploadedFiles = [], ...props }: UseUploadFileProps = {}) {
  const [uploadedFiles, setUploadedFiles] = React.useState<FileSchema[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        props.onUploadBegin?.(file.name);

        const uniquePath = `${crypto.randomUUID()}-${file.name}`;
        const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`${supabaseUrl}/storage/v1/object/${bucket}/${uniquePath}`, formData, {
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);

              setProgresses((prev) => ({ ...prev, [file.name]: percent }));
              props.onUploadProgress?.(percent);

              if (percent === 100) {
                setTimeout(() => {
                  setProgresses((prev) => {
                    const newProgress = { ...prev };
                    delete newProgress[file.name];
                    return newProgress;
                  });
                }, 500);
              }
            }
          },
        });

        return {
          path: uniquePath,
          size: file.size,
          type: file.type,
        };
      });

      const res = await Promise.all(uploadPromises);

      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res));
      return res;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return [];
    } finally {
      setIsUploading(false);
    }
  }

  async function onDelete(keys: string[]) {
    setIsDeleting(true);
    try {
      await deleteSupabaseFiles(keys);
      const newMedia = uploadedFiles.filter((file) => !keys.includes(file.path));
      setUploadedFiles(newMedia);
      setIsDeleting(false);

      return { success: true, message: 'Deleted successfully', newMedia };
    } catch (err) {
      setIsDeleting(false);
      return { success: false, message: getErrorMessage(err), newMedia: [] };
    }
  }

  const onChangeUploadFiles = (newUploadedFiles: FileSchema[]) =>
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
