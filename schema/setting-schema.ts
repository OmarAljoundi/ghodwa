import { z } from "zod";
import { SeoSchema } from "./seo-schema";

export const buttonVarientsEnums = ["default", "outline", "text"] as const;
export const MAX_ARTWORKS = 3;
export const MAX_EXPLORE_MORE = 2;
export const MAX_EXPLORE_MORE_ADDITONALS = 3;
export const MAX_FOOTER_COLUMNS = 3;
export const MAX_CONTACT_NUMBER = 3;

const callToActionSchema = z.object({
  ar_text: z.string().optional(),
  en_text: z.string().optional(),
  url: z.string(),
});

export const settingSchema = z.object({
  home: z.object({
    homehero: z
      .object({
        id: z.string(),
        media: z.any(),
        ar_title: z.string(),
        en_title: z.string(),
        ar_subtitle: z.string().optional(),
        en_subtitle: z.string().optional(),
      })
      .array()
      .default([]),
    welcomeSection: z.object({
      ar_title: z.string(),
      en_title: z.string(),
      ar_subtitle: z.string(),
      en_subtitle: z.string(),
      callToAction: z.object(callToActionSchema.shape),
    }),
    moreSection: z.object({
      media: z.any(),
      ar_title: z.string(),
      en_title: z.string(),
      ar_subtitle: z.string(),
      en_subtitle: z.string(),
      callToAction: z.object(callToActionSchema.shape),
    }),
    latestNews: z.object({
      ar_title: z.string(),
      en_title: z.string(),
    }),
    brand: z.object({
      ar_title: z.string(),
      en_title: z.string(),
    }),
  }),

  menus: z.object({
    ar_items: z
      .object({
        id: z.string(),
        title: z.string(),
        url: z.string(),
      })
      .array()
      .default([]),
    en_items: z
      .object({
        id: z.string(),
        title: z.string(),
        url: z.string(),
      })
      .array()
      .default([]),
  }),

  footer: z.object({
    items: z
      .object({
        id: z.string(),
        ar_group_title: z.string(),
        en_group_title: z.string(),
        columns: z
          .object({
            ar_title: z.string(),
            en_title: z.string(),
            url: z.string(),
          })
          .array()
          .default([]),
      })
      .array()
      .max(MAX_FOOTER_COLUMNS),
    contactInfo: z
      .object({
        en_title: z.string(),
        ar_title: z.string(),
        number: z.string(),
        showWhatsapp: z.boolean().default(true),
        showCall: z.boolean().default(true),
      })
      .array()
      .max(MAX_CONTACT_NUMBER)
      .default([]),
    company: z
      .object({
        en_location: z.string(),
        ar_location: z.string(),
        details: z.object({ email: z.string() }).array().default([]),
      })
      .optional(),
    socialMedia: z
      .object({
        media: z.enum(["Youtube", "Facebook", "LinkedIn"]),
        url: z.string().url(),
      })
      .array()
      .default([]),
  }),

  seo: SeoSchema.optional(),
  seoStaticPagesHome: z.object({ seo: SeoSchema }),
  seoStaticPagesStudio: z.object({ seo: SeoSchema }),
  seoStaticPagesPublications: z.object({ seo: SeoSchema }),
  seoStaticPagesMediaCenter: z.object({ seo: SeoSchema }),
  seoStaticPagesArticles: z.object({ seo: SeoSchema }),
  seoStaticPagesExhibition: z.object({ seo: SeoSchema }),
  seoStaticPagesContactUs: z.object({ seo: SeoSchema }),
  seoStaticPagesNews: z.object({ seo: SeoSchema }),
  seoStaticPagesArtworks: z.object({ seo: SeoSchema }),
  seoStaticPagesNasriAward: z.object({ seo: SeoSchema }),
  seoStaticNasiriAwardOverview: z.object({ seo: SeoSchema }),
  seoStaticNasiriAwardPastWinners: z.object({ seo: SeoSchema }),
});

export type SettingSchema = z.infer<typeof settingSchema>;
