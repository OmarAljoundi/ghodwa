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

    const mappedAlGhodwaMenu =
      AlGhodwaMenu?.filter((x) => {
        if (x.en_title == "Overview") {
          if (!settings.overview.showPage) return false;

          if (type === "menu") return settings.overview.showOnMenu;

          if (type === "footer") return settings.overview.showOnFooter;
          return true;
        }

        if (x.en_title == "Mission & Vision") {
          if (!settings.missionVision.showPage) return false;

          if (type === "menu") return settings.missionVision.showOnMenu;

          if (type === "footer") return settings.missionVision.showOnFooter;
          return true;
        }

        if (x.en_title == "Management and Team") {
          if (!settings.managementTeam.showPage) return false;

          if (type === "menu") return settings.managementTeam.showOnMenu;

          if (type === "footer") return settings.managementTeam.showOnFooter;
          return true;
        }

        if (x.en_title == "Management Systems") {
          if (!settings.managementSystems.showPage) return false;

          if (type === "menu") return settings.managementSystems.showOnMenu;

          if (type === "footer") return settings.managementSystems.showOnFooter;
          return true;
        }
      }) ?? [];

    return [...mappedAlGhodwaMenu, ...mappedExtraPages];
  }, [
    settings.extraAboutPages,
    settings.managementSystems.showOnFooter,
    settings.managementSystems.showOnMenu,
    settings.managementSystems.showPage,
    settings.managementTeam.showOnFooter,
    settings.managementTeam.showOnMenu,
    settings.managementTeam.showPage,
    settings.missionVision.showOnFooter,
    settings.missionVision.showOnMenu,
    settings.missionVision.showPage,
    settings.overview.showOnFooter,
    settings.overview.showOnMenu,
    settings.overview.showPage,
    type,
  ]);

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
