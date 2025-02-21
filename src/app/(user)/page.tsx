"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import BackgroundParticles from "@/components/background/background-particles";
import Link from "next/link";

export default function HomePage() {
  const tagLine = [
    {
      title: "Mudah digunakan",
      description: "Buat pembayaran dalam beberapa menit saja",
    },
    {
      title: "Ringkas dan jelas",
      description: "Riwayat pembayaran tersimpan dengan baik",
    },
    {
      title: "Dapat disimpan",
      description: "Kuitansi pembayaran dapat disimpan ke PDF",
    },
  ];

  return (
    <div className="h-[calc(100vh-80px)] relative flex flex-col items-center justify-center p-4 overflow-hidden">
      <BackgroundParticles />
      <div className="relative z-10 max-w-3xl w-full text-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">e-Kuitansi</h1>
          <p className="text-lg text-muted-foreground">
            Kelola kuitansi profesional dengan mudah tanpa ribet
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link href="/payment-confirmations">
            <Button className="inline-flex items-center px-6 py-3">
              <Plus className="w-5 h-5 mr-2" />
              Buat Pembayaran
            </Button>
          </Link>
          <Link href="/payment-histories">
            <Button
              variant="outline"
              className="inline-flex items-center px-6 py-3"
            >
              <FileText className="w-5 h-5 mr-2" />
              Lihat Pembayaran
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {tagLine.map((item, index) => (
            <Card
              key={index}
              className="rounded-xl shadow bg-background/10 backdrop-blur"
            >
              <CardHeader>
                <CardTitle className="text-base font-semibold mb-1">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
