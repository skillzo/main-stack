import { StatCard } from "./StatCard";
import type { Wallet } from "@/types/api";

interface StatsGridProps {
  wallet: Wallet | null;
}

export function StatsGrid({ wallet }: StatsGridProps) {
  const stats = [
    {
      title: "Ledger Balance",
      value: wallet?.ledger_balance ?? 0,
    },
    {
      title: "Total Payout",
      value: wallet?.total_payout ?? 0,
    },
    {
      title: "Total Revenue",
      value: wallet?.total_revenue ?? 0,
    },
    {
      title: "Pending Payout",
      value: wallet?.pending_payout ?? 0,
    },
  ];

  return (
    <div className="space-y-6 p-2">
      {stats.map((stat) => (
        <StatCard key={stat.title} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
}
