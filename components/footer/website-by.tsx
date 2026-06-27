import Link from 'next/link';
import { useTranslations } from 'next-intl';
import WebsiteByIcon from '../icons/website-by-icon';

export function WebsiteBy() {
  const t = useTranslations();
  return (
    <div className="items-end flex w-full justify-start md:justify-end">
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
