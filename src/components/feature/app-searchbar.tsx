"use client";

import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { menus } from "@/data/list-menu";
import { listNotification } from "@/data/list-notification";
import { listTheme } from "@/data/list-theme";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function AppSearchbar() {
  const [open, setOpen] = useState(false);

  const { setTheme } = useTheme();

  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const menuItem = menus.flatMap((menu) =>
    menu.items.map((item) => ({
      label: item.title,
      icon: item.icon,
      action: item.url ? () => router.push(item.url as string) : undefined,
    }))
  );

  const subMenuItem = menus.flatMap((menu) =>
    menu.items.flatMap((subMenu) =>
      subMenu.subItems?.map((subItem) => ({
        label: subItem.title,
        icon: subItem.icon,
        action: () => router.push(subItem.url),
      }))
    )
  );

  const notificationItem = listNotification.map((item, index) => ({
    label: item.title,
    icon: Bell,
    action: () => router.push(`/notification/${index}`),
  }));

  const themeItem = listTheme.map((item) => ({
    label: item.label,
    icon: item.icon,
    action: () => setTheme(item.name),
  }));

  const searchList = [
    {
      group: "Menu",
      data: menuItem,
    },
    {
      group: "Sub Menu",
      data: subMenuItem,
    },
    {
      group: "Notifikasi",
      data: notificationItem,
    },
    {
      group: "Tema",
      data: themeItem,
    },
  ];

  return (
    <div className="relative w-full">
      <div className="relative w-full" onClick={() => setOpen(true)}>
        <Search className="absolute top-1/2 left-4 -translate-y-1/2 h-4 w-4" />
        <button className="flex h-10 w-full rounded-md border border-input bg-background px-11 py-2 text-base text-muted-foreground md:text-sm">
          Cari....
        </button>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 max-sm:hidden">
          <kbd className="text-xs bg-primary/10 rounded-sm py-1 px-2">
            ⌘ + K
          </kbd>
          <span className="text-sm mx-2">atau</span>
          <kbd className="text-xs bg-primary/10 rounded-sm py-1 px-2">
            ctrl + K
          </kbd>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Cari sesuatu...." />
        <CommandList>
          <CommandEmpty>Hasil tidak ditemukan.</CommandEmpty>
          {searchList.map((searchItem, indexSearch) => (
            <CommandGroup
              key={indexSearch + searchItem.group}
              heading={searchItem.group}
            >
              {searchItem.data.map(
                (item, indexData) =>
                  item &&
                  item.action && (
                    <CommandItem key={indexData} onSelect={item.action}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </CommandItem>
                  )
              )}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
