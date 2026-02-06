import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { resolveUrl, } from '@/lib/utils';
import type { FileSchema } from '@/schema/upload-schema';
import { BlurFade } from '../ui/blur-fade';
import { Spinner } from '../ui/spinner';

interface DownloadBrochureProps {
  className?: string;
  brochure?: FileSchema;
}

export function DownloadBrochure({ className, brochure }: DownloadBrochureProps) {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);


  if (!brochure || !brochure?.path) {
    return null;
  }

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(resolveUrl(brochure.path), {
        next: { tags: [brochure.path] },
      });
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `brochure`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <BlurFade delay={0.3} className={className}>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="rounded-xl bg-primary py-4 px-6 w-full flex justify-between items-center hover:bg-primary/90 transition-colors"
        aria-label={t('Download Brochure')}
      >
        <div className="flex flex-col items-start">
          <h1 className="font-light text-black text-lg">{t('Download Brochure')}</h1>
          <span className="text-sm text-black/70">{formatFileSize(brochure.size)}</span>
        </div>
        {isLoading ? (
          <Spinner variant="ring" className="text-white size-12 animate-spin" />
        ) : (
          <IoArrowDownCircleOutline className="text-white size-12" />
        )}
      </button>
    </BlurFade>
  );
}
