"use client";
import React from "react";
import { Breadcrumb, useAddBreadcrumb } from "./bread-crumb-store";

export default function RegisterBreadcrumbClient({
  breadcrumb,
}: {
  breadcrumb: Breadcrumb;
}) {
  useAddBreadcrumb(breadcrumb);
  return <></>;
}
