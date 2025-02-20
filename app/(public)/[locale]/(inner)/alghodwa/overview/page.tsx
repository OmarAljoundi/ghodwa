import { InnerPageClient } from "@/store/inner-page-client";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React from "react";
import { ContentDetails } from "../components/content-details-page";
import { getSettings } from "@/query";
import { BlurFade } from "@/components/ui/blur-fade";

export default async function Page() {
  const { overview } = await getSettings();
  return (
    <BlurFade inView>
      <InnerPageClient currentPage={"Overview"} />
      <RegisterBreadcrumbClient
        breadcrumb={{ href: "/overview", label: "Overview" }}
      />
      <ContentDetails
        ar_content={overview.ar_content}
        en_content={overview.en_content}
        title="Overview"
      />
    </BlurFade>
  );
}
