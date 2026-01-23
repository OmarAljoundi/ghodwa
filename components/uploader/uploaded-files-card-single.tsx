'use client';

import { File, X } from 'lucide-react';
import type { FileSchema } from '@/schema/upload-schema';

interface UploadedFilesCardSingleProps {
  uploadedFiles?: FileSchema;
  onDelete: (key: string) => void;
  className?: string;
}

export function UploadedFilesCardSingle({ uploadedFiles, onDelete }: UploadedFilesCardSingleProps) {
  if (!uploadedFiles) {
    return null;
  }

  return (
    <div className="relative">
      {uploadedFiles.path && (
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex flex-1 items-center gap-x-2 min-w-0">
            <File className="h-4 w-4 shrink-0" />
            <span className="truncate">{uploadedFiles.path}</span>
          </div>
          <button
            type="button"
            onClick={() => onDelete(uploadedFiles.path)}
            className="shrink-0 ml-auto rounded-full p-1 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}