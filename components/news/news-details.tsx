"use client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { cn } from "@/lib/utils";
import { getNewsBySlug } from "@/query";
import { News } from "@prisma/client";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import React, { use } from "react";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from "../ui/carousel";
import { UploadedFileOmit } from "@/lib/types";
import ResponsiveImage from "../responsive-image";

export function NewsDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getNewsBySlug>;
}) {
  const data = use(dataPromise);
  const { content, createdAt, title } = useFilteredLanguageData(data);
  const readingTime = Math.ceil(content.split(" ").length / 200);
  const { t } = useTranslation("common");

  return (
    <article
      className={cn(
        "grid gap-y-4 lg:grid-cols-[4fr,8fr] lg:gap-x-8 items-start"
      )}
    >
      {data.image.length > 0 && (
        <Carousel className="h-60 sm:h-96 ">
          <CustomCarousel news={data} />
          <CustomCarouselControls news={data} />
        </Carousel>
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

function CustomCarousel({ news }: { news: News }) {
  return (
    <CarouselMainContainer className="w-full h-full ">
      {news.image.map((item, index) => (
        <CustomCarouselItem
          key={index}
          index={index}
          item={item as UploadedFileOmit}
        />
      ))}
    </CarouselMainContainer>
  );
}

function CustomCarouselItem({
  index,
  item,
}: {
  item: UploadedFileOmit;
  index: number;
}) {
  return (
    <SliderMainItem key={index} className="w-full h-full after">
      <div className="relative w-full h-full">
        <ResponsiveImage
          alt={item.name}
          priority={index === 0}
          fill
          style={{ objectFit: "cover" }}
          largeSrc={item?.url}
          smallSrc={item?.url}
          className="rounded-3xl"
        />
      </div>
    </SliderMainItem>
  );
}

function CustomCarouselControls({ news }: { news: News }) {
  return (
    <React.Fragment>
      <div className="absolute bottom-2 right-6  gap-2 bg-transparent py-2 rounded-tl-3xl ">
        <CarouselThumbsContainer className="space-x-1 flex flex-row items-center">
          {news.image.map((_, index) => (
            <CarouselIndicator
              isAutoPlayEnabled={false}
              className="size-4"
              key={index}
              index={index}
            />
          ))}
        </CarouselThumbsContainer>
      </div>
    </React.Fragment>
  );
}
