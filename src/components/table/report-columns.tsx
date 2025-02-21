"use client";

import { cn, translateTable } from "@/lib/utils";
import { Report } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortableHeader from "./sortable-header";
import { Badge } from "../ui/badge";

export const columnsReport = (type?: string): ColumnDef<Report>[] => {
  const baseColumnsReport: ColumnDef<Report>[] = [
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
      accessorKey: "type",
      header: translateTable("type"),
      cell: ({ row }) => {
        const report = row.original;

        return <span>{report.type}</span>;
      },
    },
    {
      accessorKey: "status",
      header: translateTable("status"),
      cell: ({ row }) => {
        const report = row.original;

        const statusColors: Record<string, { bg: string; text: string }> = {
          pengelola: { bg: "bg-green-300", text: "text-green-800" },
          pemohon: { bg: "bg-red-300", text: "text-red-800" },
          disetujui: { bg: "bg-green-300", text: "text-green-800" },
          ditolak: { bg: "bg-red-300", text: "text-red-800" },
          ditunda: { bg: "bg-yellow-300", text: "text-yellow-800" },
        };

        const { bg, text } = statusColors[report.status] || {
          bg: "bg-gray-300",
          text: "text-gray-800",
        };

        return (
          <Badge variant="outline" className={cn(bg, "pt-0")}>
            <span className={cn(text)}>{report.status}</span>
          </Badge>
        );
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return <SortableHeader<Report> label="Total" column={column} />;
      },
      cell: ({ row }) => {
        const report = row.original;

        return <span>{report.total} data</span>;
      },
    },
  ];

  if (type === "payment") {
    baseColumnsReport.push({
      accessorKey: "totalAmount",
      header: `Total ${translateTable("amount")}`,
      cell: ({ row }) => {
        const report = row.original;
        return <span>{report.totalAmount}</span>;
      },
    });
  }

  return baseColumnsReport;
};
