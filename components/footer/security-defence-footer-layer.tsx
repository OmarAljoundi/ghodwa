import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { useBrandsPages } from '@/hooks/use-render-items';
import type { BrandWithRelationsSchema } from '@/schema';
import { ColumnGroup } from './column-group';

export function SecurityDefenceFooterLayer({
  securityDefenceBrands,
}: {
  securityDefenceBrands: BrandWithRelationsSchema[];
}) {
  const items = useBrandsPages(securityDefenceBrands, 'footer');
  const filtredItems = useFilteredLanguageData(items);

  const mappedItems = filtredItems.map((o) => {
    return {
      title: o.name,
      url: `/security-and-defence/${o.slug}`,
    };
  });

  if (mappedItems.length === 0) return null;

  return (
    <div className="col-span-full md:col-span-1 pe-3 w-full">
      <ColumnGroup items={mappedItems} title="Security and Defence" />
    </div>
  );
}
