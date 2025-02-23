"use server";

import { unstable_cache, unstable_noStore } from "next/cache";
import { db } from "./db.server";
import { getSettingBySectionAsync } from "./lib/settings.server";
import { SettingSchema } from "./schema/setting-schema";
import { ContactSchema } from "./schema/contact-schema";

export const getBrands = unstable_cache(
  async () => {
    const brands = await db.brand.findMany({
      include: {
        categories: true,
      },
    });

    return brands;
  },
  ["brands"],
  {
    revalidate: 86400,
    tags: ["brands"],
  }
);

export const getAllModels = unstable_cache(
  async () => {
    const brands = await db.model.findMany({
      include: {
        category: {
          include: {
            brand: true,
          },
        },
      },
    });

    return brands;
  },
  ["all-models"],
  {
    revalidate: 86400,
    tags: ["all-models"],
  }
);

export const getBrandBySlug = async (slug: string) =>
  unstable_cache(
    async () => {
      const brand = await db.brand.findUniqueOrThrow({
        where: { slug },
        include: {
          categories: true,
        },
      });
      return brand;
    },
    ["brands", slug],
    {
      revalidate: 86400,
      tags: ["brands", slug],
    }
  )();

export const getSettings = unstable_cache(
  async () => {
    const settings = await getSettingBySectionAsync("CMS");
    return settings as SettingSchema;
  },
  ["settings"],
  {
    revalidate: 86400,
    tags: ["settings"],
  }
);

export const getServices = unstable_cache(
  async () => {
    const services = await db.service.findMany({
      where: { is_published: true },
      orderBy: {
        order: "asc",
      },
    });
    return services;
  },
  ["services"],
  {
    revalidate: 86400,
    tags: ["services"],
  }
);

export const getNews = unstable_cache(
  async () => {
    const news = await db.news.findMany({
      where: { is_published: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return news;
  },
  ["news"],
  {
    revalidate: 86400,
    tags: ["news"],
  }
);

export const getAllCategory = unstable_cache(
  async () => {
    const category = await db.category.findMany({
      include: {
        brand: true,
      },
    });
    return category;
  },
  ["all-category"],
  {
    revalidate: 86400,
    tags: ["all-category"],
  }
);

export const getCategoryBySlug = async (slug: string) =>
  unstable_cache(
    async () => {
      const category = await db.category.findUniqueOrThrow({
        where: { slug },
        include: {
          models: true,
        },
      });
      return category;
    },
    ["category", slug],
    {
      revalidate: 86400,
      tags: ["category", slug],
    }
  )();

export const getModelBySlug = async (slug: string, categorySlug: string) =>
  unstable_cache(
    async () => {
      const models = await db.model.findMany({
        where: { category: { slug: categorySlug } },
        include: {
          category: {
            include: {
              brand: { select: { logo: true, ar_name: true, en_name: true } },
            },
          },
        },
      });
      const currentModel = models.find((x) => x.slug == slug);
      return { models, currentModel };
    },
    ["model", slug],
    {
      revalidate: 86400,
      tags: ["model", slug],
    }
  )();

export const getNewsBySlug = async (slug: string) =>
  unstable_cache(
    async () => {
      const news = await db.news.findUniqueOrThrow({
        where: { slug },
      });
      return news;
    },
    ["news", slug],
    {
      revalidate: 86400,
      tags: ["news", slug],
    }
  )();

export const getServiceBySlug = async (slug: string) =>
  unstable_cache(
    async () => {
      const service = await db.service.findUniqueOrThrow({
        where: { slug },
      });
      return service;
    },
    ["service", slug],
    {
      revalidate: 86400,
      tags: ["service", slug],
    }
  )();

export const submitForm = async (data: ContactSchema) => {
  unstable_noStore();

  try {
    await db.contact.create({
      data,
    });

    return { success: true };
  } catch (ex: any) {
    console.error(ex?.message);
    return { success: true };
  }
};
