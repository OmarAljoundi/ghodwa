import React, { Suspense } from "react";
import { BaseSettingForm } from "./components/base-setting-form";
import { getSettingBySectionAsync } from "@/lib/settings.server";
import { TabsContent } from "@/components/ui/tabs";
import { seoMenuItems } from "./components/lib";
import { SeoForm } from "@/components/seo-form";

export default function Page() {
  return (
    <Suspense>
      {Object.entries(seoMenuItems).map(([key, o]) => (
        <TabsContent value={key} key={key}>
          <BaseSettingForm
            dataPromise={getSettingBySectionAsync("CMS")}
            schemaKey={o.schemaKey}
          >
            <SeoForm
              lang="en_"
              title={o.title}
              description={o.description}
              prefiex={o.schemaKey}
            />
          </BaseSettingForm>
        </TabsContent>
      ))}
    </Suspense>
  );
}
