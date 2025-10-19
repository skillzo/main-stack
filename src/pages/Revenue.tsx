import { useState, useMemo } from "react";
import { FilterDrawer } from "../components/FilterDrawer";
import { useTransactions } from "@/hooks/useTransactions";
import { useWallet } from "@/hooks/useWallet";
import { WalletBalanceChart } from "@/components/revenue/WalletBalanceChart";
import { StatsGrid } from "@/components/revenue/StatsGrid";
import { TransactionsList } from "@/components/revenue/TransactionsList";
import { type FilterState, defaultFilterState } from "@/types/filter";
import { filterTransactions } from "@/lib/filterUtils";

export function Revenue() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const { transactions, loading, error } = useTransactions();
  const { wallet, loading: walletLoading, error: walletError } = useWallet();

  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, filters);
  }, [transactions, filters]);

  const chartData = useMemo(() => {
    if (!filteredTransactions.length) return [];

    const sorted = [...filteredTransactions].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

    let runningBalance = 0;

    const chartPoints = sorted.map((transaction) => {
      if (transaction.type === "withdrawal") {
        runningBalance -= transaction.amount;
      } else {
        runningBalance += transaction.amount;
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
  }, [filteredTransactions]);

  return (
    <>
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-full">
        <div className="max-w-[1400px] mx-auto space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 sm:gap-6">
            <WalletBalanceChart
              wallet={wallet}
              walletLoading={walletLoading}
              walletError={walletError}
              chartData={chartData}
            />
            <StatsGrid wallet={wallet} />
          </div>

          <TransactionsList
            transactions={filteredTransactions}
            loading={loading}
            error={error}
            onFilterClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>
    </>
  );
}
