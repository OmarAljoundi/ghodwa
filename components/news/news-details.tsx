"use client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { getNewsBySlug } from "@/query";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import Image from "next/image";
import React, { use } from "react";

export function NewsDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getNewsBySlug>;
}) {
  const data = use(dataPromise);
  const { content, createdAt, image, title } = useFilteredLanguageData(data);
  const readingTime = Math.ceil(content.split(" ").length / 200);

  return (
    <article className="mx-auto  animate-fade-in">
      {image && (
        <div className="relative w-full h-60 lg:h-96 mb-8  overflow-hidden flex justify-start ">
          <Image
            src={(image as any).url}
            alt={title}
            fill
            className="object-contain rounded-3xl sm:!w-auto"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="flex items-center text-gray-600 mb-6">
        <Clock className="w-4 h-4 mr-2" />
        <span className="mr-4">{readingTime} min read</span>
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
      {/* <Separator className="my-4" />
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Posted by {createdBy}</p>
        <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <Share2 className="w-4 h-4 mr-2" />
          Share this article
        </button>
      </div> */}
    </article>
  );
}
