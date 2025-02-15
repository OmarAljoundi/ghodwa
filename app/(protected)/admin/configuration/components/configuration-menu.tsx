"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { House, ListEnd, Menu } from "lucide-react";
import { ReactNode } from "react";

export const menuItems = {
  Home: {
    icon: House,
    value: "Home",
  },
  Menu: {
    icon: Menu,
    value: "Menu",
  },
  Footer: {
    icon: ListEnd,
    value: "Footer",
  },
};

export function ConfigurationMenu({ children }: { children: ReactNode }) {
  return (
    <Tabs
      defaultValue={menuItems.Home.value}
      orientation="vertical"
      className="flex w-full gap-6 items-start"
    >
      <TabsList className="flex-col gap-1   px-1 py-0 text-foreground flex-grow-0  bg-sidebar rounded-lg h-full p-6">
        {Object.entries(menuItems).map(([key, o]) => (
          <TabsTrigger
            key={key}
            value={key}
            className="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
          >
            <o.icon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            {key}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="grow rounded-lg  text-start">{children}</div>
    </Tabs>
  );
}
