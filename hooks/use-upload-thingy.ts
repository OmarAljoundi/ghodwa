import type { UseUploadthingProps } from '@uploadthing/react';
import * as React from 'react';
import type { FileRouter } from '@/file-router';
import { useUploadThing } from '@/lib/uploadthing';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
type UseUploadThingyProps = UseUploadthingProps<FileRouter, keyof FileRouter>;

export function useUploadThingy(endpoint: keyof FileRouter, props: UseUploadThingyProps = {}) {
  const [progress, setProgress] = React.useState(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onUploadProgress: () => {
      setProgress(progress);
    },

    ...props,
  });

  return {
    startUpload,
    isUploading,
    progress,
  };
}
