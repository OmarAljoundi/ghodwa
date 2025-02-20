"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type UseAutoplayType = {
  autoplayIsPlaying: boolean;
  toggleAutoplay: () => void;
  onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (
  emblaApi: EmblaCarouselType | undefined
): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) {
      return;
    }

    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => {
        setAutoplayIsPlaying(true);
      })
      .on("autoplay:stop", () => {
        setAutoplayIsPlaying(false);
      })
      .on("reInit", () => {
        setAutoplayIsPlaying(autoplay.isPlaying());
      });
  }, [emblaApi]);

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick,
  };
};

type CarouselContextProps = {
  carouselOptions?: EmblaOptionsType;
  orientation?: "vertical" | "horizontal";
  plugins?: Parameters<typeof useEmblaCarousel>[1];
};

type DirectionOption = "ltr" | "rtl" | undefined;

type CarouselContextType = {
  emblaMainApi: ReturnType<typeof useEmblaCarousel>[1];
  mainRef: ReturnType<typeof useEmblaCarousel>[0];
  thumbsRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
  canScrollNext: boolean;
  canScrollPrev: boolean;
  activeIndex: number;
  onThumbClick: (index: number) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  orientation: "vertical" | "horizontal";
  direction: DirectionOption;
} & CarouselContextProps &
  UseAutoplayType;

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a CarouselProvider");
  }
  return context;
};

const CarouselContext = createContext<CarouselContextType | null>(null);

const Carousel = forwardRef<
  HTMLDivElement,
  CarouselContextProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      carouselOptions,
      orientation = "horizontal",
      dir,
      plugins,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
      {
        ...carouselOptions,
        loop: true,
        axis: orientation === "vertical" ? "y" : "x",
        direction: carouselOptions?.direction ?? (dir as DirectionOption),
      },
      plugins
    );

    const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
      useAutoplay(emblaMainApi);

    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
      ...carouselOptions,
      axis: orientation === "vertical" ? "y" : "x",
      direction: carouselOptions?.direction ?? (dir as DirectionOption),
      containScroll: "keepSnaps",
      dragFree: true,
    });
    const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
    const [canScrollNext, setCanScrollNext] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const ScrollNext = useCallback(() => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollNext();
    }, [emblaMainApi]);

    const ScrollPrev = useCallback(() => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollPrev();
    }, [emblaMainApi]);

    const direction = carouselOptions?.direction ?? (dir as DirectionOption);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!emblaMainApi) return;
        switch (event.key) {
          case "ArrowLeft":
            if (orientation === "horizontal") {
              if (direction === "rtl") {
                ScrollNext();
                return;
              }
              ScrollPrev();
            }
            break;
          case "ArrowRight":
            if (orientation === "horizontal") {
              if (direction === "rtl") {
                ScrollPrev();
                return;
              }
              ScrollNext();
            }
            break;
          case "ArrowUp":
            if (orientation === "vertical") {
              ScrollPrev();
            }
            break;
          case "ArrowDown":
            if (orientation === "vertical") {
              ScrollNext();
            }
            break;
        }
      },
      [emblaMainApi, orientation, direction, ScrollPrev, ScrollNext]
    );

    const onThumbClick = useCallback(
      (index: number) => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        emblaMainApi.scrollTo(index);
      },
      [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      const selected = emblaMainApi.selectedScrollSnap();
      setActiveIndex(selected);
      emblaThumbsApi.scrollTo(selected);
      setCanScrollPrev(emblaMainApi.canScrollPrev());
      setCanScrollNext(emblaMainApi.canScrollNext());
    }, [emblaMainApi, emblaThumbsApi]);

    useEffect(() => {
      if (!emblaMainApi) return;
      onSelect();
      emblaMainApi.on("select", onSelect);
      emblaMainApi.on("reInit", onSelect);
      return () => {
        emblaMainApi.off("select", onSelect);
      };
    }, [emblaMainApi, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          emblaMainApi,
          mainRef: emblaMainRef,
          thumbsRef: emblaThumbsRef,
          scrollNext: ScrollNext,
          scrollPrev: ScrollPrev,
          canScrollNext,
          canScrollPrev,
          activeIndex,
          onThumbClick,
          handleKeyDown,
          carouselOptions,
          direction,
          autoplayIsPlaying,
          onAutoplayButtonClick,
          toggleAutoplay,

          orientation:
            orientation ||
            (carouselOptions?.axis === "y" ? "vertical" : "horizontal"),
        }}
      >
        <div
          {...props}
          tabIndex={0}
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            "relative grid w-full gap-2 focus:outline-none",
            className
          )}
          dir={direction}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

const CarouselMainContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { mainRef, orientation } = useCarousel();

  return (
    <div {...props} ref={mainRef} className="overflow-hidden" dir={"ltr"}>
      <div
        ref={ref}
        className={cn(
          "flex",
          `${orientation === "vertical" ? "flex-col" : ""}`,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
});

CarouselMainContainer.displayName = "CarouselMainContainer";

const CarouselThumbsContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { thumbsRef, direction } = useCarousel();

  return (
    <div {...props} ref={thumbsRef} className="overflow-hidden" dir={direction}>
      <div ref={ref} className={cn("flex flex-col", className)}>
        {children}
      </div>
    </div>
  );
});

CarouselThumbsContainer.displayName = "CarouselThumbsContainer";

const SliderMainItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        `min-w-0 shrink-0 grow-0 basis-full bg-background lg:p-1 ${
          orientation === "vertical" ? "lg:pb-1" : "lg:pr-1"
        }`,
        className
      )}
    >
      {children}
    </div>
  );
});

SliderMainItem.displayName = "SliderMainItem";

const SliderThumbItem = forwardRef<
  HTMLDivElement,
  {
    index: number;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ className, index, children, ...props }, ref) => {
  const { activeIndex, onThumbClick, orientation } = useCarousel();
  const isSlideActive = activeIndex === index;
  return (
    <div
      {...props}
      ref={ref}
      onClick={() => onThumbClick(index)}
      className={cn(
        "flex min-w-0 shrink-0 grow-0 basis-1/4 bg-background p-1",
        `${orientation === "vertical" ? "pb-1" : "pr-1"}`,
        className
      )}
    >
      <div
        className={`relative aspect-square h-20 w-full rounded-md opacity-40 transition-opacity ${
          isSlideActive ? "!opacity-100" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
});

SliderThumbItem.displayName = "SliderThumbItem";

const CarouselIndicator = forwardRef<
  HTMLButtonElement,
  { index: number } & React.ComponentProps<typeof Button>
>(({ className, index, ...props }, ref) => {
  const { activeIndex, onThumbClick, onAutoplayButtonClick } = useCarousel();
  const isSlideActive = activeIndex === index;
  return (
    <Button
      ref={ref}
      size="icon"
      className={cn(
        "h-1 w-6 rounded-full border-2 border-white",
        "data-[active='false']:bg-black data-[active='true']:bg-primary",
        className
      )}
      data-active={isSlideActive}
      onClick={() => onAutoplayButtonClick(() => onThumbClick(index))}
      {...props}
    >
      <span className="sr-only">slide {index + 1} </span>
    </Button>
  );
});

CarouselIndicator.displayName = "CarouselIndicator";

const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const {
    canScrollNext,
    canScrollPrev,
    scrollNext,
    scrollPrev,
    orientation,
    direction,
  } = useCarousel();

  const scroll = direction === "rtl" ? scrollNext : scrollPrev;
  const canScroll = direction === "rtl" ? canScrollNext : canScrollPrev;
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10 h-12 w-12 rounded-full",
        orientation === "vertical"
          ? "-top-2 left-1/2 -translate-x-1/2 rotate-90"
          : "-left-2 top-1/2 -translate-y-1/2",
        className
      )}
      onClick={scroll}
      disabled={!canScroll}
      {...props}
    >
      <ChevronLeft className="h-12 w-12" color="white" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const {
    canScrollNext,
    canScrollPrev,
    scrollNext,
    scrollPrev,
    orientation,
    direction,
  } = useCarousel();
  const scroll = direction === "rtl" ? scrollPrev : scrollNext;
  const canScroll = direction === "rtl" ? canScrollPrev : canScrollNext;
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10 h-12 w-12 rounded-full",
        orientation === "vertical"
          ? "-bottom-2 left-1/2 -translate-x-1/2 rotate-90"
          : "-right-2 top-1/2 -translate-y-1/2",
        className
      )}
      onClick={scroll}
      disabled={!canScroll}
      {...props}
    >
      <ChevronRight className="h-12 w-12" color="white" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});

CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
  useCarousel,
};
