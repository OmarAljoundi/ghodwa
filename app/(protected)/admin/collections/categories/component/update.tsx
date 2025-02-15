"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getAll, updateOne } from "@/lib/generic.server";
import {
  BrandSchema,
  CategorySchema,
  updateCategorySchema,
  UpdateCategorySchema,
} from "@/schema";
import { CategoryForm } from "./form";
import { LangTabs } from "@/components/lang-tabs";

export function UpdateCategory({
  dataPromise,
  dataPromiseBrand,
}: {
  dataPromise: ReturnType<typeof getAll<CategorySchema>>;
  dataPromiseBrand: ReturnType<typeof getAll<BrandSchema>>;
}) {
  const { data } = React.use(dataPromise);
  const { data: brands } = React.use(dataPromiseBrand);

  const form = useForm<UpdateCategorySchema>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: data?.[0],
  });

  const route = useRouter();

  async function onSubmit(body: UpdateCategorySchema) {
    const response = await updateOne<CategorySchema>(
      "category",
      data![0]!.id,
      body
    );

    if (response.success) {
      toast.success("Category update successfully");
      route.replace(`/admin/collections/categories`);
      return;
    }

    toast.error("Category couldnt be updated");
  }

  // if (!Category)
  //   return <NoResultFound onAddNew={() => route.push("/admin/Categorys/new")} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mx-auto flex flex-col gap-x-8 gap-y-4">
          <div className=" space-y-4 ">
            <LangTabs>
              <CategoryForm lang="en_" brands={brands ?? []} />
              <CategoryForm lang="ar_" brands={brands ?? []} />
            </LangTabs>
          </div>
          <div className=" space-y-4 "></div>
        </div>
      </form>
    </Form>
  );
}
