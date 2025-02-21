import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export function ContactSales({ className }: { className: string }) {
  const { t } = useTranslation("common");
  return (
    <BlurFade delay={0.5} className={cn(className)}>
      <h3 className="font-light text-black text-lg">{t("Contact Sales")}</h3>
      <div className="flex justify-start gap-x-6">
        <div className="flex flex-col gap-1 items-center justify-center">
          <Mail className="size-6 text-primary" />
          <span className="text-[9px]">Email</span>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <FiPhone className="size-6" />
          <span className="text-[9px]">Call</span>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <FaWhatsapp className="size-6 text-green-700" />
          <span className="text-[9px] ">Whatsapp</span>
        </div>
      </div>
    </BlurFade>
  );
}
