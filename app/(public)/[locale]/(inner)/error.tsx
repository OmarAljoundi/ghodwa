"use client";

import { Illustration, NotFound } from "@/components/not-found";
import { useAddInnerPage } from "@/store/inner-page";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  useAddInnerPage("Page not found");

  return (
    <div className="relative flex flex-col w-full justify-center  bg-background p-6 md:p-10">
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground" />
        <NotFound
          title="Page not found"
          description="Lost this page is In another system it may be"
        />
      </div>
    </div>
  );
}
