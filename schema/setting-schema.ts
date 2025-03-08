import { z } from "zod";
import { SeoSchema } from "./seo-schema";
import { fileSchemaRequired } from "./upload-schema";

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

const hourState = z.discriminatedUnion("state", [
  z.object({
    state: z.literal("open"),
    from: z
      .object({ hour: z.number(), minute: z.number() })
      .default({ hour: 8, minute: 0 }),
    to: z
      .object({
        hour: z.number(),
        minute: z.number(),
      })
      .default({ hour: 17, minute: 0 }),
  }),
  z.object({
    state: z.literal("closed"),
  }),
]);

export const settingSchema = z.object({
  home: z.object({
    homehero: z
      .object({
        id: z.string(),
        en_media: fileSchemaRequired,
        ar_media: fileSchemaRequired,
        en_mobile_media: fileSchemaRequired,
        ar_mobile_media: fileSchemaRequired,
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
      en_media: fileSchemaRequired,
      ar_media: fileSchemaRequired,
      en_mobile_media: fileSchemaRequired,
      ar_mobile_media: fileSchemaRequired,
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

  footer: z.object({
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

  overview: z.object({
    ar_content: z.string(),
    en_content: z.string(),
    showPage: z.boolean().default(true),
    showOnMenu: z.boolean().default(true),
    showOnFooter: z.boolean().default(true),
  }),

  missionVision: z.object({
    ar_content: z.string(),
    en_content: z.string(),
    showPage: z.boolean().default(true),
    showOnMenu: z.boolean().default(true),
    showOnFooter: z.boolean().default(true),
  }),

  managementTeam: z.object({
    ar_title: z.string().default("Our Experts"),
    en_title: z.string().default("Our Experts"),
    ar_badgeTitle: z.string().default("Our Experts"),
    en_badgeTitle: z.string().default("Our Experts"),
    showPage: z.boolean().default(true),
    showOnMenu: z.boolean().default(true),
    showOnFooter: z.boolean().default(true),
    team: z
      .object({
        id: z.string(),
        ar_name: z.string(),
        en_name: z.string(),
        ar_summary: z.string(),
        en_summary: z.string(),
        ar_jobTitle: z.string(),
        en_jobTitle: z.string(),
        media: fileSchemaRequired,
        contactNumber: z.string(),
      })
      .array()
      .default([]),
  }),

  managementSystems: z.object({
    ar_content: z.string(),
    en_content: z.string(),
    showPage: z.boolean().default(true),
    showOnMenu: z.boolean().default(true),
    showOnFooter: z.boolean().default(true),
  }),

  workingHours: z.object({
    items: z
      .object({
        id: z.string(),
        en_day: z.string(),
        ar_day: z.string(),
        office: hourState.default({ state: "open" }),
      })
      .array()
      .max(7)
      .default([]),
  }),

  offices: z.object({
    items: z
      .object({
        id: z.string(),
        en_country: z.string(),
        en_city: z.string(),
        en_address: z.string(),
        ar_country: z.string(),
        ar_city: z.string(),
        ar_address: z.string(),
        contactNumber: z.string(),
      })
      .array()
      .max(3)
      .default([]),
  }),

  socialMediaContact: z.object({
    items: z
      .object({
        id: z.string(),
        channel: z.enum([
          "Youtube",
          "Facebook",
          "LinkedIn",
          "Instagram",
          "X",
          "Email",
          "Whatsapp",
          "Phone",
        ]),
        url: z.string(),
      })
      .array()
      .max(8)
      .default([]),
  }),

  extraAboutPages: z
    .object({
      id: z.string(),
      slug: z.string(),
      ar_title: z.string(),
      en_title: z.string(),
      ar_content: z.string(),
      en_content: z.string(),
      seo: SeoSchema.optional(),
      showPage: z.boolean().default(true),
      showOnMenu: z.boolean().default(true),
      showOnFooter: z.boolean().default(true),
    })
    .array()
    .default([]),

  seoStaticPagesHome: z.object({ seo: SeoSchema }),
  seoStaticPagesOverview: z.object({ seo: SeoSchema }),
  seoStaticPagesMission: z.object({ seo: SeoSchema }),
  seoStaticPagesManagementTeam: z.object({ seo: SeoSchema }),
  seoStaticPagesManagementSystems: z.object({ seo: SeoSchema }),
  seoStaticPagesContactUs: z.object({ seo: SeoSchema }),
  seoStaticPagesBrandListing: z.object({ seo: SeoSchema }),
  seoStaticPagesServicesListing: z.object({ seo: SeoSchema }),
  seoStaticPagesNewsListing: z.object({ seo: SeoSchema }),
});

export type SettingSchema = z.infer<typeof settingSchema>;
