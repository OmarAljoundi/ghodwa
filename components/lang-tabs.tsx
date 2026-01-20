import Image from 'next/image';
import React, { Children, isValidElement, type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';

interface LangTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  children: [ReactNode, ReactNode];
  extraElement?: ReactNode;
  showSave?: boolean;
}

export function LangTabs({ children, extraElement, showSave = true, ...rest }: LangTabsProps) {
  const form = useFormContext();
  if (Children.count(children) !== 2) {
    throw new Error('LangTabs must have exactly two children.');
  }

  const tabs = Children.map(children, (child) => {
    if (!isValidElement<{ lang: string }>(child) || !('lang' in child.props)) {
      throw new Error("Each child of LangTabs must have a 'lang' prop.");
    }
    return child;
  });

  const arChild = tabs?.find((child) => child.props.lang === 'ar_');
  const enChild = tabs?.find((child) => child.props.lang === 'en_');

  if (!arChild || !enChild) {
    throw new Error("LangTabs must have one child with lang='ar_' and one with lang='en_'.");
  }

  return (
    <Tabs defaultValue="tab-en" {...rest}>
      <TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0 w-full justify-between">
        <div className="flex justify-start">
          <TabsTrigger
            value="tab-en"
            className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <Image src="/uk.png" className="mb-1.5 w-5" width={128} height={128} alt="UK" />
            English
          </TabsTrigger>
          <TabsTrigger
            value="tab-ar"
            className="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <Image src="/jordan.png" className="mb-1.5 w-5" width={128} height={128} alt="Jordan" />
            Arabic
          </TabsTrigger>
        </div>
        <div className="flex items-end gap-x-2">
          {extraElement}

          {showSave && (
            <Button variant={'default'} disabled={form?.formState?.isSubmitting}>
              Save
            </Button>
          )}
        </div>
      </TabsList>
      <TabsContent value="tab-en">{enChild}</TabsContent>
      <TabsContent value="tab-ar">{arChild}</TabsContent>
    </Tabs>
  );
}
