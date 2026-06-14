'use client';

import { Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { resolveUrl } from '@/lib/utils';
import type { FileSchema } from '@/schema/upload-schema';

interface UploadedImagesCardSingleProps {
  uploadedFiles?: FileSchema;
  onDelete: (key: string) => void;
  className?: string;
}

export function UploadedImagesCardSingle({
  uploadedFiles,
  onDelete,
}: UploadedImagesCardSingleProps) {
  if (!uploadedFiles) {
    return null;
  }

  return (
    <div className="relative">
      <div className="group relative h-52 overflow-hidden rounded-lg border">
        <Image
          src={resolveUrl(uploadedFiles.path)}
          alt="Preview"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            type="button"
            variant="destructive"
            onClick={() => onDelete(uploadedFiles.path)}
            className="h-9 w-9 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {uploadedFiles.path && (
        <div className="mt-2 flex items-center gap-2 rounded-md bg-muted/50 px-2.5 py-1.5 text-xs text-muted-foreground">
          <span className="truncate" title={uploadedFiles.path}>
            {uploadedFiles.path.split('/').pop()}
          </span>
          <button
            type="button"
            onClick={() => onDelete(uploadedFiles.path)}
            className="ml-auto shrink-0 rounded-full p-1 transition-colors hover:bg-background hover:text-destructive"
            title="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
