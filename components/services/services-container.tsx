"use client";
import { getServices } from "@/query";
import React, { use } from "react";
import { ServiceCard } from "../service-card";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import Link from "next/link";
import { BlurFade } from "../ui/blur-fade";

export function ServicesContainer({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getServices>;
}) {
  const services = use(dataPromise);
  const filteredServices = useFilteredLanguageData(services);

  return (
    <div className="flex flex-wrap  items-center justify-center justify-items-center place-items-center h-[440px]">
      {filteredServices?.map(({ icon, slug, image, title, id }, index) => (
        <BlurFade
          delay={index * 0.3}
          blur="16px"
          inView
          direction="up"
          className="lg:basis-1/3 xl:basis-1/4 p-4 h-full"
          key={id}
        >
          <Link href={`/services/${slug}`}>
            <ServiceCard
              icon={(icon as any)?.url}
              backgroundImage={(image as any)?.url}
              title={title}
            />
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
