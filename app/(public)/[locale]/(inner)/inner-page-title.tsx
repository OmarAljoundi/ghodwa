"use client";
import { useInnerStore } from "@/store/inner-page";
import React from "react";

export default function InnerPageTitle() {
  const { currentPage } = useInnerStore();
  return (
    <div className="h-full flex justify-center items-center pt-20">
      <h1 className="text-white font-light text-2xl xl:text-7xl ">
        {currentPage}
      </h1>
    </div>
  );
}
