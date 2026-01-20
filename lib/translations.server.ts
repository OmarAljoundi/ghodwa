'use server';

import { type SearchResponse, searchClient } from '@algolia/client-search';
import { revalidatePath, unstable_cache } from 'next/cache';

const client = searchClient(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_KEY!);

const INDEX_NAME = 'translations';

const langMapper = {
  'tab-en': 'en',
  'tab-ar': 'ar',
};

export const getTranslations = async (language: 'tab-en' | 'tab-ar') =>
  unstable_cache(
    async () => {
      if (language !== 'tab-en' && language !== 'tab-ar') {
        throw new Error('Invalid language code');
      }

      const { results } = await client.searchForHits<
        SearchResponse<{ translations: Record<string, string> }>
      >({
        requests: [
          {
            indexName: INDEX_NAME,
            filters: `language:${langMapper[language]} AND isLatest:true`,
            hitsPerPage: 1,
          },
        ],
      });

      return {
        translations: results[0]?.hits?.[0]?.translations || ({} as Record<string, string>),
        objectID: results[0]?.hits?.[0]?.objectID,
      };
    },
    ['translations', language],
    {
      revalidate: 86400,
      tags: ['translations', language],
    },
  )();

export async function saveTranslations(
  language: 'tab-en' | 'tab-ar',
  translations: Record<string, string>,
) {
  const { results } = await client.searchForHits({
    requests: [
      {
        indexName: INDEX_NAME,
        filters: `language:${langMapper[language]}`,
        hitsPerPage: 1000,
        sortFacetValuesBy: 'alpha',
      },
    ],
  });

  const oldestObject = results[0]?.hits?.sort(
    (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )[0];

  if (oldestObject) {
    const { taskID } = await client.partialUpdateObject({
      indexName: INDEX_NAME,
      objectID: oldestObject.objectID,
      attributesToUpdate: {
        translations,
      },
    });

    if (taskID) await client.waitForTask({ indexName: INDEX_NAME, taskID });
  }

  revalidatePath('/', 'layout');

  return { success: true };
}

export async function addNewKey(translations: {
  key: string;
  arabicValue: string;
  englishValue: string;
}) {
  const arabicTranslations = await getTranslations('tab-ar');
  const englishTranslations = await getTranslations('tab-en');

  if (arabicTranslations.objectID) {
    const { taskID } = await client.partialUpdateObject({
      indexName: INDEX_NAME,
      objectID: arabicTranslations.objectID,
      attributesToUpdate: {
        translations: {
          ...{ [translations.key]: translations.arabicValue },
          ...arabicTranslations.translations,
        },
      },
    });

    if (taskID) await client.waitForTask({ indexName: INDEX_NAME, taskID });
  }

  if (englishTranslations.objectID) {
    const { taskID } = await client.partialUpdateObject({
      indexName: INDEX_NAME,
      objectID: englishTranslations.objectID,
      attributesToUpdate: {
        translations: {
          ...{ [translations.key]: translations.englishValue },
          ...englishTranslations.translations,
        },
      },
    });
    if (taskID) await client.waitForTask({ indexName: INDEX_NAME, taskID });
  }

  revalidatePath('/', 'layout');

  return { success: true };
}
