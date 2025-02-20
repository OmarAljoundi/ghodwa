"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { BrandWithRelationsSchema } from "@/schema";
import type { Service } from "@prisma/client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ActionMenu from "./action-menu";
import { AlGhodwaMenu } from "./nav-items";
import { useTranslation } from "react-i18next";

export default function MobileMenu({
  isRTL,
  brands,
  services,
}: {
  isRTL: boolean;
  brands: BrandWithRelationsSchema[];
  services: Service[];
}) {
  const [open, setOpen] = useState(false);
  const brandsFilter = useFilteredLanguageData(brands);
  const servicesFilter = useFilteredLanguageData(services);
  const alghodowaFilter = useFilteredLanguageData(AlGhodwaMenu);
  const { t } = useTranslation("common");

  return (
    <div className="flex lg:hidden gap-x-2">
      <ActionMenu />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="group text-black"
            variant="default"
            size="icon"
            onClick={() => setOpen((prevState) => !prevState)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg
              className="pointer-events-none"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L20 12"
                className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={isRTL ? "right" : "left"}
          className="w-[300px] sm:w-[400px]  backdrop-blur-md text-black overflow-y-auto"
        >
          <SheetTitle className="sr-only">Menu Item</SheetTitle>
          <nav className="flex flex-col space-y-4 mt-8">
            <Link
              onClick={() => setOpen(false)}
              href="/"
              className="text-lg font-semibold hover:text-gray-300 transition-colors"
            >
              {t("Home")}
            </Link>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="alghodowa">
                <AccordionTrigger className="text-lg font-semibold">
                  {t("AlGhodowa")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-4">
                    {alghodowaFilter.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        onClick={() => setOpen(false)}
                        className="text-sm hover:text-gray-300 transition-colors"
                      >
                        {t(item.title)}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="brands">
                <AccordionTrigger className="text-lg font-semibold">
                  {t("Our Brands")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 ">
                    {brandsFilter.map((brand) => (
                      <Link
                        key={brand.name}
                        href={`/our-brands/${brand.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex flex-col items-center justify-center gap-y-2 hover:bg-white/10 rounded-md p-2 transition-colors"
                      >
                        <Image
                          src={brand.logo?.url || "/placeholder.svg"}
                          alt="logo"
                          width={35}
                          height={35}
                          className="object-contain"
                        />
                        <div className="text-xs text-center">{brand.name}</div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="services">
                <AccordionTrigger className="text-lg font-semibold">
                  {t("Our Services")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 ">
                    {servicesFilter.map((service) => (
                      <Link
                        key={service.title}
                        onClick={() => setOpen(false)}
                        href={`/services/${service.slug}`}
                        className="flex items-center gap-x-3 hover:bg-white/10 rounded-md p-2 transition-colors"
                      >
                        <Image
                          width={25}
                          height={25}
                          alt={service.title}
                          className="bg-black rounded-lg"
                          src={(service?.icon as any)?.url}
                        />
                        <div className="text-sm">{service.title}</div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              onClick={() => setOpen(false)}
              href="/news"
              className="text-lg font-semibold hover:text-gray-300 transition-colors"
            >
              {t("News")}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/contact-us"
              className="text-lg font-semibold hover:text-gray-300 transition-colors"
            >
              {t("Contact us")}
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
