import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsGrid } from "../revenue/StatsGrid";
import type { Wallet } from "@/types/api";

describe("StatsGrid", () => {
  const mockWallet: Wallet = {
    balance: 1000.5,
    total_payout: 5000.0,
    total_revenue: 7500.0,
    pending_payout: 250.75,
    ledger_balance: 1200.25,
  };

  it("should render all stat cards with wallet data", () => {
    render(<StatsGrid wallet={mockWallet} />);

    expect(screen.getByText("Ledger Balance")).toBeInTheDocument();
    expect(screen.getByText("Total Payout")).toBeInTheDocument();
    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("Pending Payout")).toBeInTheDocument();
  });

  it("should display correct values from wallet", () => {
    render(<StatsGrid wallet={mockWallet} />);

    expect(screen.getByText("USD 1,200.25")).toBeInTheDocument(); // ledger_balance
    expect(screen.getByText("USD 5,000.00")).toBeInTheDocument(); // total_payout
    expect(screen.getByText("USD 7,500.00")).toBeInTheDocument(); // total_revenue
    expect(screen.getByText("USD 250.75")).toBeInTheDocument(); // pending_payout
  });

  it("should render with default values when wallet is null", () => {
    render(<StatsGrid wallet={null} />);

    expect(screen.getAllByText("USD 0.00")).toHaveLength(4);
  });

  it("should render with default values when wallet properties are undefined", () => {
    const partialWallet = {
      balance: 100,
      total_payout: 200,
      total_revenue: 0,
      pending_payout: 0,
      ledger_balance: 0,
    } as Wallet;

    render(<StatsGrid wallet={partialWallet} />);

    expect(screen.getAllByText("USD 0.00")).toHaveLength(3); // for undefined values
  });

  it("should have correct container classes", () => {
    const { container } = render(<StatsGrid wallet={mockWallet} />);

    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass("space-y-2", "p-2");
  });

  it("should render 4 stat cards", () => {
    render(<StatsGrid wallet={mockWallet} />);

    const statCards = screen.getAllByText(/USD/);
    expect(statCards).toHaveLength(4);
  });
});
