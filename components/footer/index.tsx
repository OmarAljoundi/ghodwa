"use client";
import React from "react";
import LogoContact from "./logo-contact";
import { SecondFooterLayer } from "./second-footer-layer";
import { Bottom } from "./bottom";
import { SettingSchema } from "@/schema/setting-schema";
import { FirstFooterLayer } from "./first-footer-layer";
import { BrandWithRelationsSchema } from "@/schema";
import { Service } from "@prisma/client";

export function Footer({
  settings,
  brands,
  services,
}: {
  settings: SettingSchema;
  brands: BrandWithRelationsSchema[];
  services: Service[];
}) {
  const { footer, socialMediaContact } = settings;
  return (
    <footer className="bg-black text-white py-12 mt-8  lg:rounded-b-3xl rounded-t-3xl ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  justify-items-start px-4 xl:px-0">
          <LogoContact footer={footer} />
          <FirstFooterLayer brands={brands} />
          <SecondFooterLayer services={services} />
          <Bottom socialMediaContact={socialMediaContact} />
        </div>
      </div>
    </footer>
  );
}
