import {
  getAllCategory,
  getAllModels,
  getBrands,
  getNews,
  getServices,
} from "@/query";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_APP_URL!;
  const staticSiteMap = [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${url}`,
          ar: `${url}/ar`,
        },
      },
    },
    {
      url: `${url}/our-brands`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${url}/our-brands`,
          ar: `${url}/ar/our-brands`,
        },
      },
    },
    {
      url: `${url}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${url}/services`,
          ar: `${url}/ar/services`,
        },
      },
    },
    {
      url: `${url}/news`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${url}/news`,
          ar: `${url}/ar/news`,
        },
      },
    },
    {
      url: `${url}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${url}/contact-us`,
          ar: `${url}/ar/contact-us`,
        },
      },
    },

    {
      url: `${url}/alghodwa/management-and-team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${url}/alghodwa/management-and-team`,
          ar: `${url}/ar/alghodwa/management-and-team`,
        },
      },
    },
    {
      url: `${url}/alghodwa/management-systems`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${url}/alghodwa/management-systems`,
          ar: `${url}/ar/alghodwa/management-systems`,
        },
      },
    },
    {
      url: `${url}/alghodwa/mission-vision`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${url}/alghodwa/mission-vision`,
          ar: `${url}/ar/alghodwa/mission-vision`,
        },
      },
    },
    {
      url: `${url}/alghodwa/overview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${url}/alghodwa/overview`,
          ar: `${url}/ar/alghodwa/overview`,
        },
      },
    },
  ] as MetadataRoute.Sitemap;

  const [services, news, brands, models, categories] = await Promise.all([
    getServices(),
    getNews(),
    getBrands(),
    getAllModels(),
    getAllCategory(),
  ]);

  const servicesSiteMap = services.map((service) => ({
    url: `${url}/services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${url}/services/${service.slug}`,
        ar: `${url}/ar/services/${service.slug}`,
      },
    },
  })) as MetadataRoute.Sitemap;

  const newsSiteMap = news.map((n) => ({
    url: `${url}/news/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${url}/news/${n.slug}`,
        ar: `${url}/ar/news/${n.slug}`,
      },
    },
  })) as MetadataRoute.Sitemap;

  const brandsSiteMap = brands.map((brand) => ({
    url: `${url}/our-brands/${brand.slug}`,
    lastModified: brand.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${url}/our-brands/${brand.slug}`,
        ar: `${url}/ar/our-brands/${brand.slug}`,
      },
    },
  })) as MetadataRoute.Sitemap;

  const categoriesSiteMap = categories.map((category) => ({
    url: `${url}/services/${category.brand?.slug}/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${url}/our-brands/${category.brand?.slug}/${category.slug}`,
        ar: `${url}/ar/our-brands/${category.brand?.slug}/${category.slug}`,
      },
    },
  })) as MetadataRoute.Sitemap;

  const modelsSiteMap = models.map((model) => ({
    url: `${url}/our-brands/${model.category?.slug}/${model.category.brand?.slug}/${model.slug}`,
    lastModified: model.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        en: `${url}/our-brands/${model.category?.slug}/${model.category.brand?.slug}/${model.slug}`,
        ar: `${url}/ar/our-brands/${model.category?.slug}/${model.category.brand?.slug}/${model.slug}`,
      },
    },
  })) as MetadataRoute.Sitemap;

  return [
    ...staticSiteMap,
    ...servicesSiteMap,
    ...newsSiteMap,
    ...brandsSiteMap,
    ...categoriesSiteMap,
    ...modelsSiteMap,
  ];
}
