"use client";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";
import { getModelBySlug, getSettings } from "@/query";
import { useAddInnerPage } from "@/store/inner-page";
import React, { use } from "react";
import { ModelLogo } from "./model-logo";
import { DownloadBrochure } from "./download-brochure";
import { OtherModelsList } from "./other-models-list";
import { ContactSales } from "./contact-sales";
import { ImageModelSlider } from "./image-model-slider";
import { Model } from "@prisma/client";
import { ModelSpecifications } from "./model-specifications";

export function ModelDetails({
  dataPromise,
  dataPromiseSetting,
}: {
  dataPromise: ReturnType<typeof getModelBySlug>;
  dataPromiseSetting: ReturnType<typeof getSettings>;
}) {
  const { currentModel } = use(dataPromise);
  const { name } = useFilteredLanguageData(currentModel);

  useAddInnerPage(name);

  return (
    <React.Fragment>
      <div className="hidden lg:grid grid-cols-[12fr] lg:grid-cols-[4fr,8fr] gap-8 ">
        <LeftDetails
          dataPromise={dataPromise}
          dataPromiseSetting={dataPromiseSetting}
        />
        <RightDetails dataPromise={dataPromise} />
      </div>
      <MobileDetails
        dataPromise={dataPromise}
        dataPromiseSetting={dataPromiseSetting}
      />
    </React.Fragment>
  );
}

function LeftDetails({
  dataPromise,
  dataPromiseSetting,
}: {
  dataPromise: ReturnType<typeof getModelBySlug>;
  dataPromiseSetting: ReturnType<typeof getSettings>;
}) {
  const { currentModel, models } = use(dataPromise);
  const { socialMediaContact } = use(dataPromiseSetting);

  const { id, category } = useFilteredLanguageData(currentModel);
  const currentCategory = useFilteredLanguageData(category);

  const currentLogo = useFilteredLanguageData(currentCategory.brand!);
  return (
    <div className="flex flex-col items-center space-y-8 xl:px-6">
      <ModelLogo
        className="py-16"
        logo={(currentLogo?.logo as any)?.url}
        name={currentLogo?.name}
        width={250}
        height={250}
      />
      <OtherModelsList
        className=" w-full"
        id={id}
        models={models}
        name={currentCategory.name}
      />

      <DownloadBrochure
        className="w-full"
        brochure={currentModel?.brochure as any}
      />
      <ContactSales
        socialMediaContact={socialMediaContact}
        className="rounded-xl  w-full flex flex-wrap gap-x-4 gap-y-4 justify-between"
      />
    </div>
  );
}

function RightDetails({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getModelBySlug>;
}) {
  const { currentModel } = use(dataPromise);

  return (
    <div className="flex flex-col items-center space-y-8 ">
      <ImageModelSlider
        className="w-full"
        currentModel={currentModel as Model}
      />

      <ModelSpecifications currentModel={currentModel as Model} />
    </div>
  );
}

function MobileDetails({
  dataPromise,
  dataPromiseSetting,
}: {
  dataPromise: ReturnType<typeof getModelBySlug>;
  dataPromiseSetting: ReturnType<typeof getSettings>;
}) {
  const { currentModel, models } = use(dataPromise);
  const { socialMediaContact } = use(dataPromiseSetting);
  const { id, category } = useFilteredLanguageData(currentModel);
  const currentCategory = useFilteredLanguageData(category);
  const currentLogo = useFilteredLanguageData(currentCategory.brand!);

  return (
    <div className="lg:hidden flex flex-col items-center space-y-8">
      <ModelLogo
        width={200}
        height={200}
        logo={(currentLogo?.logo as any)?.url}
        name={currentLogo?.name}
        className="py-6"
      />
      <ImageModelSlider
        className="w-full"
        currentModel={currentModel as Model}
      />

      <ModelSpecifications currentModel={currentModel as Model} />

      <DownloadBrochure className="w-full" />

      <ContactSales
        socialMediaContact={socialMediaContact}
        className="rounded-xl w-full flex flex-wrap gap-x-4 gap-y-4 justify-between"
      />

      <OtherModelsList
        className="lg:px-6 w-full"
        id={id}
        models={models}
        name={currentCategory.name}
      />
    </div>
  );
}
