"use client";

import { LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatIndonesianNumber } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";

const chartData = [
  { month: "Januari", nominal: 38000000 },
  { month: "Februari", nominal: 115000000 },
  { month: "Maret", nominal: 42500000 },
  { month: "April", nominal: 83000000 },
  { month: "Mei", nominal: 64800000 },
  { month: "Juni", nominal: 103000000 },
  { month: "Juli", nominal: 130000000 },
  { month: "Agustus", nominal: 84000000 },
  { month: "September", nominal: 23000000 },
  { month: "Oktober", nominal: 55000000 },
  { month: "November", nominal: 82000000 },
  { month: "Desember", nominal: 25000000 },
];

const chartConfig = {
  nominal: {
    label: "Nominal",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ChartPaymentNominal() {
   const isMobile = useMediaQuery("(max-width: 640px)");
   
  return (
    <Card className="flex flex-col shadow shadow-card-foreground/25">
      <CardHeader>
        <CardTitle>Transaksi Pembayaran</CardTitle>
        <CardDescription>Januari - Desember 2024</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <YAxis
              dataKey="nominal"
              tickMargin={2}
              tickFormatter={(value) => formatIndonesianNumber(value)}
            />
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={2}
              tickFormatter={(value) => (isMobile ? value.slice(0, 3) : value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="nominal"
              type="monotone"
              stroke="var(--color-nominal)"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Pembayaran baru naik sebesar 5.2%
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan data 1 tahun terakhir
        </div>
      </CardFooter>
    </Card>
  );
}
