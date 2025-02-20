"use client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { getServiceBySlug } from "@/query";
import React, { use } from "react";
import { BlurFade } from "../ui/blur-fade";

export function ServiceDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getServiceBySlug>;
}) {
  const { content, title } = useFilteredLanguageData(use(dataPromise));
  return (
    <article className="mx-auto  ">
      <BlurFade
        delay={0.3}
        blur="16px"
        inView
        direction="up"
        className="text-4xl font-bold mb-4"
      >
        {title}
      </BlurFade>

      <BlurFade
        delay={0.75}
        blur="16px"
        inView
        direction="up"
        className="minimal-tiptap-editor"
      >
        <div
          className="ProseMirror"
          dangerouslySetInnerHTML={{ __html: content ?? "" }}
        />
      </BlurFade>
    </article>
  );
}
