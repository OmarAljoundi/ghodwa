import Image from 'next/image';
import type React from 'react';

interface ResponsiveImageProps extends Omit<React.ComponentProps<typeof Image>, 'src'> {
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
  const supabaseImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/`;

  if (!largeSrc || !smallSrc) return null;

  return (
    <picture>
      <source
        media="(min-width: 1024px)"
        srcSet={`${supabaseImageUrl}${largeSrc}`}
      />
      <Image
        src={`${supabaseImageUrl}${smallSrc}`}
        alt={alt}
        className={className}
        {...rest}
      />
    </picture>
  );
};

export default ResponsiveImage;