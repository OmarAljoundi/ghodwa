import { Button } from "@/components/ui/button";
import i18nConfig from "@/i18nConfig";
import { cn } from "@/lib/utils";
import { ArrowDown, Globe, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import { Separator } from "../ui/separator";
import React, { useState } from "react";

export default function ActionMenu() {
  return (
    <div
      className={`ml-auto flex flex-row-reverse items-center lg:flex-row gap-x-2 lg:gap-x-0 lg:space-x-4 rtl:mr-auto rtl:ml-0 rtl:space-x-reverse `}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn("bg-yellow-500  text-black")}
      >
        <Search className="size-5 " />
        <span className="sr-only">Search</span>
      </Button>

      <LangaugeMenu />

      {/* <CommandSearch open={open} setOpen={setOpen}> */}

      {/* </CommandSearch> */}
    </div>
  );
}

function LangaugeMenu() {
  const router = useRouter();
  const currentPathname = usePathname();
  const { t } = useTranslation("common");
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLocale = i18n.language;

  const handleChange = (newLocale: string) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <React.Fragment>
          <Button className={"text-black hidden lg:flex"}>
            <span className="inline-block">{t("Language")}</span>
            <ArrowDown
              className={cn(
                "-me-1 ms-2 opacity-60 transition-all duration-500",
                open ? "rotate-180" : ""
              )}
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
          <Button className={"text-black black lg:hidden"} size={"icon"}>
            <Globe size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </React.Fragment>
      </PopoverTrigger>
      <PopoverContent className="w-36 p-2">
        <div className="flex flex-col">
          <Button
            onClick={() => handleChange("ar")}
            variant={"ghost"}
            size={"sm"}
            className={cn(
              currentLocale == "ar" ? "bg-primary text-primary-foreground" : ""
            )}
          >
            <span>Arabic</span>
            <Image
              src="/jordan.png"
              className="-me-1 ms-2 "
              width={16}
              height={16}
              quality={100}
              alt="Jordan"
            />
          </Button>
          <Separator className="my-0.5" />
          <Button
            onClick={() => handleChange("en")}
            variant={"ghost"}
            size={"sm"}
            className={cn(
              currentLocale == "en" ? "bg-primary text-primary-foreground" : ""
            )}
          >
            <span>English</span>
            <Image
              src="/uk.png"
              className="-me-1 ms-2 "
              width={16}
              height={16}
              quality={100}
              alt="english"
            />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
