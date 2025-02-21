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
import { Button } from "@/components/ui/button";
import { getSettings } from "@/query";
import { SettingSchema } from "@/schema/setting-schema";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import ResponsiveImage from "../responsive-image";
import { RiPauseLine, RiPlayLine } from "react-icons/ri";

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
    <div className="relative w-full h-[400px] md:h-[700px] p-2 lg:p-0">
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
  const { title, media, mobile_media } = useFilteredLanguageData(item);
  return (
    <SliderMainItem key={index} className="w-full h-full after">
      <div className="relative w-full h-full">
        <ResponsiveImage
          alt={title}
          priority={index === 0}
          fill
          style={{ objectFit: "cover" }}
          largeSrc={media?.url}
          smallSrc={mobile_media?.url}
          className="rounded-3xl"
        />
        <div className="absolute inset-0 bg-black/50 lg:bg-transparent lg:bg-gradient-to-r rtl:lg:bg-gradient-to-l lg:from-black/60 lg:via-black/30 lg:to-transparent rounded-3xl" />{" "}
        <div className="relative h-full w-full ">
          <div className="flex flex-row-reverse items-center space-x-4 z-10 h-full">
            <div
              className="text content ltr:pe-16 rtl:ps-16  ltr:ps-4 rtl:pe-4  ltr:lg:pe-24 rtl:lg:ps-24  
            ltr:lg:ps-8 rtl:lg:pe-8 items-center w-full lg:w-2/3  ltr:me-auto rtl:me-[unset] rtl:ms-auto space-y-6 z-10"
            >
              <h1 className="font-light text-3xl md:text-6xl text-gray-50 relative z-10 rtl:text-right whitespace-pre-line rtl:md:leading-[75px] rtl:leading-10">
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
              className="h-8 w-8 text-black hover:text-black/50 hover:bg-transparent"
              onClick={() => toggleAutoplay()}
            >
              {autoplayIsPlaying ? (
                <RiPauseLine className="size-5" />
              ) : (
                <RiPlayLine className="size-5" />
              )}
            </Button>
          </div>
        </CarouselThumbsContainer>
        <div className="bg-background size-[30px] [clip-path:path('M0_0_Q0,30_30,30_L_0_30_Z')] absolute  bottom-full right-0 -rotate-90"></div>
        <div className="bg-background size-[30px] [clip-path:path('M0_0_Q0,30_30,30_L_0_30_Z')] absolute  bottom-0 right-full -rotate-90"></div>
      </div>
    </React.Fragment>
  );
}
