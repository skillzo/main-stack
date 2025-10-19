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
      ) : transactions.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No matching transaction found for the selected filter
          </h3>
          <p className="text-gray-500 mb-6">
            Change your filters to see more results, or add a new product.
          </p>
          <button
            onClick={onFilterClick}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
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
