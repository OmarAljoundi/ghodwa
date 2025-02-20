"use client";
import React from "react";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { Service } from "@prisma/client";

export function ServicesPagesSitemap({
  className,
  services,
}: {
  className?: string;
  services: Service[];
}) {
  const servicesFiltered = useFilteredLanguageData(services);
  const pathname = usePathname();
  const { t } = useTranslation("common");

  return (
    <BlurFade delay={0.1} className={className}>
      <div className="bg-white rounded-3xl shadow-sm p-4  w-full">
        <h1 className="text-xl mb-4">{t("Our Services")}</h1>
        <div className="px-2 space-y-1">
          {servicesFiltered.map((props, index) => (
            <BlurFade delay={index * 0.2} direction={"left"} key={props.title}>
              <Link
                href={`/services/${props.slug}`}
                aria-current={pathname.includes(props.slug)}
                className={cn(
                  "p-1.5 rounded-lg flex justify-between items-center cursor-pointer",
                  pathname.includes(props.slug)
                    ? "bg-primary font-bold"
                    : "hover:bg-primary/40  duration-300 transition-all"
                )}
              >
                <span className="ps-4 rtl:pe-4">{props.title}</span>
                {!pathname.includes(props.slug) && (
                  <ArrowRight
                    className={"size-4 !text-primary bg-transparent"}
                  />
                )}
              </Link>

              <Separator
                className={cn(
                  "first:hidden",
                  pathname.includes(props.slug) ? "hidden" : "",
                  index == servicesFiltered.length - 1 ? "hidden" : ""
                )}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}
