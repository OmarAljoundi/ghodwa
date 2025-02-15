import { isCreationPage } from "@/lib/utils";
import { Suspense } from "react";
import { FormLoading } from "@/components/form-loading";
import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { getAll } from "@/lib/generic.server";
import { CreateNews } from "../components/create";
import { UpdateNews } from "../components/update";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramsId } = await params;
  const { isCreation, id } = isCreationPage(paramsId);
  const currentBreadcrumb = isCreation
    ? { item: "New News" }
    : { item: `Edit News ${id}` };

  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "All News", url: "/admin/media-center/news" },
        { ...currentBreadcrumb, currentPage: true },
      ]}
    >
      <Suspense fallback={<FormLoading />}>
        {isCreation ? (
          <CreateNews />
        ) : (
          <UpdateNews
            dataPromise={getAll("news", {
              where: {
                id: Number(id),
              },
            })}
          />
        )}
      </Suspense>
    </ContentWrapper>
  );
}
