import { Mail } from 'lucide-react';
import Image from 'next/image';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { PiMapPinAreaLight } from 'react-icons/pi';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { SettingSchema } from '@/schema/setting-schema';

export default function LogoContact({ footer }: { footer: SettingSchema['footer'] }) {
  return (
    <div className="space-y-4 col-span-full  md:col-span-2 2xl:col-span-2 flex flex-col w-full flex-1 items-start">
      <Image
        src={'/english-logo.png'}
        alt="Alghodwa Group Logo"
        width={180}
        height={60}
        quality={85}
        priority={false}
        sizes="(max-width: 768px) 120px, 150px"
        className="mb-4 rtl:hidden"
      />
      <Image
        src={'/arabic-logo.png'}
        alt="Alghodwa Group Logo"
        width={180}
        height={60}
        quality={85}
        priority={false}
        sizes="(max-width: 768px) 120px, 150px"
        className="mb-4 ltr:hidden"
      />

      <div className="flex flex-col 2xl:flex-row 2xl:gap-x-8 gap-y-6 2xl:gap-y-0 justify-start items-start pe-3 xl:pe-6 w-full">
        <AddressInfo company={footer.company} />
        <ContactNumbers contactInfo={footer.contactInfo} />
      </div>
    </div>
  );
}

function AddressInfo({ company }: { company?: SettingSchema['footer']['company'] }) {
  const { details, location } = useFilteredLanguageData(company);
  return (
    <div className="flex flex-col space-y-4 2xl:flex-1 2xl:basis-1/2 w-full">
      <div className="flex flex-col items-start ">
        <PiMapPinAreaLight className="size-6 mt-1 text-primary" />
        <p className="text-sm whitespace-break-spaces ">{location}</p>
      </div>
      <div className="space-y-1">
        <div className="flex flex-col items-start ">
          <Mail className="size-6 text-primary" />
          <div className="text-sm flex flex-col">
            {details.map(({ email }) => (
              <a key={email} href={`mailto:${email}`} className="hover:text-primary">
                {email}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactNumbers({ contactInfo }: { contactInfo: SettingSchema['footer']['contactInfo'] }) {
  return (
    <div className="space-y-3 flex-1 2xl:basis-1/2  xl:pe-16 2xl:pe-0  w-full">
      <div className="divide-y divide-gray-700">
        {contactInfo.map((props, index) => (
          <ContactInfoItem contactInfo={props} key={index} />
        ))}
      </div>
    </div>
  );
}

function ContactInfoItem({
  contactInfo,
}: {
  contactInfo: SettingSchema['footer']['contactInfo'][number];
}) {
  const { number, showCall, showWhatsapp, title } = useFilteredLanguageData(contactInfo);
  return (
    <div className="flex justify-between py-3 first:pt-0 last:pb-0">
      <div className="flex flex-col">
        <h3 className="text-primary font-semibold">{title}</h3>
        <p className="text-sm rtl:text-right ltr:text-left" dir="ltr">
          {number}
        </p>
      </div>
      <div className="flex items-center space-x-4   rtl:flex-row-reverse">
        {showCall && (
          <a
            href={`tel:${number.trim().replaceAll(' ', '').replaceAll('+', '')}`}
            className="flex flex-col items-center hover:text-primary transition-all duration-300"
          >
            <FaPhoneAlt className="size-6 mb-1" />
            <span className="text-xs">Call</span>
          </a>
        )}

        {showWhatsapp && (
          <a
            href={`https://wa.me/${number.trim().replaceAll(' ', '').replaceAll('+', '')}`}
            className="flex flex-col items-center hover:text-primary group transition-all duration-300"
          >
            <FaWhatsapp className="size-6 mb-1 text-green-700 group-hover:text-primary transition-all duration-300" />
            <span className="text-xs">Whatsapp</span>
          </a>
        )}
      </div>
    </div>
  );
}
