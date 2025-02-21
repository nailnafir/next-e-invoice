"use client";

import { Card, CardContent } from "@/components/ui/card";
import { paymentStatuses } from "@/data/list-data";
import { cn } from "@/lib/utils";

export default function ChartPaymentStatus() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {paymentStatuses.map((item, index) => (
        <Card
          key={index}
          className="flex flex-col shadow shadow-card-foreground/25"
        >
          <CardContent className="relative flex flex-col gap-6 p-4">
            <div
              className={cn(
                "p-2 rounded-lg self-center absolute right-4 top-4",
                item.name === "disetujui" && "bg-green-200",
                item.name === "ditunda" && "bg-yellow-200",
                item.name === "ditolak" && "bg-red-200"
              )}
            >
              <item.icon
                className={cn(
                  "text-primary",
                  item.name === "disetujui" && "text-green-500",
                  item.name === "ditunda" && "text-yellow-500",
                  item.name === "ditolak" && "text-red-500"
                )}
              />
            </div>
            <div>
              <span className="max-sm:text-xs">Status</span>
              <span className="max-sm:hidden">{" "}Pembayaran</span>
            </div>
            <div className="flex flex-col">
              <p className="text-3xl font-bold">{item.total}</p>
              <p className="text-xs text-muted-foreground">{item.name}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
