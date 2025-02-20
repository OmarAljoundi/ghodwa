import { BlurFade } from "@/components/ui/blur-fade";
import { InnerPageClient } from "@/store/inner-page-client";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React from "react";
import { TeamMember } from "../components/team-member";
import { getSettings } from "@/query";

export default async function Page() {
  const { managementTeam } = await getSettings();
  return (
    <BlurFade inView>
      <InnerPageClient currentPage={"Management & Team"} />
      <RegisterBreadcrumbClient
        breadcrumb={{
          href: "/management-and-team",
          label: "Management & Team",
        }}
      />
      <TeamMember teamMember={managementTeam} />
    </BlurFade>
  );
}
