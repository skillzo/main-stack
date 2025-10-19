import { useState, useEffect } from "react";
import type { ApiTransaction, Transaction } from "@/types/api";
import { BASE_URL } from "@/lib/varaibles";

const API_URL = `${BASE_URL}/transactions`;

console.log("API_URL", BASE_URL);

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function transformTransaction(apiTx: ApiTransaction): Transaction {
  if (apiTx.type === "withdrawal") {
    return {
      id: `${apiTx.date}-${apiTx.amount}`,
      title: "Cash withdrawal",
      sender: apiTx.status.charAt(0).toUpperCase() + apiTx.status.slice(1),
      amount: apiTx.amount,
      date: formatDate(apiTx.date),
      status: apiTx.type,
      type: apiTx.type,
    };
  }

  return {
    id: apiTx.payment_reference || `${apiTx.date}-${apiTx.amount}`,
    title:
      apiTx.metadata?.product_name || apiTx.metadata?.type || "Transaction",
    sender: apiTx.metadata?.name || "Unknown",
    amount: apiTx.amount,
    date: formatDate(apiTx.date),
    status: apiTx.status === "successful" ? "success" : apiTx.status,
    type: apiTx.metadata?.type || apiTx.type,
  };
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiTransaction[] = await response.json();
        const transformed = data.map(transformTransaction);
        setTransactions(transformed);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch transactions"
        );
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
}
