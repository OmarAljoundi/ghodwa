import * as React from "react"
import { type UseUploadthingProps } from "@uploadthing/react"

import { useUploadThing } from "@/lib/uploadthing"
import { FileRouter } from "@/file-router"

type UseUploadThingyProps = UseUploadthingProps<FileRouter, keyof FileRouter>

export function useUploadThingy(
  endpoint: keyof FileRouter,
  props: UseUploadThingyProps = {}
) {
  const [progress, setProgress] = React.useState(0)
  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onUploadProgress: () => {
      setProgress(progress)
    },
    ...props,
  })

  return {
    startUpload,
    isUploading,
    progress,
  }
}