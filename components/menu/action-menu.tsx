import { ArrowDown, Globe, Search } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { CommandSearch } from './command-search';

export default function ActionMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`flex flex-row-reverse items-center xl:flex-row gap-x-2 xl:gap-x-0 xl:space-x-4 rtl:space-x-reverse `}
    >
      <CommandSearch open={open} setOpen={setOpen}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className={cn('bg-brand-accent  text-black')}
        >
          <Search className="size-5 " />
          <span className="sr-only">Search</span>
        </Button>
      </CommandSearch>

      <LangaugeMenu />
    </div>
  );
}

function LangaugeMenu() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const currentLocale = locale;

  const handleChange = (newLocale: string) => {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-brand-accent text-black flex items-center h-9 w-9 xl:h-9 xl:w-auto ">
          <span className="hidden xl:inline-block">{t('Language')}</span>
          <Globe className="xl:hidden size-4" strokeWidth={2} aria-hidden="true" />
          <ArrowDown
            className={cn(
              'hidden xl:block -me-1 ms-2 opacity-60 transition-all duration-500 size-4',
              open ? 'rotate-180' : '',
            )}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36 p-2">
        <div className="flex flex-col">
          <Button
            onClick={() => handleChange('ar')}
            variant={'ghost'}
            size={'sm'}
            className={cn(currentLocale === 'ar' ? 'bg-primary text-primary-foreground' : '')}
          >
            <span>Arabic</span>
            <Image
              src="/jordan.png"
              className="-me-1 ms-2 "
              width={16}
              height={16}
              quality={100}
              alt="Jordan"
            />
          </Button>
          <Separator className="my-0.5" />
          <Button
            onClick={() => handleChange('en')}
            variant={'ghost'}
            size={'sm'}
            className={cn(currentLocale === 'en' ? 'bg-primary text-primary-foreground' : '')}
          >
            <span>English</span>
            <Image
              src="/uk.png"
              className="-me-1 ms-2 "
              width={16}
              height={16}
              quality={100}
              alt="english"
            />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
