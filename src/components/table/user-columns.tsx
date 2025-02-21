"use client";

import { cn, translateTable } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash } from "lucide-react";
import { SignUpForm } from "../form/sign-up-form";
import { Separator } from "../ui/separator";
import SortableHeader from "./sortable-header";

export const columnsUser: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortableHeader<User> label="name" column={column} />;
    },
  },
  {
    accessorKey: "address",
    header: translateTable("address"),
  },
  {
    accessorKey: "phone",
    header: translateTable("phone"),
  },
  {
    accessorKey: "email",
    header: translateTable("email"),
  },
  {
    accessorKey: "status",
    header: translateTable("status"),
    cell: ({ row }) => {
      const user = row.original;

      const statusColors: Record<string, { bg: string; text: string }> = {
        pengelola: { bg: "bg-green-300", text: "text-green-800" },
        pemohon: { bg: "bg-red-300", text: "text-red-800" },
      };

      const { bg, text } = statusColors[user.status] || {
        bg: "bg-gray-300",
        text: "text-gray-800",
      };

      return (
        <Badge variant="outline" className={cn(bg, "pt-0")}>
          <span className={cn(text)}>{user.status}</span>
        </Badge>
      );
    },
    filterFn: (row, id, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "action",
    header: translateTable("action"),
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex flex-row gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-sm:max-w-sm lg:h-[calc(100vh-80px)]">
              <DialogHeader className="max-sm:text-start px-2">
                <DialogTitle>Ubah Data</DialogTitle>
                <DialogDescription>
                  Pastikan isi data dibawah dengan benar.
                </DialogDescription>
                <Separator />
              </DialogHeader>
              <div className="overflow-y-scroll p-2">
                <SignUpForm
                  asCard={false}
                  showSignInButton={false}
                  isEditForm={true}
                  userData={user}
                />
              </div>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button>
                <Trash className="w-4 h-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-sm:max-w-sm">
              <AlertDialogHeader className="max-sm:text-start">
                <AlertDialogTitle>Konfirmasi</AlertDialogTitle>
                <AlertDialogDescription>
                  <span className="text-red-500 font-bold">{user.name}</span>{" "}
                  akan dihapus dari sistem dan tindakan ini tidak dapat
                  dikembalikan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="max-sm:flex max-sm:flex-row max-sm:items-cente max-sm:flex-row-reverser">
                <AlertDialogCancel>Kembali</AlertDialogCancel>
                <AlertDialogAction>Hapus</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
