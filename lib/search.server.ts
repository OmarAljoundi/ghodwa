'use server';

import { searchClient } from '@algolia/client-search';
import { db } from '@/db.server';
import type { AlgoliaSearchResult, GlobleIndex } from './types';

const client = searchClient(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_SEARCH_API_KEY!);

export async function GetModelsGlobleIndex() {
  const result = await db.model.findMany({
    include: {
      category: {
        include: {
          brand: true,
        },
      },
    },
  });
  const mappedResult = result.map((o): { ar: GlobleIndex; en: GlobleIndex } => {
    const href = `/our-brands/${o.category.brand?.slug}/${o.category.slug}/${o.slug}`;
    return {
      ar: {
        title: o.ar_name,
        description: o.ar_description ?? '',
        slug: href,
        type: 'نماذج',
        objectID: `Brands-${o.id}`,
      },
      en: {
        title: o.en_name,
        description: o.en_description ?? '',
        slug: href,
        type: 'Brands',
        objectID: `Brands-${o.id}`,
      },
    };
  });

  return {
    ar: mappedResult.map((x) => x.ar),
    en: mappedResult.map((x) => x.en),
  };
}

export async function GetCategoriesGlobleIndex() {
  const result = await db.category.findMany({
    include: {
      brand: true,
    },
  });
  const mappedResult = result.map((o): { ar: GlobleIndex; en: GlobleIndex } => {
    const href = `/our-brands/${o.brand?.slug}/${o.slug}`;
    return {
      ar: {
        title: o.ar_name,
        description: o.ar_description ?? '',
        slug: href,
        type: 'فئات',
        objectID: `Categories-${o.id}`,
      },
      en: {
        title: o.en_name,
        description: o.en_description ?? '',
        slug: href,
        type: 'Categories',
        objectID: `Categories-${o.id}`,
      },
    };
  });

  return {
    ar: mappedResult.map((x) => x.ar),
    en: mappedResult.map((x) => x.en),
  };
}

export async function GetBrandsGlobleIndex() {
  const result = await db.brand.findMany();

  const mappedResult = result.map((o): { ar: GlobleIndex; en: GlobleIndex } => {
    const href = `/our-brands/${o.slug}`;
    return {
      ar: {
        title: o.ar_name,
        description: o.ar_description ?? '',
        slug: href,
        type: 'ماركات',
        objectID: `Brands-${o.id}`,
      },
      en: {
        title: o.en_name,
        description: o.en_description ?? '',
        slug: href,
        type: 'Brands',
        objectID: `Brands-${o.id}`,
      },
    };
  });

  return {
    ar: mappedResult.map((x) => x.ar),
    en: mappedResult.map((x) => x.en),
  };
}

export async function GetServicesGlobleIndex() {
  const result = await db.service.findMany();

  const mappedResult = result.map((o): { ar: GlobleIndex; en: GlobleIndex } => {
    const href = `/services/${o.slug}`;
    return {
      ar: {
        title: o.ar_title,
        description: '',
        slug: href,
        type: 'خدمات',
        objectID: `Services-${o.id}`,
      },
      en: {
        title: o.en_title,
        description: '',
        slug: href,
        type: 'Services',
        objectID: `Services-${o.id}`,
      },
    };
  });

  return {
    ar: mappedResult.map((x) => x.ar),
    en: mappedResult.map((x) => x.en),
  };
}

export async function GetNewsGlobleIndex() {
  const result = await db.news.findMany();
  const mappedResult = result.map((o): { ar: GlobleIndex; en: GlobleIndex } => {
    const href = `/news/${o.slug}`;
    return {
      ar: {
        title: o.ar_title,
        description: o.ar_summary ?? '',
        slug: href,
        type: 'أخبار',
        objectID: `News-${o.id}`,
      },
      en: {
        title: o.en_title,
        description: o.en_summary ?? '',
        slug: href,
        type: 'News',
        objectID: `News-${o.id}`,
      },
    };
  });

  return {
    ar: mappedResult.map((x) => x.ar),
    en: mappedResult.map((x) => x.en),
  };
}

export async function searchWebsite(
  query: string,
  indexName: 'ghodwa_globle_index_en' | 'ghodwa_globle_index_ar',
): Promise<Array<Omit<AlgoliaSearchResult, '_highlightResult'>>> {
  const { results } = await client.search<GlobleIndex>({
    requests: [
      {
        indexName,
        query,
        queryLanguages: [indexName.includes('ar') ? 'ar' : 'en'],
      },
    ],
  });

  const hits: Array<AlgoliaSearchResult> = results.length > 0 ? (results[0] as any).hits : [];

  return hits.map(({ objectID, slug, _highlightResult }) => {
    const highlightStyle = '<em style="background: yellow; padding: 0 2px;">';

    const titleHighlighted = _highlightResult.title.value.replaceAll('<em>', highlightStyle);

    const descriptionHighlighted = _highlightResult.description.value.replaceAll(
      '<em>',
      highlightStyle,
    );

    const typeHighlighted = _highlightResult.type.value.replaceAll('<em>', highlightStyle);

    return {
      objectID,
      slug,
      title: titleHighlighted,
      description: descriptionHighlighted,
      type: typeHighlighted,
    };
  });
}
