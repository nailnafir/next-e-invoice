"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, LogIn, User, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function AuthenticationInfo() {
  const isAuthenticated = false;
  
  const [open, setOpen] = useState<boolean>(false);

  return isAuthenticated ? (
    <DropdownMenu open={open} modal={false}>
      <DropdownMenuTrigger asChild onClick={() => setOpen((prev) => !prev)}>
        <Button variant="outline" className="h-10 max-sm:w-10 md:px-4 md:py-2">
          <User />
          <div className="font-bold max-sm:sr-only">Firdaus</div>
          <ChevronDown className="max-sm:sr-only" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onInteractOutside={() => setOpen(false)}>
        <div className="font-bold md:sr-only">
          <DropdownMenuItem>Nailul Firdaus</DropdownMenuItem>
          <DropdownMenuSeparator />
        </div>
        <DropdownMenuItem>Pengaturan</DropdownMenuItem>
        <DropdownMenuItem>Bantuan</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-red-500 hover:bg-red-500 focus:text-white p-0">
          <button type="submit" className="w-full h-full p-2 text-start">
            Keluar
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex flex-row gap-2">
      <Button variant="outline" className="h-10 max-sm:w-10 sm:px-4 sm:py-2">
        <LogIn />
        <span className="max-sm:sr-only">Masuk</span>
      </Button>
      <Button className="h-10 max-sm:w-10 sm:px-4 sm:py-2">
        <UserPlus />
        <span className="max-sm:sr-only">Daftar</span>
      </Button>
    </div>
  );
}
