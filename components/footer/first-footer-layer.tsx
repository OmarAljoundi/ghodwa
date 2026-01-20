import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { useBrandsPages } from '@/hooks/use-render-items';
import type { BrandWithRelationsSchema } from '@/schema';
import { ColumnGroup } from './column-group';

export function FirstFooterLayer({ brands }: { brands: BrandWithRelationsSchema[] }) {
  const items = useBrandsPages(brands, 'footer');
  const filtredItems = useFilteredLanguageData(items);

  const mappedItems = filtredItems.map((o) => {
    return {
      title: o.name,
      url: `/our-brands/${o.slug}`,
    };
  });

  return (
    <div className="col-span-full md:col-span-1 pe-3 w-full">
      <ColumnGroup items={mappedItems} title="Our Brands" />
    </div>
  );
}
