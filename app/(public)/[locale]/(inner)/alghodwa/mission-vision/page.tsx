import { InnerPageClient } from "@/store/inner-page-client";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React from "react";
import { ContentDetails } from "../components/content-details-page";
import { getSettings } from "@/query";
import { BlurFade } from "@/components/ui/blur-fade";

export default async function Page() {
  const { missionVision } = await getSettings();
  return (
    <BlurFade inView>
      <InnerPageClient currentPage={"Mission & visions"} />
      <RegisterBreadcrumbClient
        breadcrumb={{ href: "/mission-vision", label: "Mission & visions" }}
      />
      <ContentDetails
        ar_content={missionVision.ar_content}
        en_content={missionVision.en_content}
        title="Mission & Vision"
      />
    </BlurFade>
  );
}
