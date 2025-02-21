import "../../globals.css";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppToggleTheme from "@/components/feature/app-toggle-theme";
import BreadcrumbPath from "@/components/feature/breadcrumb-path";
import AppNotification from "@/components/feature/app-notification";
import AppSearchbar from "@/components/feature/app-searchbar";

export const metadata: Metadata = {
  title: "Kelola",
  description: "Mengelola data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 border-b z-10 bg-background/50 backdrop-blur">
          <div className="flex w-full items-center space-x-6 p-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-8" />
            <AppSearchbar />
            <Separator orientation="vertical" className="h-8" />
            <div className="flex space-x-2 pl-2">
              <AppNotification />
              <AppToggleTheme />
            </div>
          </div>
        </header>
        <BreadcrumbPath />
        <div className="flex flex-col p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
