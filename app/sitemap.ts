import type { MetadataRoute } from 'next';
import {
  getAllCategory,
  getAllModels,
  getBrands,
  getNews,
  getSecurityDefenceBrands,
  getServices,
} from '@/query';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_APP_URL!;
  const staticSiteMap = [
    {
      url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
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
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${url}/our-brands`,
          ar: `${url}/ar/our-brands`,
        },
      },
    },
    {
      url: `${url}/security-and-defence`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${url}/security-and-defence`,
          ar: `${url}/ar/security-and-defence`,
        },
      },
    },
    {
      url: `${url}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
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
      changeFrequency: 'monthly',
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
      changeFrequency: 'never',
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
      changeFrequency: 'monthly',
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
      changeFrequency: 'monthly',
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
      changeFrequency: 'monthly',
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
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${url}/alghodwa/overview`,
          ar: `${url}/ar/alghodwa/overview`,
        },
      },
    },
  ] as MetadataRoute.Sitemap;

  const [services, news, brands, securityDefenceBrands, models, categories] = await Promise.all([
    getServices(),
    getNews(),
    getBrands(),
    getSecurityDefenceBrands(),
    getAllModels(),
    getAllCategory(),
  ]);

  // Map a brand's namespace prefix from its type so SD never appears under /our-brands.
  const prefixForType = (type?: string) =>
    type === 'security_defence' ? 'security-and-defence' : 'our-brands';

  const servicesSiteMap = services.map((service) => ({
    url: `${url}/services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: 'monthly',
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
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        en: `${url}/news/${n.slug}`,
        ar: `${url}/ar/news/${n.slug}`,
      },
    },
  })) as MetadataRoute.Sitemap;

  const buildBrandSiteMap = (list: typeof brands, prefix: 'our-brands' | 'security-and-defence') =>
    list.map((brand) => ({
      url: `${url}/${prefix}/${brand.slug}`,
      lastModified: brand.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${url}/${prefix}/${brand.slug}`,
          ar: `${url}/ar/${prefix}/${brand.slug}`,
        },
      },
    })) as MetadataRoute.Sitemap;

  const brandsSiteMap = buildBrandSiteMap(brands, 'our-brands');
  const securityDefenceBrandsSiteMap = buildBrandSiteMap(
    securityDefenceBrands,
    'security-and-defence',
  );

  const categoriesSiteMap = categories.map((category) => {
    const prefix = prefixForType(category.brand?.type);
    const path = `/${prefix}/${category.brand?.slug}/${category.slug}`;
    return {
      url: `${url}${path}`,
      lastModified: category.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${url}${path}`,
          ar: `${url}/ar${path}`,
        },
      },
    };
  }) as MetadataRoute.Sitemap;

  const modelsSiteMap = models.map((model) => {
    const prefix = prefixForType(model.category?.brand?.type);
    const path = `/${prefix}/${model.category?.brand?.slug}/${model.category?.slug}/${model.slug}`;
    return {
      url: `${url}${path}`,
      lastModified: model.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${url}${path}`,
          ar: `${url}/ar${path}`,
        },
      },
    };
  }) as MetadataRoute.Sitemap;

  return [
    ...staticSiteMap,
    ...servicesSiteMap,
    ...newsSiteMap,
    ...brandsSiteMap,
    ...securityDefenceBrandsSiteMap,
    ...categoriesSiteMap,
    ...modelsSiteMap,
  ];
}
