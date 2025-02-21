"use client";

import { SignUpForm } from "@/components/form/sign-up-form";
import { DataTable } from "@/components/table/data-table";
import { columnsUser } from "@/components/table/user-columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { userData, userStatuses } from "@/data/list-data";
import { Plus } from "lucide-react";
import { ReactElement } from "react";

const actionButton: ReactElement = (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        <span className="max-sm:sr-only">Tambah</span>
      </Button>
    </DialogTrigger>
    <DialogContent className="max-sm:max-w-sm lg:h-[calc(100vh-80px)]">
      <DialogHeader className="max-sm:text-start">
        <DialogTitle>Tambah</DialogTitle>
        <DialogDescription>
          Pastikan isi data dibawah dengan benar.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-y-scroll p-2">
        <SignUpForm asCard={false} showSignInButton={false} />
      </div>
    </DialogContent>
  </Dialog>
);

export default function UsersPage() {
  return (
    <DataTable
      columns={columnsUser}
      data={userData}
      searchBy="name"
      filterStatusList={userStatuses}
      actionButton={actionButton}
    />
  );
}
