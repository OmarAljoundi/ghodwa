import Image from 'next/image';
import type React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ResponsiveImageProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Image>, 'src' | 'width' | 'height'> {
  largeSrc?: string;
  smallSrc?: string;
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  largeSrc,
  smallSrc,
  alt,
  className,
  ...rest
}) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (!largeSrc || !smallSrc) return null;

  return (
    <Image
      {...rest}
      src={isDesktop ? largeSrc : smallSrc}
      alt={alt ?? 'Preview'}
      className={className}
    />
  );
};

export default ResponsiveImage;
