"use client";

import {
  cn,
  formatDateIndonesian,
  formatRupiah,
  translateTable,
} from "@/lib/utils";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Payment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Edit, Eye, Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import SortableHeader from "./sortable-header";
import CreateInvoiceForm from "../form/create-invoice-form";
import Image from "next/image";

export const columnsPayment = (
  isAdmin: boolean = false,
): ColumnDef<Payment>[] => {
  const baseColumnsPayment: ColumnDef<Payment>[] = [
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
      accessorKey: "id",
      header: translateTable("id"),
    },
    {
      accessorKey: "name",
      header: translateTable("name"),
    },
    {
      accessorKey: "amount",
      header: translateTable("amount"),
      cell: ({ row }) => {
        const payments = row.original;

        return formatRupiah(payments.amount);
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return <SortableHeader<Payment> label="date" column={column} />;
      },
      cell: ({ row }) => {
        const payments = row.original;

        return formatDateIndonesian(payments.date);
      },
    },
    {
      accessorKey: "status",
      header: translateTable("status"),
      cell: ({ row }) => {
        const payments = row.original;

        const statusColors: Record<string, { bg: string; text: string }> = {
          disetujui: { bg: "bg-green-300", text: "text-green-800" },
          ditolak: { bg: "bg-red-300", text: "text-red-800" },
          ditunda: { bg: "bg-yellow-300", text: "text-yellow-800" },
        };

        const { bg, text } = statusColors[payments.status] || {
          bg: "bg-gray-300",
          text: "text-gray-800",
        };

        return (
          <Badge variant="outline" className={cn(bg, "pt-0")}>
            <span className={cn(text)}>{payments.status}</span>
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
        const payment = row.original;

        return (
          <div className="flex flex-row gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button>
                  <Eye className="w-4 h-4" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-sm:max-w-sm max-w-5xl">
                <AlertDialogHeader className="max-sm:text-start">
                  <AlertDialogTitle>Detail Pembayaran</AlertDialogTitle>
                  <AlertDialogDescription>#{payment.id}</AlertDialogDescription>
                </AlertDialogHeader>
                <Separator />
                <div className="grid grid-cols-2 max-sm:grid-cols-1 lg:space-x-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 items-center space-x-2">
                      <div className="flex flex-col items-start basis-1/2">
                        <p className="font-bold">Pengirim:</p>
                        <p>{payment.name}</p>
                        <p>{payment.accountNumber}</p>
                      </div>
                      <div className="flex flex-col items-start basis-1/2">
                        <p className="font-bold">Penerima:</p>
                        <p>DPW PATELKI JABAR</p>
                        <p>14045 14022 55</p>
                      </div>
                    </div>
                    <Table className="border">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold text-primary">
                            Deskripsi
                          </TableHead>
                          <TableHead className="font-bold text-primary">
                            Metode
                          </TableHead>
                          <TableHead className="font-bold text-primary">
                            Nominal
                          </TableHead>
                          <TableHead className="font-bold text-primary">
                            Tanggal
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>{formatRupiah(payment.amount)}</TableCell>
                          <TableCell>
                            {formatDateIndonesian(payment.date)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="max-sm:my-2 flex">
                    <Separator
                      orientation="vertical"
                      className="max-sm:hidden mr-4"
                    />
                    <Image
                      alt="image"
                      className="aspect-auto w-full rounded object-cover"
                      height="300"
                      width="300"
                      src="/assets/images/blank-receipt.png"
                    />
                  </div>
                </div>
                <Separator />
                <AlertDialogFooter>
                  {isAdmin ? (
                    <>
                      {payment.status === "ditunda" ? (
                        <>
                          <AlertDialogCancel>Tolak</AlertDialogCancel>
                          <AlertDialogAction>Terima</AlertDialogAction>
                        </>
                      ) : (
                        <>
                          <AlertDialogCancel>Kembali</AlertDialogCancel>
                          {payment.status === "disetujui" && (
                            <AlertDialogAction>Cetak Kuitansi</AlertDialogAction>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <p className="text-xs sm:justify-start">
                      Jika ada kesalahan data, harap hubungi pengelola.
                    </p>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {isAdmin ? (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button>
                      <Edit className="w-4 h-4" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-sm:max-w-sm h-[calc(100vh-80px)] lg:max-w-5xl">
                    <AlertDialogHeader className="max-sm:text-start px-2">
                      <AlertDialogTitle>Ubah Data</AlertDialogTitle>
                      <AlertDialogDescription>
                        Pastikan isi data dibawah dengan benar.
                      </AlertDialogDescription>
                      <Separator />
                    </AlertDialogHeader>
                    <div className="overflow-y-scroll p-2">
                      <CreateInvoiceForm
                        showInfo={false}
                        asCard={false}
                        isEditForm={true}
                        paymentData={payment}
                      />
                    </div>
                    <AlertDialogFooter className="max-sm:flex max-sm:flex-row max-sm:items-cente max-sm:flex-row-reverser">
                      <AlertDialogCancel>Kembali</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
                        <span className="text-red-500 font-bold">
                          {payment.name}
                        </span>{" "}
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
              </>
            ) : (
              <button>
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return baseColumnsPayment;
};
