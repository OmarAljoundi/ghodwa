import React, { ReactNode } from "react";
import { AlghodwaPagesSitemap } from "./components/alghodwa-pages-sitemap";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[12fr] lg:grid-cols-[3fr,9fr] gap-8">
      <AlghodwaPagesSitemap className="hidden lg:block" />
      {children}
    </div>
  );
}
