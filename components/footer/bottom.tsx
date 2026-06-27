'use client';

import { useTranslations } from 'next-intl';
import type { JSX } from 'react';
import { CiMail } from 'react-icons/ci';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import type { SettingSchema } from '@/schema/setting-schema';

type SocialIconKey =
  | 'Youtube'
  | 'Facebook'
  | 'LinkedIn'
  | 'Instagram'
  | 'X'
  | 'Email'
  | 'Whatsapp'
  | 'Phone';

const CONTACT_CHANNELS = ['Whatsapp', 'Phone', 'Email'] as const;

const socialIcons: Record<SocialIconKey, JSX.Element> = {
  Youtube: <FaYoutube className="size-5 text-white" />,
  Facebook: <FaFacebook className="size-5 text-white" />,
  LinkedIn: <FaLinkedin className="size-5 text-white" />,
  Instagram: <FaInstagram className="size-5 text-white" />,
  X: <FaTwitter className="size-5 text-white" />,
  Email: <CiMail className="size-5 text-white" />,
  Whatsapp: <FaWhatsapp className="size-5 text-white" />,
  Phone: <FaPhoneAlt className="size-5 text-white" />,
};

interface BottomProps {
  socialMediaContact?: SettingSchema['socialMediaContact'];
}

export function Bottom({ socialMediaContact }: BottomProps) {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const socialLinks = socialMediaContact?.items?.filter(
    (x) => !CONTACT_CHANNELS.includes(x.channel as any),
  );

  if (!socialMediaContact?.items?.length) {
    return null;
  }

  return (
    <div className="lg:flex-row items-start justify-start gap-x-6 xl:gap-x-12 flex flex-col-reverse gap-y-4 lg:gap-y-0">
      <div className="lg:mt-8 lg:flex-row justify-start gap-6 items-center">
        <p className="text-sm text-gray-400">
          © {t('Copyright')} {currentYear} {t('Alghodwa Group')}
        </p>
      </div>

      {socialLinks && socialLinks?.length > 0 && (
        <div className="mt-4 flex-1">
          <span className="text-primary">{t('Follow us:')}</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {socialLinks.map(({ channel, url, id }) => {
              if (!url) return null;

              const icon = socialIcons[channel as SocialIconKey];

              return (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-orange-500 border rounded-lg transition-all duration-300"
                  aria-label={channel}
                >
                  {icon}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
