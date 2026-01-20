import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const appMessages = (await import(`../locales/${locale}/common.json`)).default;

  return {
    locale,
    messages: appMessages,
    onError: () => {},
    getMessageFallback: ({ key, namespace }) => {
      return namespace ? `${namespace}.${key}` : key;
    },
  };
});
