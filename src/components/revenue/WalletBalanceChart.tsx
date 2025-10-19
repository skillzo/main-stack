import { Line, LineChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Wallet } from "@/types/api";

interface WalletBalanceChartProps {
  wallet: Wallet | null;
  walletLoading: boolean;
  walletError: string | null;
  chartData: Array<{ date: string; balance: number }>;
}

const chartConfig = {
  balance: {
    label: "Balance",
    color: "#FF9B71",
  },
} satisfies ChartConfig;

export function WalletBalanceChart({
  wallet,
  walletLoading,
  walletError,
  chartData,
}: WalletBalanceChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-end gap-x-10 mb-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            Available Balance
          </p>
          {walletLoading ? (
            <h2 className="text-4xl font-semibold">Loading...</h2>
          ) : walletError ? (
            <h2 className="text-4xl font-semibold text-red-500">Error</h2>
          ) : (
            <h2 className="text-4xl font-semibold">
              USD{" "}
              {wallet?.balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          )}
        </div>
        <button className="bg-foreground text-background px-8 py-3 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors">
          Withdraw
        </button>
      </div>

      <div className="pb-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="balance"
              type="monotone"
              stroke="var(--color-balance)"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
