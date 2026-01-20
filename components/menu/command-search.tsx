'use client';

import { useQuery } from '@tanstack/react-query';
import { CommandLoading } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import { BookUser, Brush, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/use-debounce';
import { searchWebsite } from '@/lib/search.server';
import type { AlgoliaSearchResult } from '@/lib/types';
import { SearchIcon } from '../icons/search-icon';

export function CommandSearch({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations();
  const lang = useLocale();
  const [searchString, setSearchString] = React.useState('');
  const debouncedSearchString = useDebounce(searchString, 300);

  const searchKey = lang === 'en' ? 'ghodwa_globle_index_en' : 'ghodwa_globle_index_ar';

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: [debouncedSearchString, searchKey],
    queryFn: async () => {
      return (await searchWebsite(debouncedSearchString, searchKey)) as Array<
        Omit<AlgoliaSearchResult, '_highlightResult'>
      >;
    },
    enabled: debouncedSearchString.length > 2,
  });

  const SkeletonItem = ({ index }: { index: number }) => (
    <div key={`skeleton-item-${index}`} className="flex w-full items-center space-x-2 p-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-16" />
    </div>
  );

  return (
    <>
      {children}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          key="command-input"
          dir={lang === 'en' ? 'ltr' : 'rtl'}
          placeholder={t('Type a search word')}
          value={searchString}
          onValueChange={setSearchString}
        />
        <CommandList key="command-list" dir={lang === 'en' ? 'ltr' : 'rtl'}>
          {isLoading && (
            <CommandLoading key="command-loading">
              <AnimatePresence mode="wait">
                <motion.div
                  key="loading-motion"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {[...Array(3)].map((_, index) => (
                    <SkeletonItem key={`skeleton-${index}`} index={index} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </CommandLoading>
          )}

          <AnimatePresence mode="wait">
            {/* Quick Start Section */}
            {/* Search Results Section */}
            {debouncedSearchString.length > 2 && (
              <motion.div
                key="search-results-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CommandGroup
                  key="search-results-group"
                  heading={<h1 className="font-bold text-sm">{t('Search Results')}</h1>}
                >
                  <AnimatePresence>
                    <motion.div
                      key="search-results-motion"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {searchResults?.length === 0 && (
                        <h1 className="text-lg font-bold text-center p-4 border-border border-b">
                          {t('No results found')}
                        </h1>
                      )}

                      {searchResults?.map((result) => {
                        const uniqueKey = `search-result-${result.objectID}-${result.slug}`;

                        return (
                          <CommandItem key={uniqueKey}>
                            <Link
                              href={result.slug}
                              onClick={() => setOpen(false)}
                              className="flex w-full items-center justify-between space-x-2"
                            >
                              <div className="flex w-full justify-start items-start gap-x-2">
                                <SearchIcon className="p-0" />
                                <div className="flex flex-1 flex-col overflow-hidden">
                                  <span
                                    className="truncate text-sm font-medium"
                                    dangerouslySetInnerHTML={{
                                      __html: result.title,
                                    }}
                                  />
                                  <span
                                    className="line-clamp-1 text-xs text-muted-foreground"
                                    dangerouslySetInnerHTML={{
                                      __html: result.description,
                                    }}
                                  />
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="ml-auto"
                                dangerouslySetInnerHTML={{
                                  __html: result.type,
                                }}
                              />
                            </Link>
                          </CommandItem>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </CommandGroup>
              </motion.div>
            )}

            <motion.div
              key="quick-start-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CommandGroup
                key="quick-start-group"
                heading={<h1 className="font-bold text-sm">{t('Quick start')}</h1>}
              >
                <CommandItem key="our-brands-item">
                  <Link
                    href="/our-brands"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-start gap-x-2"
                  >
                    <Brush
                      size={16}
                      strokeWidth={2}
                      className="mr-2 opacity-60 rtl:ml-2"
                      aria-hidden="true"
                    />
                    <span>{t('Our Brands')}</span>
                  </Link>
                </CommandItem>
                <CommandItem key="services-item">
                  <Link
                    href="/services"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-start gap-x-2"
                  >
                    <BookUser
                      size={16}
                      strokeWidth={2}
                      className="mr-2 opacity-60 rtl:ml-2"
                      aria-hidden="true"
                    />
                    <span>{t('Services')}</span>
                  </Link>
                </CommandItem>
                <CommandItem key="news-item">
                  <Link
                    href="/news"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-start gap-x-2"
                  >
                    <Newspaper
                      size={16}
                      strokeWidth={2}
                      className="mr-2 opacity-60 rtl:ml-2"
                      aria-hidden="true"
                    />
                    <span>{t('News')}</span>
                  </Link>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator key="command-separator" />
            </motion.div>
          </AnimatePresence>
        </CommandList>
      </CommandDialog>
    </>
  );
}
