'use client';

import { closestCorners } from '@dnd-kit/core';
import { AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sortable, SortableItem } from '@/components/ui/sortable';
import { resolveUrl } from '@/lib/utils';
import type { FileSchema } from '@/schema/upload-schema';

interface UploadedFilesCardProps {
  uploadedFiles: FileSchema[];
  onDelete: (key: string) => void;
  onChange: (data: FileSchema[]) => void;
}

export default function UploadedFilesCard({
  uploadedFiles,
  onDelete,
  onChange,
}: UploadedFilesCardProps) {
  if (uploadedFiles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Separator className="my-4" />
      <Sortable
        uniqueId="path"
        orientation="mixed"
        collisionDetection={closestCorners}
        value={uploadedFiles}
        onValueChange={onChange}
        overlay={<div className="size-full rounded-md bg-primary/10" />}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          <AnimatePresence>
            {uploadedFiles.map((file) => (
              <SortableItem value={file.path} key={file.path} asTrigger asChild>
                <Card className="group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={resolveUrl(file.path)}
                        alt={file.path}
                        fill
                        sizes="(min-width: 640px) 192px, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30" />

                      <Button
                        variant="destructive"
                        size="icon"
                        type="button"
                        className="pointer-events-auto absolute right-2 top-2 opacity-100 transition-opacity duration-300"
                        onClick={() => {
                          onDelete(file.path);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-3">
                      <p className="truncate text-sm font-medium">{file.path}</p>
                    </div>
                  </CardContent>
                </Card>
              </SortableItem>
            ))}
          </AnimatePresence>
        </div>
      </Sortable>
    </div>
  );
}
