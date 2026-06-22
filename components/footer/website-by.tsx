import Link from 'next/link';
import { useTranslations } from 'next-intl';
import WebsiteByIcon from '../icons/website-by-icon';

export function WebsiteBy() {
  const t = useTranslations();
  return (
    <div className="col-span-full md:col-span-2 lg:col-span-1 lg:col-start-4 2xl:col-start-5 items-end flex  w-full justify-start">
      <Link
        target="_blank"
        href={'http://www.mohamadnamir.com/'}
        className="flex-row items-end justify-start gap-x-6 flex  gap-y-4 md:gap-y-0"
      >
        <h1 aria-label="website-by" className="text-sm">
          {t('Website by')}
        </h1>

        <WebsiteByIcon width={80} />
      </Link>
    </div>
  );
}
