import React, { Suspense } from "react";
import HomeSettingsForm from "./components/home-settings-form";
import { BaseSettingForm } from "./components/base-setting-form";
import { getSettingBySectionAsync } from "@/lib/settings.server";
import { TabsContent } from "@/components/ui/tabs";
import { MenuSettingForm } from "./components/menu-setting-form";
import { FooterSettingForm } from "./components/footer-setting-form";

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

      <TabsContent value={"Menu"}>
        <BaseSettingForm
          dataPromise={getSettingBySectionAsync("CMS")}
          schemaKey="menus"
        >
          <MenuSettingForm />
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
