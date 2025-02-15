"use client";
import React, { use, useRef } from "react";
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  useCarousel,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { getSettings } from "@/query";
import { SettingSchema } from "@/schema/setting-schema";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";

export default function HeroSection({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getSettings>;
}) {
  const {
    home: { homehero },
  } = use(dataPromise);

  const plugin = useRef(
    Autoplay({
      delay: 10000,
      stopOnInteraction: true,
      playOnInit: true,
    })
  );
  return (
    <div className="relative w-full h-[400px] md:h-[700px]">
      <Carousel
        className="w-full h-full "
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
      >
        <CustomCarousel homehero={homehero} />
        <CustomCarouselControls homehero={homehero} />
      </Carousel>
    </div>
  );
}

function CustomCarousel({
  homehero,
}: {
  homehero: SettingSchema["home"]["homehero"];
}) {
  return (
    <CarouselMainContainer className="w-full h-full ">
      {homehero.map((item, index) => (
        <CustomCarouselItem key={index} index={index} item={item} />
      ))}
    </CarouselMainContainer>
  );
}
function CustomCarouselItem({
  index,
  item,
}: {
  item: SettingSchema["home"]["homehero"][number];
  index: number;
}) {
  const { title, media } = useFilteredLanguageData(item);
  return (
    <SliderMainItem key={index} className="w-full h-full after">
      <div className="relative w-full h-full">
        <Image
          src={media?.url}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="lg:rounded-3xl"
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent lg:rounded-3xl" />{" "}
        <div className="relative h-full w-full ">
          <div className="flex flex-row-reverse items-center space-x-4 z-10 h-full">
            <div className="text content ltr:pe-36 rtl:ps-36  ltr:ps-4 rtl:pe-4 items-center w-full lg:w-2/3 xl:w-[35%] me-auto space-y-6 z-10">
              <h1 className="font-light text-3xl md:text-6xl text-gray-50 relative z-10 rtl:text-right">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </SliderMainItem>
  );
}

function CustomCarouselControls({
  homehero,
}: {
  homehero: SettingSchema["home"]["homehero"];
}) {
  const { toggleAutoplay, autoplayIsPlaying } = useCarousel();

  return (
    <React.Fragment>
      <div className="absolute bottom-0 right-0  gap-2 bg-background py-2 rounded-tl-3xl px-8">
        <CarouselThumbsContainer className="space-x-1 flex flex-row items-center">
          {homehero.map((_, index) => (
            <CarouselIndicator className="size-4" key={index} index={index} />
          ))}
          <div className="ps-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-black hover:text-black/50"
              onClick={() => toggleAutoplay()}
            >
              {autoplayIsPlaying ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </Button>
          </div>
        </CarouselThumbsContainer>
        <div className="bg-white size-[30px] [clip-path:path('M0_0_Q0,30_30,30_L_0_30_Z')] absolute  bottom-[99.9%] right-0 -rotate-90"></div>
        <div className="bg-white size-[30px] [clip-path:path('M0_0_Q0,30_30,30_L_0_30_Z')] absolute  bottom-0 right-[99.9%] -rotate-90"></div>
      </div>
    </React.Fragment>
  );
}
