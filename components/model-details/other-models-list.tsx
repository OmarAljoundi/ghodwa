import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { Model } from "@prisma/client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Separator } from "../ui/separator";

export function OtherModelsList({
  className,
  models,
  name,
  id,
}: {
  className: string;
  models: Array<Model>;
  name: string;
  id: number;
}) {
  const filteredModels = useFilteredLanguageData(models);

  return (
    <BlurFade delay={0.1} className={className}>
      <div className="bg-white rounded-3xl shadow-sm p-4  w-full">
        <div className="px-2 space-y-1">
          <h1
            aria-label={name}
            className="text-xl mb-4 ps-4 rtl:pe-4 font-bold"
          >
            {name}
          </h1>
          {filteredModels.map((props, index) => (
            <BlurFade delay={index * 0.2} direction={"left"} key={props.id}>
              <Link
                href={props.slug}
                aria-current={props.id == id}
                className={cn(
                  "p-1.5 rounded-lg flex justify-between items-center cursor-pointer",
                  props.id == id
                    ? "bg-primary font-bold"
                    : "hover:bg-primary/40  duration-300 transition-all"
                )}
              >
                <span className="ps-4 rtl:pe-4">{props.name}</span>
                {props.id != id && (
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
                  props.id == id ? "hidden" : "",
                  index == filteredModels.length - 1 ? "hidden" : ""
                )}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}
