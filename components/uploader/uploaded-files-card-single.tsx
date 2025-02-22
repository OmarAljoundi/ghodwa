"use client";

import React from "react";
import { File, X } from "lucide-react";
import { UploadedFileOmit } from "@/lib/types";

interface UploadedFilesCardSingleProps {
  uploadedFiles?: UploadedFileOmit;
  onDelete: (key: string) => void;
  className?: string;
}

export function UploadedFilesCardSingle({
  uploadedFiles,
  onDelete,
}: UploadedFilesCardSingleProps) {
  if (!uploadedFiles) {
    return null;
  }

  return (
    <div className="relative">
      {uploadedFiles.name && (
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex justify-start gap-x-2">
            <File />
            <span className="truncate inline-block">{uploadedFiles.name}</span>
          </div>
          <button
            type="button"
            onClick={() => onDelete(uploadedFiles.key)}
            className="ml-auto rounded-full p-1 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
