import Image from 'next/image';
import { BlurFade } from '../ui/blur-fade';

export function ModelLogo({
  logo,
  name,
  width,
  height,
  className,
}: {
  logo: string;
  name: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <BlurFade direction={'up'} className={className}>
      <Image
        src={logo}
        alt={name}
        width={width}
        height={height}
        quality={100}
        className="object-contain"
      />
    </BlurFade>
  );
}
