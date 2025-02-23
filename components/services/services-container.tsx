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
    <div className="grid grid-cols-[12fr] gap-y-4 lg:gap-y-0 lg:grid-cols-[4fr,4fr,4fr] lg:gap-x-4 xl:gap-6 2xl:gap-x-8 ">
      {filteredServices?.map(({ icon, slug, image, title, id }, index) => (
        <BlurFade
          delay={index * 0.3}
          blur="16px"
          inView
          direction="up"
          className="basis-full lg:basis-1/3  p-4 h-60 lg:h-96 "
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
