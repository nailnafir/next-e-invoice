"use client";

import { DataTable } from "@/components/table/data-table";
import { columnsPayment } from "@/components/table/payment-columns";
import { paymentData, paymentStatuses } from "@/data/list-data";

export default function PaymentsPage() {
  const isAdmin = true;

  return (
    <DataTable
      searchBy="name"
      columns={columnsPayment(isAdmin)}
      data={paymentData}
      filterStatusList={paymentStatuses}
    />
  );
}
