import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function ColumnGroup<
  T extends {
    title: string;
    url: string;
  },
>({ items, title }: { items: T[]; title: string }) {
  const t = useTranslations();

  return (
    <>
      {/* Desktop View - Hidden on mobile */}
      <div className="hidden md:block">
        <h3 className="text-primary font-semibold mb-4">{t(title)}</h3>
        <ul className="space-y-2">
          {items.map((props, index) => (
            <ColumnItemGroup item={props} key={index} />
          ))}
        </ul>
      </div>

      {/* Mobile View - Hidden on desktop */}
      <div className="md:hidden w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={title} className="border-gray-700">
            <AccordionTrigger
              className="text-primary font-semibold w-full"
              iconClass="text-primary"
            >
              {t(title)}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 py-2">
                {items.map((props, index) => (
                  <ColumnItemGroup item={props} key={index} />
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

function ColumnItemGroup<
  T extends {
    title: string;
    url: string;
  },
>({ item }: { item: T }) {
  const t = useTranslations();
  return (
    <li>
      <Link href={item.url ?? ''} className="hover:text-primary transition-colors">
        {t(item.title)}
      </Link>
    </li>
  );
}
