import { InnerPageClient } from "@/store/inner-page-client";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React from "react";
import { ContentDetails } from "../components/content-details-page";
import { getSettings } from "@/query";
import { BlurFade } from "@/components/ui/blur-fade";

export default async function Page() {
  const { managementSystems } = await getSettings();

  return (
    <BlurFade inView>
      <InnerPageClient currentPage={"Management Systems"} />
      <RegisterBreadcrumbClient
        breadcrumb={{
          href: "/management-systems",
          label: "Management Systems",
        }}
      />
      <ContentDetails
        ar_content={managementSystems.ar_content}
        en_content={managementSystems.en_content}
        title="Management Systems"
      />
    </BlurFade>
  );
}
