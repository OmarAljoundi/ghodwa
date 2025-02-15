import React, { ReactNode } from "react";
import InnerPageTitle from "./inner-page-title";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="inner-gradient-background h-40 lg:h-72  lg:rounded-3xl">
        <InnerPageTitle />
      </div>
      <main className="container mx-auto">{children}</main>
    </>
  );
}
