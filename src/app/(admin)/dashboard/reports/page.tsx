"use client";

import { DataTable } from "@/components/table/data-table";
import { columnsReport } from "@/components/table/report-columns";
import { Report } from "@/types";
import { userData, paymentData } from "@/data/list-data";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { ReactElement } from "react";

const actionButton: ReactElement = (
  <Button className="flex items-center gap-2">
    <Share className="h-4 w-4" />
    <span className="max-sm:sr-only">Ekspor PDF</span>
  </Button>
);

export default function ReportsPage() {
  const summaryList: Report[] = [
    {
      type: "Pengguna",
      status: "pengelola",
      total: userData.filter((user) => user.status === "pengelola").length,
    },
    {
      type: "Pengguna",
      status: "pemohon",
      total: userData.filter((user) => user.status === "pemohon").length,
    },
    {
      type: "Pembayaran",
      status: "disetujui",
      total: paymentData.filter((payment) => payment.status === "disetujui")
        .length,
    },
    {
      type: "Pembayaran",
      status: "ditunda",
      total: paymentData.filter((payment) => payment.status === "ditunda")
        .length,
    },
    {
      type: "Pembayaran",
      status: "ditolak",
      total: paymentData.filter((payment) => payment.status === "ditolak")
        .length,
    },
  ];

  const summaryCounter: ReactElement = (
    <div className="text-sm text-muted-foreground mt-2">
      <p>{userData.length} Total Pengguna</p>
      <p>{paymentData.length} Total Pembayaran</p>
    </div>
  );

  return (
    <>
      <DataTable
        columns={columnsReport()}
        data={summaryList}
        actionButton={actionButton}
        searchBy="type"
        summaryCounter={summaryCounter}
      />
    </>
  );
}
