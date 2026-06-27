import { Mail } from 'lucide-react';
import Image from 'next/image';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { PiMapPinAreaLight } from 'react-icons/pi';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import type { SettingSchema } from '@/schema/setting-schema';

export default function LogoContact({ footer }: { footer: SettingSchema['footer'] }) {
  // Two real grid cells (logo+address, then phones) so each fills one track of
  // the footer's 4-col grid and every column gap is the grid's uniform `gap-6`.
  return (
    <>
      <div className="space-y-4 col-span-full md:col-span-1 lg:w-auto flex flex-col w-full items-start">
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
        <AddressInfo company={footer.company} />
      </div>
      <div className="col-span-full md:col-span-1 lg:w-auto w-full">
        <ContactNumbers contactInfo={footer.contactInfo} />
      </div>
    </>
  );
}

function AddressInfo({ company }: { company?: SettingSchema['footer']['company'] }) {
  const { details, location } = useFilteredLanguageData(company);
  return (
    <div className="flex flex-col space-y-4 w-full">
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
    <div className="space-y-3 w-full">
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
    <div className="flex items-center justify-between gap-x-6 py-3 first:pt-0 last:pb-0 max-w-[280px]">
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
