import type { Transaction } from "@/types/api";
import type { FilterState } from "@/types/filter";

export function filterTransactions(
  transactions: Transaction[],
  filters: FilterState
): Transaction[] {
  return transactions.filter((transaction) => {
    if (filters.dateRange.startDate || filters.dateRange.endDate) {
      const transactionDate = new Date(transaction.date);

      if (
        filters.dateRange.startDate &&
        transactionDate < filters.dateRange.startDate
      ) {
        return false;
      }

      if (
        filters.dateRange.endDate &&
        transactionDate > filters.dateRange.endDate
      ) {
        return false;
      }
    }

    const hasSelectedTypes = Object.values(filters.transactionTypes).some(
      Boolean
    );
    if (hasSelectedTypes) {
      const transactionTypeMap: Record<
        string,
        keyof FilterState["transactionTypes"]
      > = {
        digital_product: "digitalProducts",
        coffee: "coffee",
        webinar: "webinars",
        withdrawal: "withdrawals",
        deposit: "other",
      };

      const typeKey = transactionTypeMap[transaction.type];
      if (typeKey && !filters.transactionTypes[typeKey]) {
        return false;
      }
      if (!typeKey) {
        return false;
      }
    }

    const hasSelectedStatuses = Object.values(filters.transactionStatuses).some(
      Boolean
    );

    if (hasSelectedStatuses) {
      const statusMap: Record<
        string,
        keyof FilterState["transactionStatuses"]
      > = {
        success: "successful",
        pending: "pending",
        failed: "failed",
      };

      const statusKey = statusMap[transaction.status];
      if (statusKey && !filters.transactionStatuses[statusKey]) {
        return false;
      }
      // If transaction status is not mapped and we have selected statuses, exclude it
      if (!statusKey) {
        return false;
      }
    }

    if (filters.quickFilter) {
      const today = new Date();
      const transactionDate = new Date(transaction.date);

      switch (filters.quickFilter) {
        case "Today":
          return transactionDate.toDateString() === today.toDateString();
        case "Last 7 days":
          const sevenDaysAgo = new Date(
            today.getTime() - 7 * 24 * 60 * 60 * 1000
          );
          return transactionDate >= sevenDaysAgo;
        case "This month":
          return (
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
          );
        case "Last 3 months":
          const threeMonthsAgo = new Date(
            today.getFullYear(),
            today.getMonth() - 3,
            today.getDate()
          );
          return transactionDate >= threeMonthsAgo;
        default:
          return true;
      }
    }

    return true;
  });
}

export function getQuickFilterDateRange(quickFilter: string | null): {
  startDate: Date | undefined;
  endDate: Date | undefined;
} {
  if (!quickFilter) return { startDate: undefined, endDate: undefined };

  const today = new Date();

  switch (quickFilter) {
    case "Today":
      return { startDate: today, endDate: today };
    case "Last 7 days":
      const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return { startDate: sevenDaysAgo, endDate: today };
    case "This month":
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return { startDate: startOfMonth, endDate: today };
    case "Last 3 months":
      const threeMonthsAgo = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate()
      );
      return { startDate: threeMonthsAgo, endDate: today };
    default:
      return { startDate: undefined, endDate: undefined };
  }
}
