import * as React from "react";
import { type UseUploadthingProps } from "@uploadthing/react";

import { useUploadThing } from "@/lib/uploadthing";
import { FileRouter } from "@/file-router";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
type UseUploadThingyProps = UseUploadthingProps<FileRouter, keyof FileRouter>;

export function useUploadThingy(
  endpoint: keyof FileRouter,
  props: UseUploadThingyProps = {}
) {
  const [progress, setProgress] = React.useState(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
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
