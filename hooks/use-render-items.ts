import { AlGhodwaMenu } from "@/components/menu/nav-items";
import { BrandWithRelationsSchema } from "@/schema";
import { SettingSchema } from "@/schema/setting-schema";
import { Service } from "@prisma/client";
import { useMemo } from "react";

export function useExtraPages(
  settings: SettingSchema,
  type?: "menu" | "footer"
) {
  const allAboutPages = useMemo(() => {
    const mappedExtraPages =
      settings.extraAboutPages
        ?.filter((x) => {
          if (!x.showPage) return false;

          if (type === "menu") return x.showOnMenu;

          if (type === "footer") return x.showOnFooter;

          return true;
        })
        .map(({ ar_title, en_title, slug }) => {
          return {
            ar_title,
            en_title,
            en_url: `/alghodwa/${slug}`,
            ar_url: `/ar/alghodwa/${slug}`,
          };
        }) ?? [];

    return [...AlGhodwaMenu, ...mappedExtraPages];
  }, [settings.extraAboutPages, type]);

  return allAboutPages;
}

export function useServicesPages(
  services: Service[],
  type?: "menu" | "footer"
) {
  const allAboutPages = useMemo(() => {
    const mappedExtraPages = services.filter((x) => {
      if (!x.is_published) return false;

      if (type === "menu") return x.showOnMenu;

      if (type === "footer") return x.showOnFooter;
      return true;
    });

    return mappedExtraPages;
  }, [services, type]);

  return allAboutPages;
}

export function useBrandsPages(
  services: BrandWithRelationsSchema[],
  type?: "menu" | "footer"
) {
  const allAboutPages = useMemo(() => {
    const mappedExtraPages = services.filter((x) => {
      if (type === "menu") return x.showOnMenu;

      if (type === "footer") return x.showOnFooter;
      return true;
    });

    return mappedExtraPages;
  }, [services, type]);

  return allAboutPages;
}
