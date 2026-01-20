import type { Service } from '@/generated/client/client';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { useExtraPages, useServicesPages } from '@/hooks/use-render-items';
import type { SettingSchema } from '@/schema/setting-schema';
import { ColumnGroup } from './column-group';

export function SecondFooterLayer({
  services,
  settings,
}: {
  services: Service[];
  settings: SettingSchema;
}) {
  const items = useServicesPages(services, 'footer');
  const itemsFiltered = useFilteredLanguageData(items);

  const mappedItems = itemsFiltered.map((x) => {
    return {
      title: x.title,
      url: `/services/${x.slug}`,
    };
  });

  const extraAlGhodwaMenu = useExtraPages(settings, 'footer');
  const alGhodwaMenuFiltered = useFilteredLanguageData(extraAlGhodwaMenu);

  return (
    <div className="grid grid-cols-1 gap-8 pe-3 w-full">
      <div>
        <ColumnGroup items={mappedItems} title="Services" />
      </div>
      <div>
        <ColumnGroup items={alGhodwaMenuFiltered} title="Al Ghodwa" />
      </div>
    </div>
  );
}
