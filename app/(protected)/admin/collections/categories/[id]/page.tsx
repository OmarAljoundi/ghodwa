import { isCreationPage } from "@/lib/utils";
import { CreateCategory } from "../component/create";
import { Suspense } from "react";
import { FormLoading } from "@/components/form-loading";
import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { getAll } from "@/lib/generic.server";
import { UpdateCategory } from "../component/update";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramsId } = await params;
  const { isCreation, id } = isCreationPage(paramsId);
  const currentBreadcrumb = isCreation
    ? { item: "New Category" }
    : { item: `Edit Category ${id}` };

  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "All Categories", url: "/admin/collections/categories" },
        { ...currentBreadcrumb, currentPage: true },
      ]}
    >
      <Suspense fallback={<FormLoading />}>
        {isCreation ? (
          <CreateCategory
            dataPromise={getAll("brand", { orderBy: { id: "desc" } })}
          />
        ) : (
          <UpdateCategory
            dataPromiseBrand={getAll("brand", { orderBy: { id: "desc" } })}
            dataPromise={getAll("category", { where: { id: Number(id) } })}
          />
        )}
      </Suspense>
    </ContentWrapper>
  );
}
