"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ServiceCardProps {
  className?: string;
  fullHeight?: boolean;
  backgroundImage: string;
  icon: string;
  title: string;
}

export const ServiceCard = ({
  className,
  backgroundImage,
  icon,
  title,
  fullHeight = true,
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        "relative w-full",
        fullHeight ? "h-full" : "h-96",
        className
      )}
    >
      <Image
        src={backgroundImage}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        className="rounded-3xl"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />

      <div className="absolute inset-0  rounded-3xl" />

      <div
        className="grid-pattern rounded-3xl"
        style={{
          maskImage: "none",
          WebkitMaskImage: "none",
          maskComposite: "unset",
          WebkitMaskComposite: "unset",
        }}
      />

      <div className="absolute  bottom-6 ltr:left-4 rtl:right-4">
        <h1 className="text-3xl text-white">{title}</h1>
      </div>

      <div className="absolute  top-9 ltr:right-6 rtl:left-6 z-50 size-20">
        <Image
          src={icon}
          alt={title}
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
};
