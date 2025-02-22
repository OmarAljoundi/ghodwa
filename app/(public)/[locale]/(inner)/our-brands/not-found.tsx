import { Illustration, NotFound } from "@/components/not-found";
import React from "react";
import RegisterInnerPageClient from "@/store/register-inner-page-client";

export default function NotFoundPage() {
  return (
    <div className="relative flex flex-col w-full justify-center  bg-background p-6 md:p-10">
      <RegisterInnerPageClient title="Page not found" />
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground" />
        <NotFound
          title="There are no items here"
          description="Check later for more items"
        />
      </div>
    </div>
  );
}
