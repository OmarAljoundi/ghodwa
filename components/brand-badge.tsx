import { useTranslations } from 'next-intl';
import { GoDotFill } from 'react-icons/go';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

export function BrandBadge({ title, className }: { title: string; className?: string }) {
  const t = useTranslations();
  return (
    <Badge
      className={cn(
        'text-base text-primary border-primary flex flex-row items-center gap-2',
        className,
      )}
      variant={'outline'}
    >
      <GoDotFill className="animate-pulse size-3 flex-shrink-0 block" />
      <h1 className="block whitespace-nowrap ">{t(title)}</h1>
    </Badge>
  );
}
