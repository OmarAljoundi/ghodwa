import React, { JSX } from "react";
import { BlurFade } from "../ui/blur-fade";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { SettingSchema } from "@/schema/setting-schema";
import { Mail } from "lucide-react";
import { FiPhone } from "react-icons/fi";
type SocialIconKey = "Email" | "Whatsapp" | "Phone";

const socialIcons: Record<SocialIconKey, JSX.Element> = {
  Email: <Mail className="size-6 text-primary" />,
  Whatsapp: <FaWhatsapp className="size-6 text-green-700" />,
  Phone: <FiPhone className="size-6 " />,
};

export function ContactSales({
  className,
  socialMediaContact,
}: {
  className: string;
  socialMediaContact?: SettingSchema["socialMediaContact"];
}) {
  const { t } = useTranslation("common");

  const validChannels = ["Whatsapp", "Phone", "Email"] as const;

  return (
    <BlurFade delay={0.5} className={cn(className)}>
      {socialMediaContact?.items && socialMediaContact.items.length > 0 && (
        <React.Fragment>
          <h3 className="font-light text-black text-lg">
            {t("Contact Sales")}
          </h3>
          <div className="flex justify-start gap-x-6">
            {socialMediaContact.items
              .filter((x) => validChannels.includes(x.channel as SocialIconKey))
              .map(({ channel, url, id }) => {
                if (!url) return null;

                const icon = socialIcons[channel as SocialIconKey];

                return (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={url}
                    className="flex flex-col gap-1 items-center justify-center"
                    key={id}
                  >
                    {icon}
                    <span className="text-[9px]">
                      {channel === "Phone" ? "Call" : channel}
                    </span>
                  </a>
                );
              })}
          </div>
        </React.Fragment>
      )}
    </BlurFade>
  );
}
