import React from "react";
import { BlurFade } from "../ui/blur-fade";
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from "../ui/carousel";
import Image from "next/image";
import { Model } from "@prisma/client";

export function ImageModelSlider({
  className,
  currentModel,
}: {
  className: string;
  currentModel: Model;
}) {
  return (
    <BlurFade direction={"up"} className={className}>
      <Carousel className="w-full h-[300px] lg:h-[500px]">
        <CustomCarousel
          slides={
            currentModel?.image.map((prop: any) => prop.url as string) ?? []
          }
        />
        <CustomCarouselControls
          slides={
            currentModel?.image.map((prop: any) => prop.url as string) ?? []
          }
        />
      </Carousel>
    </BlurFade>
  );
}

function CustomCarousel({ slides }: { slides: Array<string> }) {
  return (
    <CarouselMainContainer className="w-full h-full">
      {slides.map((item, index) => (
        <CustomCarouselItem key={index} index={index} item={item} />
      ))}
    </CarouselMainContainer>
  );
}

function CustomCarouselItem({ index, item }: { item: string; index: number }) {
  return (
    <SliderMainItem key={index} className="w-full h-full !p-0">
      <div className="relative w-full h-full">
        <Image
          src={item}
          alt={item}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-3xl aspect-video"
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
    </SliderMainItem>
  );
}

function CustomCarouselControls({ slides }: { slides: Array<string> }) {
  return (
    <div className="absolute bottom-4 left-0   bg-transparent py-2 rounded-tl-3xl px-8">
      <CarouselThumbsContainer className="space-x-1 flex flex-row items-center gap-1">
        {slides.map((_, index) => (
          <CarouselIndicator
            className="size-3 data-[active='false']:bg-transparent data-[active='true']:bg-white"
            key={index}
            index={index}
          />
        ))}
      </CarouselThumbsContainer>
    </div>
  );
}
