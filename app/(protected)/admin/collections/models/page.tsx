import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import React, { Suspense } from "react";
import { getAll } from "@/lib/generic.server";
import { ModelTable } from "./component/table";

export default function Page() {
  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "Models", currentPage: true },
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
        <ModelTable
          dataPromise={getAll("model", { orderBy: { id: "desc" } })}
        />
      </Suspense>
    </ContentWrapper>
  );
}
