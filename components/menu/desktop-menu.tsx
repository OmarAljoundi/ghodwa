import React from "react";

import ActionMenu from "./action-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandWithRelationsSchema } from "@/schema";
import { Service } from "@prisma/client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { AlGhodwaMenu } from "./nav-items";

export default function DesktopMenu({
  brands,
  services,
}: {
  brands: BrandWithRelationsSchema[];
  services: Service[];
}) {
  const brandsFilter = useFilteredLanguageData(brands);
  const servicesFilter = useFilteredLanguageData(services);
  const alghodowaFilter = useFilteredLanguageData(AlGhodwaMenu);

  const { t } = useTranslation("common");
  return (
    <nav
      className={`px-8 py-4 hidden flex-grow lg:flex  bg-black/50 backdrop-blur-md bg-opacity-70  transition-all duration-300 rounded-lg `}
    >
      <NavigationMenu key={"main"}>
        <NavigationMenuList>
          <NavigationMenuItem key={"home"}>
            <Link href="/">
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-white",
                  "font-light"
                )}
              >
                {t("Home")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem key={"about"}>
            <NavigationMenuTrigger
              className={cn("bg-transparent text-white", "font-light")}
            >
              {t("AlGhodowa")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[250px] p-1">
                {alghodowaFilter.map((item) => (
                  <li key={`${item.title}-${item.url}`}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        {t(item.title)}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem key={"brands"}>
            <NavigationMenuTrigger
              className={cn("bg-transparent text-white", "font-light")}
            >
              {t("Our Brands")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] p-4">
                <h3 className="text-lg font-medium">{t("Our Brands")}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t("Discover our diverse portfolio of innovative brands.")}
                </p>
                <div className="grid grid-cols-3 gap-4 ">
                  {brandsFilter.map((brand) => (
                    <Link
                      key={`${brand.name}-${brand.id}`}
                      href={`/our-brands/${brand.slug}`}
                      className="flex flex-col items-center border justify-center gap-y-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <Image
                        src={brand.logo?.url}
                        alt="logo"
                        width={35}
                        height={35}
                        className="object-contain flex items-center justify-center"
                      />
                      <div className="text-sm font-medium leading-none">
                        {brand.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem key={"services"}>
            <NavigationMenuTrigger
              className={cn("bg-transparent text-white", "font-light")}
            >
              {t("Our Services")}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] p-4">
                <h3 className=" text-lg font-medium">{t("Our Services")}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t("Explore our range of professional services.")}
                </p>
                <div className="space-y-4">
                  {servicesFilter.map((service) => (
                    <Link
                      key={`${service.title}-${service.id}`}
                      href={`/services/${service.slug}`}
                      className="flex items-center rtl:space-x-reverse space-x-3 rounded-md p-1.5 hover:text-accent transition-all duration-300  bg-black text-white "
                    >
                      <Image
                        width={35}
                        height={35}
                        alt={service.title}
                        src={(service?.icon as any)?.url}
                      />
                      <div>
                        <div className="text-sm font-medium leading-none">
                          {service.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem key={"news"}>
            <Link href="/news">
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-white",
                  "font-light"
                )}
              >
                {t("News")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem key={"contact"}>
            <Link href="/contact-us">
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-white",
                  "font-light"
                )}
              >
                {t("Contact us")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ActionMenu key={"actions"} />
    </nav>
  );
}
