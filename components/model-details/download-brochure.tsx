import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { IoArrowDownCircleOutline } from "react-icons/io5";

export function DownloadBrochure({ className }: { className: string }) {
  return (
    <BlurFade delay={0.3} className={className}>
      <div className="rounded-xl bg-primary py-4 px-6 w-full flex justify-between items-center">
        <div className="font-light text-black text-lg">Download Brochure</div>
        <IoArrowDownCircleOutline className="text-white size-12" />
      </div>
    </BlurFade>
  );
}
