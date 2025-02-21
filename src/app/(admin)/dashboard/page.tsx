import ChartPaymentNominal from "@/components/chart/chart-payment-nominal";
import ChartPaymentStatus from "@/components/chart/chart-payment-status";
import { getGreeting } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="pb-0">
        <p className="text-sm">Halo, Firdaus</p>
        <h1 className="text-2xl font-bold">{`${getGreeting()}!`}</h1>
      </div>
      <ChartPaymentStatus />
      <ChartPaymentNominal />
    </div>
  );
}
