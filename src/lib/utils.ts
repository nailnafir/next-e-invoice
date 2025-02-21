import html2canvas from "html2canvas";
import numbro from "numbro";
import jsPDF from "jspdf";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RefObject } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting() {
  const hour = new Date().getHours();
  const greetings = [
    { maxHour: 12, text: "Selamat pagi" },
    { maxHour: 15, text: "Selamat siang" },
    { maxHour: 18, text: "Selamat sore" },
    { maxHour: 24, text: "Selamat malam" },
  ];

  const greeting =
    greetings.find((item) => hour < item.maxHour)?.text || "Halo";
  return `${greeting}`;
}

export function formatTimeDifferenceIndonesian(
  date: string | number | Date
): string {
  return formatDistanceToNow(date, { locale: id, addSuffix: true });
}

export function formatDateIndonesian(date: string | number | Date) {
  return format(date, "PPP", { locale: id });
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("id-ID").format(amount);
}

export function formatIndonesianNumber(amount: number): string {
  numbro.registerLanguage({
    languageTag: "id-ID",
    delimiters: {
      thousands: ".",
      decimal: ",",
    },
    currency: {
      symbol: "Rp",
      position: "prefix",
      code: "IDR",
    },
    abbreviations: {
      thousand: "RB",
      million: "JT",
      billion: "M",
      trillion: "T",
    },
    ordinal: () => "",
    formats: {
      fourDigits: { totalLength: 4, spaceSeparated: false },
      fullWithTwoDecimals: { output: "currency", mantissa: 2 },
      fullWithNoDecimals: { output: "currency", mantissa: 0 },
      fullWithTwoDecimalsNoCurrency: {},
    },
  });

  numbro.setLanguage("id-ID");

  return numbro(amount).formatCurrency({
    currencySymbol: "Rp",
    output: "currency",
    average: true,
    totalLength: 2,
    abbreviations: {
      billion: "M",
      million: "JT",
      thousand: "RB",
      trillion: "T",
    },
  });
}

export async function generatePDF(
  pdfRef: RefObject<HTMLDivElement | null>,
  action: "save" | "view"
) {
  if (!pdfRef.current) return;

  const canvas = await html2canvas(pdfRef.current);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [800, 400],
  });

  pdf.addImage(imgData, "PNG", 0, 0, 800, 400);

  switch (action) {
    case "view":
      window.open(pdf.output("bloburl"), "_blank");
      break;
    case "save":
      pdf.save("receipt.pdf");
      break;
    default:
      break;
  }
}

export function translateTable(key: string): string {
  const translations: Record<string, string> = {
    id: "Kode",
    amount: "Nominal",
    method: "Metode",
    name: "Nama",
    date: "Tanggal",
    address: "Alamat",
    phone: "Telepon",
    email: "Email",
    status: "Status",
    action: "Aksi",
    asc: "Naik",
    desc: "Turun",
    type: "Tipe",
    summary: "Jumlah",
  };

  return translations[key] || key;
}
