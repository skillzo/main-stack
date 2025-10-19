import { X, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string | null>(
    null
  );
  const [startDate, setStartDate] = useState("17 Jul 2023");
  const [endDate, setEndDate] = useState("17 Aug 2023");
  const [isTransactionTypeOpen, setIsTransactionTypeOpen] = useState(false);
  const [isTransactionStatusOpen, setIsTransactionStatusOpen] = useState(false);

  const [transactionTypes, setTransactionTypes] = useState({
    storeTransactions: true,
    getTipped: true,
    withdrawals: true,
    chargebacks: true,
    cashbacks: true,
    referEarn: true,
  });

  const [transactionStatuses, setTransactionStatuses] = useState({
    successful: true,
    pending: true,
    failed: true,
  });

  if (!isOpen) return null;

  const quickFilters = ["Today", "Last 7 days", "This month", "Last 3 months"];

  const toggleTransactionType = (key: keyof typeof transactionTypes) => {
    setTransactionTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getTransactionTypeLabel = () => {
    const selected = Object.entries(transactionTypes)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => {
        const labels: Record<string, string> = {
          storeTransactions: "Store Transactions",
          getTipped: "Get Tipped",
          withdrawals: "Withdrawals",
          chargebacks: "Chargebacks",
          cashbacks: "Cashbacks",
          referEarn: "Refer & Earn",
        };
        return labels[key];
      });

    return selected.length === 6
      ? "Store Transactions, Get Tipped, Withdrawals, Chargebacks, Ca..."
      : selected.join(", ");
  };

  const handleClear = () => {
    setSelectedQuickFilter(null);
    setTransactionTypes({
      storeTransactions: true,
      getTipped: true,
      withdrawals: true,
      chargebacks: true,
      cashbacks: true,
      referEarn: true,
    });
    setTransactionStatuses({
      successful: true,
      pending: true,
      failed: true,
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[560px] bg-white z-50 shadow-2xl flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Filter</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="flex items-center gap-3">
            {quickFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedQuickFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm transition-colors ${
                  selectedQuickFilter === filter
                    ? "bg-foreground text-background"
                    : "bg-[#F5F5F5] text-foreground hover:bg-[#EBEBEB]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3">Date Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <button className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl text-left text-sm flex items-center justify-between hover:bg-[#EBEBEB] transition-colors">
                  {startDate}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <button className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl text-left text-sm flex items-center justify-between hover:bg-[#EBEBEB] transition-colors">
                  {endDate}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3">Transaction Type</h3>
            <div className="relative">
              <button
                onClick={() => setIsTransactionTypeOpen(!isTransactionTypeOpen)}
                className={`w-full px-4 py-3 rounded-xl text-left text-sm flex items-center justify-between transition-all ${
                  isTransactionTypeOpen
                    ? "bg-white border-2 border-foreground"
                    : "bg-[#F5F5F5] hover:bg-[#EBEBEB]"
                }`}
              >
                <span className="truncate pr-2">
                  {getTransactionTypeLabel()}
                </span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isTransactionTypeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isTransactionTypeOpen && (
                <div className="mt-2 p-2 bg-white border-2 border-foreground rounded-xl space-y-1">
                  {[
                    {
                      key: "storeTransactions" as const,
                      label: "Store Transactions",
                    },
                    { key: "getTipped" as const, label: "Get Tipped" },
                    { key: "withdrawals" as const, label: "Withdrawals" },
                    { key: "chargebacks" as const, label: "Chargebacks" },
                    { key: "cashbacks" as const, label: "Cashbacks" },
                    { key: "referEarn" as const, label: "Refer & Earn" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted rounded-lg cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                          transactionTypes[key]
                            ? "bg-foreground"
                            : "bg-white border-2 border-foreground"
                        }`}
                      >
                        {transactionTypes[key] && (
                          <svg
                            className="w-3.5 h-3.5 text-background"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm">{label}</span>
                      <input
                        type="checkbox"
                        checked={transactionTypes[key]}
                        onChange={() => toggleTransactionType(key)}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-3">Transaction Status</h3>
            <div className="relative">
              <button
                onClick={() =>
                  setIsTransactionStatusOpen(!isTransactionStatusOpen)
                }
                className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl text-left text-sm flex items-center justify-between hover:bg-[#EBEBEB] transition-colors"
              >
                Successful, Pending, Failed
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border flex items-center gap-4">
          <button
            onClick={handleClear}
            className="flex-1 px-6 py-3 rounded-full text-sm font-medium border border-border hover:bg-muted transition-colors"
          >
            Clear
          </button>
          <button className="flex-1 px-6 py-3 rounded-full text-sm font-medium bg-[#E5E5E5] text-[#A0A0A0] cursor-not-allowed">
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
