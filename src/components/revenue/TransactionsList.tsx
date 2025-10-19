import { ChevronDown, Download } from "lucide-react";
import { TransactionCard } from "./TransactionCard";
import type { Transaction } from "@/types/api";
import { NoTransactions } from "./NoTransactions";
import * as XLSX from "xlsx";

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
  const handleExportToExcel = () => {
    // Prepare data for Excel export
    const excelData = transactions.map((transaction) => ({
      "Transaction ID": transaction.id,
      Title: transaction.title,
      Sender: transaction.sender,
      Amount: transaction.amount,
      Date: transaction.date,
      Status: transaction.status,
      Type: transaction.type,
    }));

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");

    // Generate filename with current date
    const currentDate = new Date().toISOString().split("T")[0];
    const filename = `transactions_${currentDate}.xlsx`;

    XLSX.writeFile(wb, filename);
  };
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-border gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            {transactions.length} Transactions
          </h3>
          <p className="text-sm text-muted-foreground">
            Your transactions for the last 7 days
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={onFilterClick}
            className="flex bg-gray-100 items-center justify-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-muted transition-colors cursor-pointer"
          >
            Filter
            <ChevronDown className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportToExcel}
            className="flex bg-gray-100 items-center justify-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-muted transition-colors cursor-pointer"
          >
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
        <NoTransactions onFilterClick={onFilterClick} />
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
