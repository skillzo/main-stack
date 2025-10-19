import { X, ChevronDown, CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date("2023-07-17")
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date("2023-08-17")
  );
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

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const quickFilters = ["Today", "Last 7 days", "This month", "Last 3 months"];

  const toggleTransactionType = (key: keyof typeof transactionTypes) => {
    setTransactionTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTransactionStatus = (key: keyof typeof transactionStatuses) => {
    setTransactionStatuses((prev) => ({ ...prev, [key]: !prev[key] }));
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

  const getTransactionStatusLabel = () => {
    const selected = Object.entries(transactionStatuses)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => {
        const labels: Record<string, string> = {
          successful: "Successful",
          pending: "Pending",
          failed: "Failed",
        };
        return labels[key];
      });

    if (selected.length === 0) return "Select status";
    if (selected.length === Object.keys(transactionStatuses).length)
      return "All statuses";
    if (selected.length <= 2) return selected.join(", ");
    return `${selected.length} selected`;
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
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed p-6 right-2 top-1/2 -translate-y-1/2 h-[98%]  w-full  max-w-[560px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out rounded-xl ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="fbc">
          <h2 className="text-2xl font-bold">Filter</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto space-y-6 mt-8">
          <div className="flex items-center gap-3">
            {quickFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedQuickFilter(filter)}
                className={`px-5 py-2.5 border border-border rounded-full text-xs md:text-sm transition-colors cursor-pointer ${
                  selectedQuickFilter === filter
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-[#EBEBEB]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="">
            <h3 className="text-base font-semibold mb-3">Date Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-[#F5F5F5] border-none hover:bg-[#EBEBEB] rounded-xl px-4 py-3 h-auto"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-[#F5F5F5] border-none hover:bg-[#EBEBEB] rounded-xl px-4 py-3 h-auto"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                    <div
                      key={key}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted rounded-lg"
                    >
                      <Checkbox
                        id={key}
                        checked={transactionTypes[key]}
                        onCheckedChange={() => toggleTransactionType(key)}
                      />
                      <label
                        htmlFor={key}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {label}
                      </label>
                    </div>
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
                className={`w-full px-4 py-3 rounded-xl text-left text-sm flex items-center justify-between transition-all ${
                  isTransactionStatusOpen
                    ? "bg-white border-2 border-foreground"
                    : "bg-[#F5F5F5] hover:bg-[#EBEBEB]"
                }`}
              >
                <span className="truncate pr-2">
                  {getTransactionStatusLabel()}
                </span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isTransactionStatusOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isTransactionStatusOpen && (
                <div className="mt-2 p-2 bg-white border-2 border-foreground rounded-xl space-y-1">
                  {[
                    { key: "successful" as const, label: "Successful" },
                    { key: "pending" as const, label: "Pending" },
                    { key: "failed" as const, label: "Failed" },
                  ].map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted rounded-lg"
                    >
                      <Checkbox
                        id={key}
                        checked={transactionStatuses[key]}
                        onCheckedChange={() => toggleTransactionStatus(key)}
                      />
                      <label
                        htmlFor={key}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
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
