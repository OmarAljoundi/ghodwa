"use client";
import React, { use } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { getSettings } from "@/query";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import Link from "next/link";

export function SubHeroSection({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getSettings>;
}) {
  const {
    home: { moreSection },
  } = use(dataPromise);
  const { callToAction, subtitle, title, media } =
    useFilteredLanguageData(moreSection);
  const { url, text } = useFilteredLanguageData(callToAction);
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <Image
        src={media?.url}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        className="rounded-none lg:rounded-3xl"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />

      <div className="absolute inset-0 gradient-overlay rounded-none lg:rounded-3xl" />

      <div className="grid-pattern rounded-none lg:rounded-3xl" />

      <div className="relative h-full w-full flex items-center justify-center">
        <div className="flex flex-row-reverse items-center space-x-4 z-10 h-full">
          <div className="text content px-4 lg:px-24 items-center w-full  lg:w-2/3 xl:w-[50%] 2xl:w-[35%] me-auto rtl:ms-auto rtl:me-0 space-y-6 z-10">
            <h1 className="font-bold text-2xl md:text-7xl text-gray-50 relative z-10">
              {title}
            </h1>
            <p className="font-light text-base text-gray-50 relative z-10">
              {subtitle}
            </p>
            <Link href={url} className="block">
              <Button
                className="z-10 bg-yellow-500 text-black px-4 rounded-xl py-6"
                size="lg"
              >
                {text}
                <div className="bg-white rounded-md -me-1 ms-2 p-1">
                  <ArrowRight
                    className="size-6 rtl:rotate-180"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
