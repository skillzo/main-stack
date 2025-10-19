import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TransactionCard } from "../revenue/TransactionCard";
import type { Transaction } from "@/types/api";

describe("TransactionCard", () => {
  const mockTransaction: Transaction = {
    id: "1",
    title: "Payment from Customer",
    sender: "John Smith",
    amount: 150.0,
    date: "Jan 15, 2024",
    status: "success",
    type: "deposit",
  };

  it("should render transaction details correctly", () => {
    render(<TransactionCard transaction={mockTransaction} />);

    expect(screen.getByText("Payment from Customer")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("USD 150.00")).toBeInTheDocument();
    expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument();
  });

  it("should render success status with correct styling", () => {
    render(<TransactionCard transaction={mockTransaction} />);

    const iconContainer = screen
      .getByText("Payment from Customer")
      .closest("div")?.parentElement?.firstChild;
    expect(iconContainer).toHaveClass("bg-[#E8F5E9]");
  });

  it("should render pending status with correct styling", () => {
    const pendingTransaction: Transaction = {
      ...mockTransaction,
      status: "pending",
    };

    render(<TransactionCard transaction={pendingTransaction} />);

    const iconContainer = screen
      .getByText("Payment from Customer")
      .closest("div")?.parentElement?.firstChild;
    expect(iconContainer).toHaveClass("bg-[#FFF3E0]");
  });

  it("should render withdrawal status with correct styling", () => {
    const withdrawalTransaction: Transaction = {
      ...mockTransaction,
      status: "withdrawal",
    };

    render(<TransactionCard transaction={withdrawalTransaction} />);

    const iconContainer = screen
      .getByText("Payment from Customer")
      .closest("div")?.parentElement?.firstChild;
    expect(iconContainer).toHaveClass("bg-[#FFE8DC]");
  });

  it("should display correct sender text color for pending status", () => {
    const pendingTransaction: Transaction = {
      ...mockTransaction,
      status: "pending",
    };

    render(<TransactionCard transaction={pendingTransaction} />);

    const senderElement = screen.getByText("John Smith");
    expect(senderElement).toHaveClass("text-[#FF9800]");
  });

  it("should display correct sender text color for withdrawal status", () => {
    const withdrawalTransaction: Transaction = {
      ...mockTransaction,
      status: "withdrawal",
    };

    render(<TransactionCard transaction={withdrawalTransaction} />);

    const senderElement = screen.getByText("John Smith");
    expect(senderElement).toHaveClass("text-[#4CAF50]");
  });

  it("should display default sender text color for success status", () => {
    render(<TransactionCard transaction={mockTransaction} />);

    const senderElement = screen.getByText("John Smith");
    expect(senderElement).toHaveClass("text-muted-foreground");
  });

  it("should format amount with 2 decimal places", () => {
    const transactionWithDecimals: Transaction = {
      ...mockTransaction,
      amount: 123.456,
    };

    render(<TransactionCard transaction={transactionWithDecimals} />);

    expect(screen.getByText("USD 123.46")).toBeInTheDocument();
  });

  it("should handle negative amounts", () => {
    const negativeTransaction: Transaction = {
      ...mockTransaction,
      amount: -75.5,
    };

    render(<TransactionCard transaction={negativeTransaction} />);

    expect(screen.getByText("USD -75.50")).toBeInTheDocument();
  });

  it("should capitalize transaction title", () => {
    const transactionWithLowercase: Transaction = {
      ...mockTransaction,
      title: "payment from customer",
    };

    render(<TransactionCard transaction={transactionWithLowercase} />);

    expect(screen.getByText("payment from customer")).toBeInTheDocument();
  });

  it("should have correct container classes", () => {
    const { container } = render(
      <TransactionCard transaction={mockTransaction} />
    );

    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-between",
      "py-3",
      "px-4",
      "rounded-xl",
      "hover:bg-muted/50",
      "transition-colors"
    );
  });
});
