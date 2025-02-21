"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "../ui/button";
import { formatDateIndonesian, formatRupiah, generatePDF } from "@/lib/utils";

export default function ApplicantReceipt() {
  const pdfRef = useRef<HTMLDivElement>(null);

  const dataApplicant = {
    name: "Nailul Firdaus",
    address: "Jalan Sesama RT06 RW09",
    description: "Pembayaran Rumah Sultan Istimewa",
    nominal: 800000000000,
    spellOut: "Delapan Ratus Miliar Rupiah",
    transactionDate: "2025-01-18",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div id="receipt" ref={pdfRef} className="relative w-[800px] h-[400px]">
        <Image src="/assets/images/blank-receipt.png" alt="receipt" fill />
        <div className="absolute inset-0 overflow-hidden grid grid-cols-6 gap-6 opacity-10 pointer-events-none">
          {Array.from({ length: 300 }).map((_, index) => (
            <p
              key={index}
              className="text-black font-bold text-xl rotate-[-30deg] whitespace-nowrap"
            >
              DOKUMEN ASLI
            </p>
          ))}
        </div>
        <p className="absolute top-[78px] left-[626px] text-gray-800 font-semibold text-sm">
          {formatDateIndonesian(dataApplicant.transactionDate)}
        </p>
        <p className="absolute top-[78px] left-[230px] text-gray-800 font-semibold text-sm">
          {dataApplicant.name}
        </p>
        <p className="absolute top-[124px] left-[230px] text-gray-800 font-semibold text-sm max-w-[30ch] break-words leading-3">
          {dataApplicant.address}
        </p>
        <p className="absolute top-[164px] left-[230px] text-gray-800 font-semibold text-sm">
          {formatRupiah(dataApplicant.nominal)}
        </p>
        <p className="absolute top-[206px] left-[230px] text-gray-800 font-semibold text-sm">
          {dataApplicant.description}
        </p>
        <p className="absolute top-[250px] left-[230px] text-gray-800 font-semibold text-sm">
          {dataApplicant.spellOut}
        </p>
      </div>
      <div className="flex flex-row w-full gap-4">
        <Button className="w-full" onClick={() => generatePDF(pdfRef, "save")}>
          Simpan
        </Button>
        <Button className="w-full" onClick={() => generatePDF(pdfRef, "view")}>
          Lihat
        </Button>
      </div>
    </div>
  );
}
