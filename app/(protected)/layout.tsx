import { SidebarMenuLayout } from "@/components/admin-panel/sidebar-menu-layout";
import { TooltipProvider } from "@/providers/tooltip-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { FontProvider } from "@/providers/font-provider";
import ThemeProvider from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Ghodwa CMS",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
    </>
  );
}
