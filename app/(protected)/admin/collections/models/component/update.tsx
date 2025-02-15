"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getAll, updateOne } from "@/lib/generic.server";
import {
  BrandWithRelationsSchema,
  ModelSchema,
  updateModelSchema,
  UpdateModelSchema,
} from "@/schema";
import { ModelForm } from "./form";
import { LangTabs } from "@/components/lang-tabs";

export function UpdateModel({
  dataPromise,
  dataPromiseBrands,
}: {
  dataPromise: ReturnType<typeof getAll<ModelSchema>>;
  dataPromiseBrands: ReturnType<typeof getAll<BrandWithRelationsSchema>>;
}) {
  const { data } = React.use(dataPromise);
  const { data: brands } = React.use(dataPromiseBrands);

  const form = useForm<UpdateModelSchema>({
    resolver: zodResolver(updateModelSchema),
    defaultValues: data?.[0],
  });

  const route = useRouter();

  async function onSubmit(body: UpdateModelSchema) {
    const response = await updateOne<ModelSchema>("model", data![0]!.id, body);

    if (response.success) {
      toast.success("Model update successfully");
      route.replace(`/admin/collections/models`);
      return;
    }

    toast.error("Model couldnt be updated");
  }

  // if (!Model)
  //   return <NoResultFound onAddNew={() => route.push("/admin/Models/new")} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mx-auto flex flex-col gap-x-8 gap-y-4">
          <div className=" space-y-4 ">
            <LangTabs>
              <ModelForm lang="en_" brands={brands ?? []} />
              <ModelForm lang="ar_" brands={brands ?? []} />
            </LangTabs>
          </div>
          <div className=" space-y-4 "></div>
        </div>
      </form>
    </Form>
  );
}
