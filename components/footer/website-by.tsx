import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import WebsiteByIcon from "../icons/website-by-icon";

export function WebsiteBy() {
  const { t } = useTranslation("common");
  return (
    <div className="md:col-span-2 pe-0 lg:pe-[10%] xl:pe-[19.3%] 2xl:pe-[24.3%] items-end flex  w-full justify-start lg:justify-end">
      <Link
        target="_blank"
        href={"http://www.mohamadnamir.com/"}
        className="flex-row items-end lg:justify-end gap-x-6 flex  gap-y-4 md:gap-y-0"
      >
        <h1 aria-label="website-by" className="text-sm">
          {t("Website by")}
        </h1>

        <WebsiteByIcon width={80} />
      </Link>
    </div>
  );
}
