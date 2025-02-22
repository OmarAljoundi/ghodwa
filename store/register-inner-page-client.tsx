"use client";
import React from "react";
import { useAddInnerPage } from "./inner-page";

export default function RegisterInnerPageClient({ title }: { title: string }) {
  useAddInnerPage(title);
  return <></>;
}
