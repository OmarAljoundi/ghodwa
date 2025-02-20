"use client";
import React, { use } from "react";
import Image from "next/image";
import { getBrands, getSettings } from "@/query";
import { Marquee } from "../ui/marquee";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { BlurFade } from "../ui/blur-fade";
import Link from "next/link";

export function BrandSection({
  dataPromise,
  dataPromiseSettings,
}: {
  dataPromise: ReturnType<typeof getBrands>;
  dataPromiseSettings: ReturnType<typeof getSettings>;
}) {
  const brands = use(dataPromise);
  const {
    home: { brand },
  } = use(dataPromiseSettings);
  const { title } = useFilteredLanguageData(brand);
  const filterdBrands = useFilteredLanguageData(brands);
  return (
    <div className="flex-col flex mx-auto items-center gap-y-2 lg:gap-y-8 overflow-hidden">
      <h1 className="text-3xl">{title}</h1>
      <Marquee
        repeat={15}
        pauseOnHover
        className="[--duration:20s] [--gap:2rem] [gap:var(--gap)]"
      >
        {filterdBrands.map(({ logo, name, slug }, index) => (
          <Link key={index} href={`/our-brands/${slug}`}>
            <BlurFade
              inView
              delay={0.3 * index}
              className="hover:bg-white duration-300 transition-all rounded-lg p-2 cursor-pointer"
            >
              <Image
                key={index}
                alt={name}
                aria-label={name}
                src={(logo as { url: string })?.url ?? ""}
                width={100}
                className="object-contain size-16 lg:size-28"
                height={100}
              />
            </BlurFade>
          </Link>
        ))}
      </Marquee>
    </div>
  );
}
