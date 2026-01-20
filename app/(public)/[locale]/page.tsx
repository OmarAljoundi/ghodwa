import type { Metadata } from 'next';
import { BrandSection } from '@/components/home/brand-section';
import HeroSection from '@/components/home/hero-section';
import { NewSection } from '@/components/home/new-section';
import { SubHeroSection } from '@/components/home/sub-hero-section';
import { WelcomeSection } from '@/components/home/welcome-section';
import { BlurFade } from '@/components/ui/blur-fade';
import { getBrands, getNews, getServices, getSettings } from '@/query';
import { generatePageBilingualSeo } from './generate-bilingual-seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'ar' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { seoStaticPagesHome } = await getSettings();
  const dictionary = generatePageBilingualSeo(seoStaticPagesHome?.seo ?? {})[locale];

  return dictionary;
}

export default function Home() {
  return (
    <div className="lg:space-y-16 space-y-6">
      <BlurFade inView>
        <HeroSection dataPromise={getSettings()} />
      </BlurFade>
      <BlurFade inView>
        <BrandSection dataPromise={getBrands()} dataPromiseSettings={getSettings()} />
      </BlurFade>
      <BlurFade inView>
        <WelcomeSection dataPromise={getSettings()} dataPromiseServices={getServices()} />
      </BlurFade>
      <BlurFade inView>
        <SubHeroSection dataPromise={getSettings()} />
      </BlurFade>
      <BlurFade inView>
        <NewSection dataPromise={getSettings()} dataPromiseNews={getNews()} />
      </BlurFade>
    </div>
  );
}
