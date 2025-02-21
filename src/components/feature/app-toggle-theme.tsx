"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { listTheme } from "@/data/list-theme";

export default function AppToggleTheme() {
  const [open, setOpen] = useState<boolean>(false);
  const { setTheme } = useTheme();

  return (
    <DropdownMenu open={open} modal={false}>
      <DropdownMenuTrigger asChild onClick={() => setOpen((prev) => !prev)}>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onInteractOutside={() => setOpen(false)}>
        {listTheme.map((theme, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => setTheme(theme.name)}
          >
            {theme.icon && <theme.icon className="w-4 h-4" />}
            <span>{theme.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
