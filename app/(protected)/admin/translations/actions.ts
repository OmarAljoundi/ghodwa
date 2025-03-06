"use server";

import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { mkdir } from "fs/promises";
import { revalidatePath } from "next/cache";

const TranslationSchema = z.record(z.string());

const langMapper = {
  "tab-en": "en",
  "tab-ar": "ar",
};

export async function getTranslations(language: "tab-en" | "tab-ar") {
  try {
    if (language !== "tab-en" && language !== "tab-ar") {
      throw new Error("Invalid language code");
    }

    const filePath = path.join(
      process.cwd(),
      "locales",
      langMapper[language],
      "common.json"
    );

    console.log(`Reading translation file: ${filePath}`);

    const fileContent = await fs.readFile(filePath, "utf-8");

    const cleanContent = fileContent.replace(/^\uFEFF/, "");

    let translations;
    try {
      translations = JSON.parse(cleanContent);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw new Error("Failed to parse translations file");
    }

    return translations;
  } catch (error) {
    console.error("Error loading translations:", error);
    throw new Error(`Failed to load translations: ${(error as any)?.message}`);
  }
}

async function createBackup(language: "tab-en" | "tab-ar") {
  const sourceFilePath = path.join(
    process.cwd(),
    "locales",
    langMapper[language],
    "common.json"
  );
  const backupDir = path.join(
    process.cwd(),
    "locales",
    langMapper[language],
    "backups"
  );

  try {
    await mkdir(backupDir, { recursive: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFilePath = path.join(backupDir, `common_${timestamp}.json`);

  const fileContent = await fs.readFile(sourceFilePath, "utf-8");

  const cleanContent = fileContent.replace(/^\uFEFF/, "");

  await fs.writeFile(backupFilePath, cleanContent, "utf-8");

  revalidatePath("/", "layout");

  return {
    timestamp,
    path: backupFilePath,
    filename: `common_${timestamp}.json`,
  };
}

export async function getBackups(language: "tab-en" | "tab-ar") {
  try {
    if (language !== "tab-en" && language !== "tab-ar") {
      throw new Error("Invalid language code");
    }

    const backupDir = path.join(
      process.cwd(),
      "locales",
      langMapper[language],
      "backups"
    );

    try {
      await fs.access(backupDir);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      await mkdir(backupDir, { recursive: true });
      return [];
    }

    // Read backup directory
    const files = await fs.readdir(backupDir);

    // Filter for JSON files that match our naming pattern
    const backupFiles = files
      .filter((file) => file.startsWith("common_") && file.endsWith(".json"))
      .sort((a, b) => b.localeCompare(a)); // Sort in descending order (newest first)

    // Map to backup info objects with simpler date formatting
    const backups = backupFiles.map((file) => {
      // Extract timestamp from filename
      const timestamp = file.replace("common_", "").replace(".json", "");

      // Create a simple display date without complex parsing
      const displayDate = `Backup: ${timestamp
        .split("T")[0]
        .replace(/-/g, "/")}`;

      return {
        filename: file,
        timestamp,
        displayDate,
        path: path.join(backupDir, file),
      };
    });

    return backups;
  } catch (error) {
    console.error("Error getting backups:", error);
    throw new Error(`Failed to retrieve backups: ${(error as any)?.message}`);
  }
}

export async function restoreFromBackup(
  language: "tab-en" | "tab-ar",
  backupFilename: string
) {
  try {
    if (language !== "tab-en" && language !== "tab-ar") {
      throw new Error("Invalid language code");
    }

    if (!backupFilename.match(/^common_.*\.json$/)) {
      throw new Error("Invalid backup filename");
    }

    const backupFilePath = path.join(
      process.cwd(),
      "locales",
      langMapper[language],
      "backups",
      backupFilename
    );
    const targetFilePath = path.join(
      process.cwd(),
      "locales",
      langMapper[language],
      "common.json"
    );

    const backupContent = await fs.readFile(backupFilePath, "utf-8");

    const cleanContent = backupContent.replace(/^\uFEFF/, "");
    let backupData;
    try {
      backupData = JSON.parse(cleanContent);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Backup file contains invalid JSON");
    }

    const validatedData = TranslationSchema.parse(backupData);

    await createBackup(language);

    await fs.writeFile(
      targetFilePath,
      JSON.stringify(validatedData, null, 2),
      "utf-8"
    );

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error restoring from backup:", error);
    throw new Error(
      `Failed to restore from backup: ${(error as any)?.message}`
    );
  }
}

export async function saveTranslations(
  language: "tab-en" | "tab-ar",
  translations: Record<string, string>
) {
  try {
    if (language !== "tab-en" && language !== "tab-ar") {
      throw new Error("Invalid language code");
    }

    await createBackup(language);

    const existingTranslations = await getTranslations(language);

    const mergedTranslations = {
      ...existingTranslations,
      ...translations,
    };

    Object.keys(mergedTranslations).forEach((key) => {
      if (typeof mergedTranslations[key] !== "string") {
        mergedTranslations[key] = String(mergedTranslations[key]);
      }
    });

    const filePath = path.join(
      process.cwd(),
      "locales",
      langMapper[language],
      "common.json"
    );

    const formattedJson = JSON.stringify(mergedTranslations, null, 2);

    await fs.writeFile(filePath, formattedJson, "utf-8");

    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error saving translations:", error);
    throw new Error(`Failed to save translations: ${(error as any)?.message}`);
  }
}
