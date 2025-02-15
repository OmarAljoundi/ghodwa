"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

const aboutUsItems = [
  { name: "Overview", href: "/about-us#overview" },
  { name: "Our Team", href: "/about-us#team" },
  { name: "Career", href: "/about-us#career" },
  { name: "History", href: "/about-us#history" },
];

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

  return (
    <div className="flex lg:hidden gap-x-2">
      <ActionMenu />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="group "
            variant="outline"
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
          className="w-[300px] sm:w-[400px] bg-black/90 backdrop-blur-md text-white overflow-y-auto"
        >
          <nav className="flex flex-col space-y-4 mt-8">
            <Link
              href="/"
              className="text-lg font-semibold hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="alghodowa">
                <AccordionTrigger className="text-lg font-semibold">
                  AlGhodowa
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-4">
                    {aboutUsItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm hover:text-gray-300 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="brands">
                <AccordionTrigger className="text-lg font-semibold">
                  Our Brands
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 pl-4">
                    {brandsFilter.map((brand) => (
                      <Link
                        key={brand.name}
                        href={`/our-brands/${brand.slug}`}
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
                  Our Services
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-4">
                    {servicesFilter.map((service) => (
                      <Link
                        key={service.title}
                        href="/our-services"
                        className="flex items-center space-x-3 hover:bg-white/10 rounded-md p-2 transition-colors"
                      >
                        <Image
                          width={25}
                          height={25}
                          alt="service"
                          src={
                            (service?.icon as any)?.url || "/placeholder.svg"
                          }
                        />
                        <div className="text-sm">{service.title}</div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              href="/news"
              className="text-lg font-semibold hover:text-gray-300 transition-colors"
            >
              News
            </Link>
            <Link
              href="/contact-us"
              className="text-lg font-semibold hover:text-gray-300 transition-colors"
            >
              Contact us
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
