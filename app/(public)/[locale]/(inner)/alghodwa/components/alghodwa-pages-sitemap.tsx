"use client";
import React from "react";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { AlGhodwaMenu } from "@/components/menu/nav-items";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

export function AlghodwaPagesSitemap({ className }: { className: string }) {
  const alGhodwaMenuFiltered = useFilteredLanguageData(AlGhodwaMenu);
  const pathname = usePathname();
  const { t } = useTranslation("common");

  return (
    <BlurFade delay={0.1} className={className}>
      <div className="bg-white rounded-3xl shadow-sm p-4  w-full">
        <h1 className="text-xl mb-4 ps-4 rtl:pe-4 font-bold">
          {t("Alghodwa")}
        </h1>
        <div className="px-2 space-y-1">
          {alGhodwaMenuFiltered.map((props, index) => (
            <BlurFade delay={index * 0.2} direction={"left"} key={props.title}>
              <Link
                href={props.url}
                aria-current={props.url == pathname}
                className={cn(
                  "p-1.5 rounded-lg flex justify-between items-center cursor-pointer",
                  props.url == pathname
                    ? "bg-primary font-bold"
                    : "hover:bg-primary/40  duration-300 transition-all"
                )}
              >
                <span className="ps-4 rtl:pe-4">{t(props.title)}</span>
                {props.url != pathname && (
                  <ArrowRight
                    className={
                      "size-4 !text-primary bg-transparent rtl:rotate-180"
                    }
                  />
                )}
              </Link>

              <Separator
                className={cn(
                  "first:hidden",
                  props.url == pathname ? "hidden" : "",
                  index == alGhodwaMenuFiltered.length - 1 ? "hidden" : ""
                )}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}
