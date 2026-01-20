'use client';

import type { TooltipProviderProps } from '@radix-ui/react-tooltip';
import { TooltipProvider as CustomTooltipProvider } from '@/components/ui/tooltip';

export function TooltipProvider({ children, ...props }: TooltipProviderProps) {
  return (
    <CustomTooltipProvider {...props} delayDuration={0}>
      {children}
    </CustomTooltipProvider>
  );
}
