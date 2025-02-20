import React, { Suspense } from "react";
import HomeSettingsForm from "./components/home-settings-form";
import { BaseSettingForm } from "./components/base-setting-form";
import { getSettingBySectionAsync } from "@/lib/settings.server";
import { TabsContent } from "@/components/ui/tabs";
import { FooterSettingForm } from "./components/footer-setting-form";
import { OverviewSettingForm } from "./components/overview-setting-form";
import { MissionVisionSettingForm } from "./components/mission-vision-setting-form";
import { ManagementSystemSettingForm } from "./components/management-systems-setting-form";
import { ManagementTeamSettingForm } from "./components/management-team-setting-form";
import { WorkingHoursSettingForm } from "./components/working-hours-setting-form";
import { OfficesSettingForm } from "./components/offices-setting-form";

export default function Page() {
  return (
    <Suspense>
      <TabsContent value={"Home"}>
        <BaseSettingForm
          dataPromise={getSettingBySectionAsync("CMS")}
          schemaKey="home"
        >
          <HomeSettingsForm />
        </BaseSettingForm>
      </TabsContent>

      <TabsContent value={"Overview"}>
        <BaseSettingForm
          dataPromise={getSettingBySectionAsync("CMS")}
          schemaKey="overview"
        >
          <OverviewSettingForm />
        </BaseSettingForm>
      </TabsContent>

      <TabsContent value={"MissionVision"}>
        <BaseSettingForm
          dataPromise={getSettingBySectionAsync("CMS")}
          schemaKey="missionVision"
        >
          <MissionVisionSettingForm />
        </BaseSettingForm>
      </TabsContent>

      <TabsContent value={"ManagementSystems"}>
        <BaseSettingForm
          dataPromise={getSettingBySectionAsync("CMS")}
          schemaKey="managementSystems"
        >
          <ManagementSystemSettingForm />
        </BaseSettingForm>
      </TabsContent>

      <TabsContent value={"WorkingHours"}>
        <BaseSettingForm
          dataPromise={getSettingBySectionAsync("CMS")}
          schemaKey="workingHours"
        >
          <WorkingHoursSettingForm />
        </BaseSettingForm>
      </TabsContent>

      <TabsContent value={"Offices"}>
        <BaseSettingForm
          dataPromise={getSettingBySectionAsync("CMS")}
          schemaKey="offices"
        >
          <OfficesSettingForm />
        </BaseSettingForm>
      </TabsContent>

      <TabsContent value={"ManagementTeam"}>
        <BaseSettingForm
          dataPromise={getSettingBySectionAsync("CMS")}
          schemaKey="managementTeam"
        >
          <ManagementTeamSettingForm />
        </BaseSettingForm>
      </TabsContent>

      <TabsContent value={"Footer"}>
        <BaseSettingForm
          dataPromise={getSettingBySectionAsync("CMS")}
          schemaKey="footer"
        >
          <FooterSettingForm />
        </BaseSettingForm>
      </TabsContent>
    </Suspense>
  );
}
