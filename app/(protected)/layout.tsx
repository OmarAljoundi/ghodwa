import type { Metadata } from 'next';
import { SidebarMenuLayout } from '@/components/admin-panel/sidebar-menu-layout';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { FontProvider } from '@/providers/font-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';
import ThemeProvider from '@/providers/theme-provider';
import { TooltipProvider } from '@/providers/tooltip-provider';
import { monaSans, notoKufiArabic, notoSans } from '../fonts';
import "../globals.css"
export const metadata: Metadata = {
  title: 'Ghodwa CMS',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={"en"} dir={"ltr"}>
      <body className={cn(notoKufiArabic.variable, notoSans.variable, monaSans.variable)}>
        <Toaster richColors />
        <ReactQueryProvider>
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarMenuLayout>
                <FontProvider>{children}</FontProvider>
              </SidebarMenuLayout>
            </ThemeProvider>
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
