import { Command } from "lucide-react";

export default function AppLogo() {
  return (
    <>
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
        <Command className="size-4 text-background" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">e-Kuitansi</span>
        <span className="truncate text-xs">DPW PATELKI JABAR</span>
      </div>
    </>
  );
}
