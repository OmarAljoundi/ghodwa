"use client";
import { Globe, MapPin, Phone } from "lucide-react";
import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { useTranslation } from "react-i18next";
import { BrandBadge } from "../brand-badge";
import { SettingSchema } from "@/schema/setting-schema";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";

export function Offices({ offices }: { offices: SettingSchema["offices"] }) {
  const { t } = useTranslation("common");
  const filtredOffices = useFilteredLanguageData(offices.items);
  return (
    <section className="flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row sm:gap-x-16 xl:grid xl:grid-cols-[4fr,8fr] xl:gap-x-8">
      <div className="flex-auto w-fit ltr:sm:ml-auto rtl:sm:mr-auto">
        <BrandBadge title={t("Our Offices")} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 xl:gap-x-16">
        {filtredOffices.map((office, index) => (
          <OfficeInfo key={office.city} office={office} index={index} />
        ))}
      </div>
    </section>
  );
}

const OfficeInfo = ({
  office,
  index,
}: {
  office: {
    country: string;
    city: string;
    address: string;
    contactNumber: string;
  };
  index: number;
}) => (
  <BlurFade
    inView
    direction="right"
    className="first:border-none  border-t border-border lg:border-none py-4 first:pt-0 lg:py-0"
    delay={0.5 * index}
    key={index}
  >
    <div className="flex items-center mb-2">
      <Globe className="w-5 h-5 text-primary mr-2 rtl:ml-2" />
      <h3 className="text-xl lg:text-lg xl:text-xl font-semibold text-gray-800">
        {office.country}, <span className="text-primary">{office.city}</span>
      </h3>
    </div>
    <div className="flex items-start mb-2">
      <MapPin className="w-5 h-5 text-gray-500 mr-2 rtl:ml-2 mt-1 flex-shrink-0" />
      <p className="text-gray-600">{office.address}</p>
    </div>
    <div className="flex items-center">
      <Phone className="w-5 h-5 text-gray-500 mr-2 rtl:ml-2 flex-shrink-0" />
      <p className="text-gray-600" dir="ltr">
        {office.contactNumber}
      </p>
    </div>
  </BlurFade>
);
