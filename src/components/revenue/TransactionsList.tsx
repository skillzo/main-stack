import { ChevronDown, Download } from "lucide-react";
import { TransactionCard } from "./TransactionCard";
import type { Transaction } from "@/types/api";

interface TransactionsListProps {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  onFilterClick: () => void;
}

export function TransactionsList({
  transactions,
  loading,
  error,
  onFilterClick,
}: TransactionsListProps) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="fbc pb-5 mb-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold">
            {transactions.length} Transactions
          </h3>
          <p className="text-sm text-muted-foreground">
            Your transactions for the last 7 days
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onFilterClick}
            className="flex bg-gray-100 items-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-muted transition-colors cursor-pointer"
          >
            Filter
            <ChevronDown className="w-4 h-4" />
          </button>

          <button className="flex bg-gray-100 items-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-muted transition-colors cursor-pointer">
            Export list
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading transactions...
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
}
