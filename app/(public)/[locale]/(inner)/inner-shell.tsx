import type { ReactNode } from 'react';
import InnerPageTitle from './inner-page-title';

/**
 * Shared inner-page shell: the hero band + the page container.
 *
 * The Security & Defence palette (`.sd-theme`) is applied one level up, on the
 * page <main> (see MainArea), so the beige background covers the whole body-level
 * content area — not just this section. The hero band picks up the SD gradient
 * from `.sd-theme .inner-gradient-background` via that ancestor scope.
 */
export function InnerShell({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="inner-gradient-background h-48 lg:h-80 lg:rounded-3xl">
        <InnerPageTitle />
      </div>
      <main className="container mx-auto mt-8 mb-6 lg:mb-12">{children}</main>
    </div>
  );
}
