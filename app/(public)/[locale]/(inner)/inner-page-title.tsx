"use client";
import { useInnerStore } from "@/store/inner-page";
import React from "react";
import InnerPageBreadcrumb from "./inner-page-breadcrumb";
import { useTranslation } from "react-i18next";

export default function InnerPageTitle() {
  const { currentPage } = useInnerStore();
  const { t } = useTranslation("common");
  return (
    <div className="h-full flex justify-center items-center pt-16 lg:pt-24">
      <div className="flex flex-col gap-y-4 items-center h-full justify-items-center justify-evenly">
        <h1 className="text-white font-light text-4xl lg:text-7xl ">
          {t(currentPage)}
        </h1>
        <InnerPageBreadcrumb />
      </div>
    </div>
  );
}
