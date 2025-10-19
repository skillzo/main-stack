import { useState, useMemo } from "react";
import { FilterDrawer } from "../components/FilterDrawer";
import { useTransactions } from "@/hooks/useTransactions";
import { useWallet } from "@/hooks/useWallet";
import { WalletBalanceChart } from "@/components/revenue/WalletBalanceChart";
import { StatsGrid } from "@/components/revenue/StatsGrid";
import { TransactionsList } from "@/components/revenue/TransactionsList";

export function Revenue() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { transactions, loading, error } = useTransactions();
  const { wallet, loading: walletLoading, error: walletError } = useWallet();

  const chartData = useMemo(() => {
    if (!transactions.length) return [];

    // Sort transactions by date (oldest first)
    const sorted = [...transactions].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

    // Calculate running balance starting from 0
    let runningBalance = 0;

    const chartPoints = sorted.map((transaction) => {
      if (transaction.type === "deposit") {
        runningBalance += transaction.amount;
      } else {
        runningBalance -= transaction.amount;
      }

      const date = new Date(transaction.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return {
        date: formattedDate,
        balance: runningBalance,
      };
    });

    return chartPoints;
  }, [transactions]);

  return (
    <>
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="p-8 bg-white min-h-full">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="grid grid-cols-[1fr_320px] gap-6">
            <WalletBalanceChart
              wallet={wallet}
              walletLoading={walletLoading}
              walletError={walletError}
              chartData={chartData}
            />
            <StatsGrid wallet={wallet} />
          </div>

          <TransactionsList
            transactions={transactions}
            loading={loading}
            error={error}
            onFilterClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>
    </>
  );
}
