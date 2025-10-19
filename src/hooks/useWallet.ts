import { useState, useEffect } from "react";
import type { Wallet } from "@/types/api";
import { BASE_URL } from "@/lib/varaibles";

const API_URL = `${BASE_URL}/wallet`;

export function useWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWallet() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Wallet = await response.json();
        setWallet(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch wallet");
      } finally {
        setLoading(false);
      }
    }

    fetchWallet();
  }, []);

  return { wallet, loading, error };
}
