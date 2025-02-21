import "../globals.css";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import AppNotification from "@/components/feature/app-notification";
import AppToggleTheme from "@/components/feature/app-toggle-theme";
import AuthenticationInfo from "@/components/feature/authentication-info";
import AppLogo from "@/components/feature/app-logo";

export const metadata: Metadata = {
  title: "Pengguna",
  description: "Mengelola pembayaran",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-0 border-b z-10 bg-background/50 backdrop-blur">
        <div className="flex w-full items-center justify-between p-4">
          <div className="flex gap-2 items-center">
            <AppLogo />
          </div>
          <div className="flex items-center">
            <div className="flex flex-row items-center">
              <div className="flex gap-2 items-center">
                <AppNotification />
                <AppToggleTheme />
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="h-8 mx-6 max-sm:mx-2"
            />
            <AuthenticationInfo />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
