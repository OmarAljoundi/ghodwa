"use client";

import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { getNews, getSettings } from "@/query";
import { News } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { BlurFade } from "../ui/blur-fade";
import { useTranslation } from "react-i18next";

export function NewSection({
  dataPromise,
  dataPromiseNews,
}: {
  dataPromise: ReturnType<typeof getSettings>;
  dataPromiseNews: ReturnType<typeof getNews>;
}) {
  const {
    home: { latestNews },
  } = use(dataPromise);
  const news = use(dataPromiseNews);
  const { title } = useFilteredLanguageData(latestNews);
  return (
    <div className="container mx-auto ">
      <div className="flex-col flex mx-auto items-center gap-y-2 lg:gap-y-8">
        <h1 className="text-4xl">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
          {news.map((item, index) => (
            <BlurFade key={item.id} inView delay={0.35 * index}>
              <NewsItem {...item} />
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsItem(props: News) {
  const { createdAt, image, slug, summary, title } =
    useFilteredLanguageData(props);
  const { t } = useTranslation("common");

  return (
    <Link href={`/news/${slug}`}>
      <div className="group cursor-pointer">
        <div className="relative aspect-[4/3] w-full mb-4">
          {image && (image as any[]).length > 0 && (
            <Image
              src={(image as any[])[0]?.url}
              alt={title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          <div className="absolute -bottom-[1px] -left-[1px] gap-2 bg-background py-2 rounded-tr-[50px] px-8">
            <div className="flex items-center gap-3 pe-4 pt-3">
              <span className="text-primary font-medium text-sm">
                {t("NEWS")}
              </span>
              <span className="text-gray-500 text-sm tracking-wider">
                {format(createdAt, "dd. MM. yyyy")}
              </span>
            </div>
            <div className="bg-background size-[29px] [clip-path:path('M0_0_Q0,30_30,30_L_0_30_Z')] absolute bottom-[97.47%] left-0 "></div>
            <div className="bg-background size-[29px] [clip-path:path('M0_0_Q0,30,30,30_L_0_30_Z')] absolute bottom-0 left-[97.47%] "></div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
