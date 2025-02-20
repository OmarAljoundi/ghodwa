"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export function Bottom() {
  const { t } = useTranslation("common");
  return (
    <div className="md:col-span-2 md:flex-row items-start  justify-start gap-x-6 xl:gap-x-12 flex flex-col-reverse gap-y-4 md:gap-y-0">
      <div className="mt-8  md:flex-row justify-start gap-6 items-center">
        <div>
          <p className="text-sm text-gray-400">
            © {t("Copyright 2016 Alghodwa Group")}
          </p>
        </div>
      </div>

      <div className="mt-4 flex-1">
        <span className="text-primary">{t("Follow us:")}</span>
        <div className="flex gap-x-2 mt-2">
          <a
            href="#"
            className="p-2 hover:bg-orange-500 border rounded-lg transition-all duration-300"
            aria-label="YouTube"
          >
            <FaYoutube className="size-6 text-white" />
          </a>
          <a
            href="#"
            className="p-2 hover:bg-orange-500 border rounded-lg transition-all duration-300"
            aria-label="Facebook"
          >
            <FaFacebook className="size-6 text-white" />
          </a>
          <a
            href="#"
            className="p-2 hover:bg-orange-500 border rounded-lg transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="size-6 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
