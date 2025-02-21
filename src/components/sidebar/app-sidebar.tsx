"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppInfo } from "../feature/app-info";
import { SidebarMenuContent } from "./sidebar-menu-content";
import { NavbarUser } from "../navbar/navbar-user";
import { menus } from "@/data/list-menu";
import { user } from "@/data/sidebar-user";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppInfo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Beranda"
                isActive={"/dashboard" === pathname}
                asChild
              >
                <Link href="/dashboard">
                  <Home />
                  <span>Beranda</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarMenuContent menus={menus} />
      </SidebarContent>
      <SidebarFooter>
        <NavbarUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
