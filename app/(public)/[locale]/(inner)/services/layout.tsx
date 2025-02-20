import React, { ReactNode } from "react";
import { ServicesPagesSitemap } from "./components/services-pages-sitemap";
import { getServices } from "@/query";

export default async function Layout({ children }: { children: ReactNode }) {
  const services = await getServices();
  return (
    <div className="grid grid-cols-[12fr] lg:grid-cols-[3fr,9fr] gap-8">
      <ServicesPagesSitemap services={services} className="hidden lg:block" />
      {children}
    </div>
  );
}
