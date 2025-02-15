import { BrandList } from "@/components/our-brands/brand-list";
import { getBrands } from "@/query";
import { InnerPageClient } from "@/store/inner-page-client";
import React from "react";

export default function Page() {
  return (
    <React.Fragment>
      <InnerPageClient currentPage={"Our Brands"} />
      <BrandList dataPromise={getBrands()} />
    </React.Fragment>
  );
}
