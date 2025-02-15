import { isCreationPage } from "@/lib/utils";
import { CreateBrand } from "../component/create";
import { Suspense } from "react";
import { FormLoading } from "@/components/form-loading";
import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { getAll } from "@/lib/generic.server";
import { UpdateBrand } from "../component/update";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramsId } = await params;
  const { isCreation, id } = isCreationPage(paramsId);
  const currentBreadcrumb = isCreation
    ? { item: "New Brand" }
    : { item: `Edit Brand ${id}` };

  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "All Brands", url: "/admin/collections/brands" },
        { ...currentBreadcrumb, currentPage: true },
      ]}
    >
      <Suspense fallback={<FormLoading />}>
        {isCreation ? (
          <CreateBrand
            datePromiseCategory={getAll("category", {
              orderBy: { id: "desc" },
            })}
          />
        ) : (
          <UpdateBrand
            dataPromise={getAll("brand", {
              where: {
                id: Number(id),
              },
              include: {
                categories: true,
              },
            })}
            datePromiseCategory={getAll("category", {
              orderBy: { id: "desc" },
            })}
          />
        )}
      </Suspense>
    </ContentWrapper>
  );
}
