import React from "react";
import Image from "next/image";

interface ResponsiveImageProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Image>,
    "src" | "width" | "height"
  > {
  largeSrc: string;
  smallSrc: string;
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  largeSrc,
  smallSrc,
  alt,
  className,
  ...rest
}) => {
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={largeSrc} />

      <Image
        {...rest}
        src={smallSrc}
        alt={alt ?? "Preview"}
        className={className}
      />
    </picture>
  );
};

export default ResponsiveImage;
