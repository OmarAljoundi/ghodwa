"use client";
import React from "react";
import LogoContact from "./logo-contact";
import { SecondFooterLayer } from "./second-footer-layer";
import { Bottom } from "./bottom";
import { SettingSchema } from "@/schema/setting-schema";
import { FirstFooterLayer } from "./first-footer-layer";

export function Footer({ settings }: { settings: SettingSchema }) {
  const { footer } = settings;
  return (
    <footer className="bg-black text-white py-12 mt-8 rounded-3xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  justify-items-start px-4 xl:px-0">
          <LogoContact footer={footer} />
          <FirstFooterLayer items={settings.footer.items} />
          <SecondFooterLayer items={settings.footer.items} />
          <Bottom />
        </div>
      </div>
    </footer>
  );
}
