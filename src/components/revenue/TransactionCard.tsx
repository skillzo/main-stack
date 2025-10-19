import { Check, TrendingUp } from "lucide-react";
import type { Transaction } from "@/types/api";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            transaction.status === "success"
              ? "bg-[#E8F5E9]"
              : transaction.status === "pending"
              ? "bg-[#FFF3E0]"
              : "bg-[#FFE8DC]"
          }`}
        >
          {transaction.status === "success" ? (
            <Check className="w-5 h-5 text-[#4CAF50]" />
          ) : (
            <TrendingUp className="w-5 h-5 text-[#FF9B71]" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm capitalize">{transaction.title}</p>
          <p
            className={`text-sm ${
              transaction.status === "pending"
                ? "text-[#FF9800]"
                : transaction.status === "withdrawal"
                ? "text-[#4CAF50]"
                : "text-muted-foreground"
            }`}
          >
            {transaction.sender}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-sm">
          USD {transaction.amount.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">{transaction.date}</p>
      </div>
    </div>
  );
}
