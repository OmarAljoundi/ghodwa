"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadedFileOmit } from "@/lib/types";

interface UploadedFilesCardSingleProps {
  uploadedFiles?: UploadedFileOmit;
  onDelete: (key: string) => void;
}

export default function UploadedFilesCardSingle({
  uploadedFiles,
  onDelete,
}: UploadedFilesCardSingleProps) {
  if (!uploadedFiles) {
    return null;
  }

  return (
    <AnimatePresence>
      <Card
        className="group overflow-hidden "
        style={{ width: "-webkit-fill-available" }}
      >
        <CardContent className="p-0 ">
          <div className="relative aspect-square overflow-hidden  ">
            <Image
              src={uploadedFiles.url}
              alt={uploadedFiles.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30" />

            <Button
              variant="destructive"
              size="icon"
              type="button"
              className="pointer-events-auto absolute right-2 top-2 opacity-100 transition-opacity duration-300"
              onClick={() => {
                onDelete(uploadedFiles.key);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-3">
            <p className="truncate text-sm font-medium">{uploadedFiles.name}</p>
          </div>
        </CardContent>
      </Card>
    </AnimatePresence>
  );
}
