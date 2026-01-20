import type { SettingSchema } from '@/schema/setting-schema';
import { BlurFade } from '../ui/blur-fade';
import { ContactUsForm } from './form';
import { Offices } from './offices';
import { WorkingHours } from './working-hours';

export default function ContactUsContainer({
  offices,
  workingHours,
}: {
  workingHours: SettingSchema['workingHours'];
  offices: SettingSchema['offices'];
}) {
  return (
    <div className="flex flex-col  lg:grid  lg:grid-cols-[4fr,8fr] gap-x-8 gap-y-16">
      <WorkingHours className="order-2 lg:order-1" workingHours={workingHours} />
      <BlurFade inView direction="right" delay={0.4} className="order-1 lg:order-2">
        <ContactUsForm />
      </BlurFade>
      <BlurFade inView direction="right" delay={0.6} className="col-span-full order-3">
        <Offices offices={offices} />
      </BlurFade>
    </div>
  );
}
