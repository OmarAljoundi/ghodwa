import ContactUsContainer from "@/components/contact-us/container";
import { getSettings } from "@/query";
import { InnerPageClient } from "@/store/inner-page-client";
import RegisterBreadcrumbClient from "@/store/register-breadcrumb-client";
import React from "react";

export default async function Page() {
  const { workingHours, offices } = await getSettings();
  return (
    <React.Fragment>
      <InnerPageClient currentPage={"Contact Us"} />
      <RegisterBreadcrumbClient
        breadcrumb={{ href: "/contact-us", label: "Contact Us" }}
      />
      <ContactUsContainer offices={offices} workingHours={workingHours} />
    </React.Fragment>
  );
}
