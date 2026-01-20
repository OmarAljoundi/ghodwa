import { type ReactNode, useId } from 'react';
import { Label } from './label';
import { Switch } from './switch';

export function CheckboxCard({
  title,
  checked,
  onCheckedChange,
  desc,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  title: string;
  desc: string | ReactNode;
}) {
  const id = useId();
  return (
    <Label
      htmlFor={`${id}-${checked}`}
      className="relative h-full  flex w-full items-start gap-2 duration-300 transition-all rounded-lg border border-border 
      p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:bg-input has-[[data-state=checked]]:border-brand-primary-500/20"
    >
      <div className="min-w-8">
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          id={`${id}-${checked}`}
          aria-describedby={`${id}-${checked}-${desc}`}
          className="order-1 after:absolute after:inset-0 "
        />
      </div>
      <div className="grid grow gap-2">
        <p>{title} </p>
        <p id={`${id}-${checked}-${desc}`} className="text-xs text-muted-foreground">
          {desc}
        </p>
      </div>
    </Label>
  );
}
