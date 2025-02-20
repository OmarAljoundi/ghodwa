"use server";

import { db } from "@/db.server";
import { Setting } from "@prisma/client";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function getSettingBySectionAsync(
  section: "CMS"
): Promise<Setting["value"] | undefined> {
  const record = await db.setting.findFirst({
    where: {
      section,
    },
  });
  return record?.value as Setting["value"];
}

export async function addUpdateSettingAsync(
  section: "CMS" | "Gallery",
  value: Setting["value"],
  mode: "add" | "update"
): Promise<{ section: string | null; success: boolean }> {
  unstable_noStore();
  try {
    if (mode == "update") {
      await db.setting.update({
        where: {
          section,
        },
        data: {
          value: value as any,
        },
      });

      revalidatePath("/", "layout");

      return { section, success: true };
    }

    await db.setting.create({
      data: {
        value: value as any,
        section,
      },
    });
    revalidatePath("/", "layout");

    return { section, success: true };
  } catch (ex) {
    console.log("Error", ex);
    return { section: null, success: false };
  }
}
