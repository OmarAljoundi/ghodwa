"use client";
import { ChevronRight, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import React, { ReactNode, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { authClient } from "@/auth-client";
import { RiAlignItemRightFill } from "react-icons/ri";
import { SiGoogleforms } from "react-icons/si";
import { MdOutlinePermMedia } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";
import { GrDocumentConfig } from "react-icons/gr";
import { IconType } from "react-icons/lib";

const data = {
  user: {
    name: "admin",
    email: "admin@rafanasiri.com",
  },
  navMain: [
    {
      url: "/admin/collections",
      title: "Collections",
      icon: RiAlignItemRightFill,
      items: [
        {
          url: "/admin/collections/brands",
          title: "Brand",
        },
        {
          url: "/admin/collections/categories",
          title: "Category",
        },
        {
          url: "/admin/collections/models",
          title: "Model",
        },
      ],
    },

    {
      url: "/admin/user-forms",
      title: "User forms",
      icon: SiGoogleforms,
      items: [
        {
          url: "/admin/user-forms/contact-us",
          title: "Contact Us",
        },
      ],
    },
    {
      url: "/admin/services",
      title: "Service",
      icon: MdMiscellaneousServices,
    },
    {
      url: "/admin/media-center",
      title: "Media Center",
      icon: MdOutlinePermMedia,
      items: [
        {
          url: "/admin/media-center/news",
          title: "News",
        },
      ],
    },

    {
      url: "/admin/configuration",
      title: "Configuration",
      icon: GrDocumentConfig,
    },
  ],
};

export function SidebarMenuLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const route = useRouter();
  const isActive = useCallback(
    (url: string) => {
      return pathname.startsWith(url);
    },
    [pathname]
  );

  const menuItem = useCallback(
    (item: {
      title: string;
      url: string;
      icon: IconType;
      items?: { title: string; url: string }[];
    }) => {
      if (item.items && item.items.length > 0) {
        return (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isActive(item.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive(subItem.url)}
                      >
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      }
      return (
        <Link href={item.url}>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={isActive(item.url)}
            >
              {item.icon && <item.icon />}

              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>
      );
    },
    [isActive]
  );

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/admin" className="flex">
                  <div>
                    <Image
                      src={"/logo.png"}
                      className={cn("block dark:hidden")}
                      width={150}
                      height={50}
                      alt="rafa-logo-dark"
                    />
                    <Image
                      src={"/logo.png"}
                      className={cn("hidden dark:block")}
                      width={150}
                      height={50}
                      alt="rafa-logo-light"
                    />
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <React.Fragment key={`${item.title}-${item.url}`}>
                  {menuItem(item)}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage alt={data.user.name} />
                      <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage alt={data.user.name} />
                        <AvatarFallback className="rounded-lg">
                          AD
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {data.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {data.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={async () => {
                      await authClient.signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            route.refresh();
                            route.replace("/login");
                            route.refresh();
                          },
                        },
                      });
                    }}
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
