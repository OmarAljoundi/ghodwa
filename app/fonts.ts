import { Mona_Sans, Noto_Kufi_Arabic, Noto_Sans_Arabic } from 'next/font/google';

const notoSans = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-arabic-body',
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-arabic-header',
});

const monaSans = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-english',
});

export { notoSans, notoKufiArabic, monaSans };
