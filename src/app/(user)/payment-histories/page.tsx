"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "../../../components/table/data-table";
import { columnsPayment } from "@/components/table/payment-columns";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { paymentData, paymentStatuses } from "@/data/list-data";

const actionButton: ReactElement = (
  <Button className="flex items-center gap-2" asChild>
    <Link href="/payment-confirmations">
      <Plus className="h-4 w-4" />
      <span className="max-sm:sr-only">Tambah</span>
    </Link>
  </Button>
);

export default function PaymentHistoriesPage() {
  return (
    <div className="flex min-h-svh w-full items-start justify-center p-6 md:p-10">
      <div className="w-full lg:max-w-5xl sm:max-w-lg flex-col space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Beranda</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Daftar Pembayaran</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Riwayat Pembayaran</h1>
        <Separator />
        <DataTable
          columns={columnsPayment()}
          data={paymentData}
          searchBy="name"
          filterStatusList={paymentStatuses}
          actionButton={actionButton}
        />
      </div>
    </div>
  );
}
