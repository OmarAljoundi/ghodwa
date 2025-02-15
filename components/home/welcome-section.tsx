"use client";

import React, { use } from "react";
import { Button } from "../ui/button";
import { getServices, getSettings } from "@/query";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import Link from "next/link";
import { ServiceCard } from "../service-card";
import { Service } from "@prisma/client";
import { BlurFade } from "../ui/blur-fade";
import { ArrowRight } from "lucide-react";

export function WelcomeSection({
  dataPromise,
  dataPromiseServices,
}: {
  dataPromise: ReturnType<typeof getSettings>;
  dataPromiseServices: ReturnType<typeof getServices>;
}) {
  const data = use(dataPromise);
  const services = use(dataPromiseServices);

  const { callToAction, subtitle, title } = useFilteredLanguageData(
    data.home.welcomeSection
  );
  const { url, text } = useFilteredLanguageData(callToAction);
  return (
    <div className="grid grid-cols-[12fr] lg:grid-cols-[4fr,8fr] container mx-auto gap-x-20 gap-y-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-5xl">{title}</h1>
        <p className="text-lg">{subtitle}</p>
        <Link href={url}>
          <Button
            className="z-10 bg-black text-primary lg:mt-16 mt-4  px-4 rounded-xl py-6 duration-300 transition-all hover:text-primary-foreground group"
            size="lg"
          >
            {text}
            <div className="bg-primary text-black group-hover:bg-white duration-300 transition-all rounded-md -me-1 ms-2 p-1">
              <ArrowRight
                className="size-6 rtl:rotate-180 "
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-[12fr] gap-y-4 lg:gap-y-0 lg:grid-cols-[4fr,4fr,4fr] gap-x-8 ">
        {services.map((service, index) => (
          <BlurFade
            key={service.id}
            inView
            delay={0.3 * index}
            className="h-60 lg:h-full"
          >
            <ServiceCardItem service={service} />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

function ServiceCardItem({ service }: { service: Service }) {
  const { image, icon, title } = useFilteredLanguageData(service);

  return (
    <ServiceCard
      icon={(icon as any)?.url}
      backgroundImage={(image as any)?.url}
      title={title}
    />
  );
}
