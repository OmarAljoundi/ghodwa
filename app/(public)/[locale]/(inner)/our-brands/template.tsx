import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React, { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <RegisterBreadcrumbClient
        breadcrumb={{ href: "/our-brands", label: "Our Brands" }}
      />
      {children}
    </>
  );
}
