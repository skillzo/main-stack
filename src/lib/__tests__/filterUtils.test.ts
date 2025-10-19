import { describe, it, expect } from "vitest";
import { filterTransactions, getQuickFilterDateRange } from "../filterUtils";
import type { Transaction } from "@/types/api";
import type { FilterState } from "@/types/filter";

describe("filterTransactions", () => {
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      title: "Digital Product Sale",
      sender: "John Doe",
      amount: 99.99,
      date: "2024-01-15",
      status: "success",
      type: "digital_product",
    },
    {
      id: "2",
      title: "Coffee Purchase",
      sender: "Jane Smith",
      amount: 4.5,
      date: "2024-01-14",
      status: "pending",
      type: "coffee",
    },
    {
      id: "3",
      title: "Webinar Registration",
      sender: "Bob Wilson",
      amount: 49.99,
      date: "2024-01-13",
      status: "failed",
      type: "webinar",
    },
    {
      id: "4",
      title: "Cash Withdrawal",
      sender: "System",
      amount: -100.0,
      date: "2024-01-12",
      status: "success",
      type: "withdrawal",
    },
    {
      id: "5",
      title: "Deposit",
      sender: "Bank",
      amount: 500.0,
      date: "2024-01-11",
      status: "success",
      type: "deposit",
    },
  ];

  it("should return all transactions when no filters are applied", () => {
    const filters: FilterState = {
      quickFilter: null,
      dateRange: { startDate: undefined, endDate: undefined },
      transactionTypes: {
        digitalProducts: false,
        coffee: false,
        webinars: false,
        withdrawals: false,
        other: false,
      },
      transactionStatuses: {
        successful: false,
        pending: false,
        failed: false,
      },
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(5);
  });

  it("should filter by transaction types", () => {
    const filters: FilterState = {
      quickFilter: null,
      dateRange: { startDate: undefined, endDate: undefined },
      transactionTypes: {
        digitalProducts: true,
        coffee: false,
        webinars: false,
        withdrawals: false,
        other: false,
      },
      transactionStatuses: {
        successful: false,
        pending: false,
        failed: false,
      },
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("digital_product");
  });

  it("should filter by transaction statuses", () => {
    const filters: FilterState = {
      quickFilter: null,
      dateRange: { startDate: undefined, endDate: undefined },
      transactionTypes: {
        digitalProducts: false,
        coffee: false,
        webinars: false,
        withdrawals: false,
        other: false,
      },
      transactionStatuses: {
        successful: true,
        pending: false,
        failed: false,
      },
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(3);
    expect(result.every((t) => t.status === "success")).toBe(true);
  });

  it("should filter by date range", () => {
    const filters: FilterState = {
      quickFilter: null,
      dateRange: {
        startDate: new Date("2024-01-13"),
        endDate: new Date("2024-01-15"),
      },
      transactionTypes: {
        digitalProducts: false,
        coffee: false,
        webinars: false,
        withdrawals: false,
        other: false,
      },
      transactionStatuses: {
        successful: false,
        pending: false,
        failed: false,
      },
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(3);
  });

  it("should filter by quick filter - Today", () => {
    const today = new Date();
    const todayTransaction: Transaction = {
      id: "6",
      title: "Today Transaction",
      sender: "Test User",
      amount: 10.0,
      date: today.toISOString().split("T")[0],
      status: "success",
      type: "deposit",
    };

    const transactionsWithToday = [...mockTransactions, todayTransaction];

    const filters: FilterState = {
      quickFilter: "Today",
      dateRange: { startDate: undefined, endDate: undefined },
      transactionTypes: {
        digitalProducts: false,
        coffee: false,
        webinars: false,
        withdrawals: false,
        other: false,
      },
      transactionStatuses: {
        successful: false,
        pending: false,
        failed: false,
      },
    };

    const result = filterTransactions(transactionsWithToday, filters);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("6");
  });

  it("should filter by quick filter - Last 7 days", () => {
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    const recentTransaction: Transaction = {
      id: "7",
      title: "Recent Transaction",
      sender: "Test User",
      amount: 25.0,
      date: sixDaysAgo.toISOString().split("T")[0],
      status: "success",
      type: "deposit",
    };

    const transactionsWithRecent = [...mockTransactions, recentTransaction];

    const filters: FilterState = {
      quickFilter: "Last 7 days",
      dateRange: { startDate: undefined, endDate: undefined },
      transactionTypes: {
        digitalProducts: false,
        coffee: false,
        webinars: false,
        withdrawals: false,
        other: false,
      },
      transactionStatuses: {
        successful: false,
        pending: false,
        failed: false,
      },
    };

    const result = filterTransactions(transactionsWithRecent, filters);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should combine multiple filters", () => {
    const filters: FilterState = {
      quickFilter: null,
      dateRange: {
        startDate: new Date("2024-01-13"),
        endDate: new Date("2024-01-15"),
      },
      transactionTypes: {
        digitalProducts: true,
        coffee: false,
        webinars: false,
        withdrawals: false,
        other: false,
      },
      transactionStatuses: {
        successful: true,
        pending: false,
        failed: false,
      },
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("digital_product");
    expect(result[0].status).toBe("success");
  });

  it("should handle empty transactions array", () => {
    const filters: FilterState = {
      quickFilter: null,
      dateRange: { startDate: undefined, endDate: undefined },
      transactionTypes: {
        digitalProducts: false,
        coffee: false,
        webinars: false,
        withdrawals: false,
        other: false,
      },
      transactionStatuses: {
        successful: false,
        pending: false,
        failed: false,
      },
    };

    const result = filterTransactions([], filters);
    expect(result).toHaveLength(0);
  });
});

describe("getQuickFilterDateRange", () => {
  it("should return undefined dates for null quickFilter", () => {
    const result = getQuickFilterDateRange(null);
    expect(result.startDate).toBeUndefined();
    expect(result.endDate).toBeUndefined();
  });

  it('should return today for "Today" filter', () => {
    const result = getQuickFilterDateRange("Today");
    const today = new Date();

    expect(result.startDate?.toDateString()).toBe(today.toDateString());
    expect(result.endDate?.toDateString()).toBe(today.toDateString());
  });

  it('should return correct range for "Last 7 days" filter', () => {
    const result = getQuickFilterDateRange("Last 7 days");
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    expect(result.startDate?.toDateString()).toBe(sevenDaysAgo.toDateString());
    expect(result.endDate?.toDateString()).toBe(today.toDateString());
  });

  it('should return correct range for "This month" filter', () => {
    const result = getQuickFilterDateRange("This month");
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    expect(result.startDate?.toDateString()).toBe(startOfMonth.toDateString());
    expect(result.endDate?.toDateString()).toBe(today.toDateString());
  });

  it('should return correct range for "Last 3 months" filter', () => {
    const result = getQuickFilterDateRange("Last 3 months");
    const today = new Date();
    const threeMonthsAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 3,
      today.getDate()
    );

    expect(result.startDate?.toDateString()).toBe(
      threeMonthsAgo.toDateString()
    );
    expect(result.endDate?.toDateString()).toBe(today.toDateString());
  });

  it("should return undefined dates for unknown filter", () => {
    const result = getQuickFilterDateRange("Unknown Filter");
    expect(result.startDate).toBeUndefined();
    expect(result.endDate).toBeUndefined();
  });
});
