import { BlurFade } from "@/components/ui/blur-fade";
import { InnerPageClient } from "@/store/inner-page-client";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React from "react";
import { TeamMember } from "../components/team-member";
import { getSettings } from "@/query";
import { Metadata } from "next";
import { generatePageBilingualSeo } from "../../../generate-bilingual-seo";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "ar" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { seoStaticPagesManagementTeam } = await getSettings();

  const dictionary = generatePageBilingualSeo(
    seoStaticPagesManagementTeam?.seo ?? {},
    "/alghodwa/management-and-team"
  )[locale];

  return dictionary;
}

export default async function Page() {
  const { managementTeam } = await getSettings();
  if (!managementTeam.showPage) return notFound();

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
