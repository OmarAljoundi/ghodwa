import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export function DownloadBrochure({ className }: { className: string }) {
  const { t } = useTranslation("common");
  return (
    <BlurFade delay={0.3} className={className}>
      <div className="rounded-xl bg-primary py-4 px-6 w-full flex justify-between items-center">
        <h1 className="font-light text-black text-lg">
          {t("Download Brochure")}
        </h1>
        <IoArrowDownCircleOutline className="text-white size-12" />
      </div>
    </BlurFade>
  );
}
