'use client';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { useFilteredLanguageData } from '@/hooks/use-filter-lang-data';
import { resolveUrl } from '@/lib/utils';
import type { SettingSchema } from '@/schema/setting-schema';
import type { FileSchema } from '@/schema/upload-schema';

export function TeamMember({ teamMember }: { teamMember: SettingSchema['managementTeam'] }) {
  const { title } = useFilteredLanguageData(teamMember);
  return (
    <article className="mx-auto animate-fade-in">
      <div className="flex flex-col justify-start gap-y-1">
        <h1 className="text-3xl">{title}</h1>
      </div>

      <div className="grid sm:grid-cols-[6fr,6fr] lg:grid-cols-[4fr,4fr,4fr] xl:grid-cols-[3fr,3fr,3fr,3fr] gap-x-8 gap-y-4 mt-8">
        {teamMember.team.map((props) => (
          <MemberItem {...props} key={props.id} />
        ))}
      </div>
    </article>
  );
}

function MemberItem(props: SettingSchema['managementTeam']['team'][number]) {
  const data = useFilteredLanguageData(props);

  const { jobTitle, name, media } = data;
  return (
    <MemberItemDialog {...data} mediaUrl={(media as FileSchema)?.path as string}>
      <div className="group cursor-pointer">
        <div className="relative aspect-[3/4] w-full mb-4  rounded-3xl">
          {media && (
            <Image
              src={resolveUrl((media as FileSchema)?.path)}
              alt={name}
              fill
              className="object-cover grayscale rounded-3xl transition-all duration-300 group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          <div className="absolute bottom-4 ltr:left-4 rtl:right-4 gap-2 z-50">
            <div className="flex flex-col items-start gap-0.5">
              <h1 className="text-base text-white">{name}</h1>
              <h3 className="text-xs text-white">{jobTitle}</h3>
            </div>
          </div>

          <div
            className="absolute inset-0 bg-black/50 
          lg:bg-transparent rtl:lg:bg-gradient-to-l 
           ltr:lg:bg-gradient-to-r lg:from-black/60 lg:via-black/30 lg:to-transparent rounded-3xl"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40
                      to-transparent opacity-0 transition-opacity duration-300 ltr:rounded-bl-3xl rtl:rounded-br-3xl
                      group-hover:opacity-100"
          />

          <div className="absolute bottom-0 rtl:left-0 ltr:right-0 gap-2 bg-background py-2 ltr:rounded-tl-3xl rtl:rounded-tr-3xl px-0">
            <div className="flex items-center gap-3 ps-4 translate-y-4">
              <Button
                className="shadow-md rounded-xl p-0 text-black transition-colors duration-300 bg-white group-hover:bg-primary group-hover:text-white"
                size={'icon'}
              >
                <Plus />
              </Button>
            </div>
            <div className="ltr:hidden bg-background size-[30px] [clip-path:path('M0_0_Q0,30_30,30_L_0_30_Z')] absolute bottom-full left-0"></div>
            <div className="ltr:hidden bg-background size-[30px] [clip-path:path('M0_0_Q0,30,30,30_L_0_30_Z')] absolute bottom-0 left-full "></div>
            <div className="rtl:hidden bg-background size-[29px] [clip-path:path('M0_0_Q0,30_30,30_L_0_30_Z')] absolute bottom-[99.9%] right-0 -rotate-90"></div>
            <div className="rtl:hidden bg-background size-[29px] [clip-path:path('M0_0_Q0,30_30,30_L_0_30_Z')] absolute bottom-0 right-[99.9%] -rotate-90"></div>
          </div>
        </div>
      </div>
    </MemberItemDialog>
  );
}

interface ProfileData {
  name: string;
  summary: string;
  jobTitle: string;
  mediaUrl: string;
  contactNumber: string;
  children: ReactNode;
}

function MemberItemDialog({
  contactNumber,
  jobTitle,
  mediaUrl,
  name,
  summary,
  children,
}: ProfileData) {
  const t = useTranslations();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-screen-lg ">
        <div className="grid md:grid-cols-[1fr,1.5fr] gap-6 p-6">
          <div className="relative aspect-square md:aspect-auto">
            <Image
              src={mediaUrl || '/placeholder.svg'}
              alt={name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-4xl font-bold tracking-tight rtl:text-right">
                {name}
              </DialogTitle>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2">
                <span className="text-primary font-medium">{jobTitle}</span>
                <span className="text-muted-foreground" dir="ltr">
                  {contactNumber}
                </span>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight">
                {t('Professional Overview')}
              </h3>
              <div className="text-muted-foreground space-y-4">
                <p>{summary}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
