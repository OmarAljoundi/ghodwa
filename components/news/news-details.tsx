"use client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { cn } from "@/lib/utils";
import { getNewsBySlug } from "@/query";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import Image from "next/image";
import React, { use } from "react";
import { useTranslation } from "react-i18next";

export function NewsDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getNewsBySlug>;
}) {
  const data = use(dataPromise);
  const { content, createdAt, image, title } = useFilteredLanguageData(data);
  const readingTime = Math.ceil(content.split(" ").length / 200);
  const { t } = useTranslation("common");

  return (
    <article
      className={cn(
        "grid gap-y-4 lg:grid-cols-[4fr,8fr] lg:gap-x-8 items-start"
      )}
    >
      {image && (
        <div className="relative w-full h-60 sm:h-96   overflow-hidden flex justify-start ">
          <Image
            src={(image as any).url}
            alt={title}
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      )}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center text-gray-600 mb-6">
          <Clock className="w-4 h-4 rtl:ml-2 ltr:mr-2 " />
          <span className="ltr:mr-4 rtl:ml-4">
            {readingTime} {t("min read")}
          </span>
          <h3 className="whitespace-nowrap text-primary flex-shrink-0">
            {format(createdAt, "dd. MM. yyyy")}
          </h3>
        </div>

        <div className="minimal-tiptap-editor">
          <div
            className="ProseMirror"
            dangerouslySetInnerHTML={{ __html: content ?? "" }}
          />
        </div>
      </div>
    </article>
  );
}
