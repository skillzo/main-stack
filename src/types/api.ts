export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface TransactionMetadata {
  name: string;
  type: string;
  email: string;
  quantity: number;
  country: string;
  product_name?: string;
}

export interface ApiTransaction {
  amount: number;
  metadata?: TransactionMetadata;
  payment_reference?: string;
  status: string;
  type: "deposit" | "withdrawal";
  date: string;
}

export interface Transaction {
  id: string;
  title: string;
  sender: string;
  amount: number;
  date: string;
  status: string;
  type: string;
}

export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}
