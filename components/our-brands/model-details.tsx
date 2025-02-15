"use client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { getModelBySlug } from "@/query";
import { useAddInnerPage } from "@/store/inner-page";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { ArrowRight, Mail } from "lucide-react";
import { BlurFade } from "../ui/blur-fade";
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from "../ui/carousel";
import { ModelSchema } from "@/schema";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";

export function ModelDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getModelBySlug>;
}) {
  const { currentModel } = use(dataPromise);
  const { name } = useFilteredLanguageData(currentModel);

  useAddInnerPage(name);

  return (
    <div className="grid grid-cols-[12fr] lg:grid-cols-[4fr,8fr] xl:grid-cols-[3fr,9fr] mt-8 gap-8">
      <LeftDetails dataPromise={dataPromise} />
      <RightDetails dataPromise={dataPromise} />
    </div>
  );
}

function LeftDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getModelBySlug>;
}) {
  const { currentModel, models } = use(dataPromise);
  const { name, id, category } = useFilteredLanguageData(currentModel);
  const currentCategory = useFilteredLanguageData(category);

  const currentLogo = useFilteredLanguageData(currentCategory.brand!);
  const filteredModels = useFilteredLanguageData(models);
  return (
    <div className="flex flex-col items-center space-y-8">
      <BlurFade direction={"up"}>
        <Image
          src={(currentLogo?.logo as any)?.url}
          alt={currentLogo?.name}
          width={150}
          height={150}
          quality={100}
          className="object-contain"
        />
      </BlurFade>
      <BlurFade delay={0.1} className="lg:px-6 w-full">
        <div className="bg-white rounded-3xl shadow-sm p-4  w-full">
          <h1 aria-label={name} className="text-lg mb-4">
            {currentCategory.name}
          </h1>
          <div className="px-2 space-y-1">
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
                      className={"size-4 !text-primary bg-transparent"}
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
      <BlurFade
        delay={0.3}
        className=" rounded-xl bg-primary py-4 px-6 w-full flex justify-between items-center"
      >
        <div className="font-light text-black text-lg">Download Brochure</div>
        <IoArrowDownCircleOutline className="text-white size-12" />
      </BlurFade>
      <BlurFade
        delay={0.5}
        className="rounded-xl  w-full flex flex-wrap gap-x-4 gap-y-4 justify-between"
      >
        <div className="font-light text-black text-lg">
          Contact <br /> Sales
        </div>
        <div className="flex justify-start gap-x-6">
          <div className="flex flex-col gap-1 items-center justify-center">
            <Mail className="size-6 text-primary" />
            <span className="text-[9px]">Email</span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <FiPhone className="size-6" />
            <span className="text-[9px]">Call</span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <FaWhatsapp className="size-6 text-green-700" />
            <span className="text-[9px] ">Whatsapp</span>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

function RightDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getModelBySlug>;
}) {
  const { currentModel } = use(dataPromise);
  const { description, specification } = useFilteredLanguageData(currentModel);
  const filteredSpecification = useFilteredLanguageData(
    specification as ModelSchema["specification"]
  );
  return (
    <div className="flex flex-col items-center space-y-8 ">
      <BlurFade direction={"up"} className="w-full">
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
      <BlurFade
        delay={0.1}
        direction={"left"}
        className="w-full text-black leading-5"
      >
        <p>{description}</p>
      </BlurFade>

      <BlurFade
        delay={0.3}
        direction={"left"}
        className="flex justify-start rtl:justify-end w-full"
      >
        <div className="rounded-lg px-3 py-1  border-2 border-primary text-xl text-black font-bold">
          Specifications{" "}
        </div>
      </BlurFade>

      <BlurFade
        delay={0.5}
        direction={"left"}
        className="flex flex-col w-full space-y-3"
      >
        {filteredSpecification.map((prop) => (
          <React.Fragment key={prop.id}>
            <div className="flex justify-between gap-x-2">
              <h1 className="font-bold  lg:min-w-80">{prop.key}</h1>
              <h3>{prop.value}</h3>
            </div>
            <Separator className="first:hidden last:hidden bg-primary" />
          </React.Fragment>
        ))}
      </BlurFade>
    </div>
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
    <SliderMainItem key={index} className="w-full h-full after">
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
