import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import React, { Suspense } from "react";
import { BrandTable } from "./component/table";
import { getAll } from "@/lib/generic.server";

export default function Page() {
  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "Brands", currentPage: true },
      ]}
    >
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        }
      >
        <BrandTable
          dataPromise={getAll("brand", { orderBy: { id: "desc" } })}
        />
      </Suspense>
    </ContentWrapper>
  );
}
