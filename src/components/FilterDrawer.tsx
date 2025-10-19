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
import { type FilterState } from "@/types/filter";
import { getQuickFilterDateRange } from "@/lib/filterUtils";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: FilterDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransactionTypeOpen, setIsTransactionTypeOpen] = useState(false);
  const [isTransactionStatusOpen, setIsTransactionStatusOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
      setLocalFilters(filters);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen, filters]);

  if (!isVisible) return null;

  const quickFilters = ["Today", "Last 7 days", "This month", "Last 3 months"];

  const toggleTransactionType = (
    key: keyof FilterState["transactionTypes"]
  ) => {
    setLocalFilters({
      ...localFilters,
      transactionTypes: {
        ...localFilters.transactionTypes,
        [key]: !localFilters.transactionTypes[key],
      },
    });
  };

  const toggleTransactionStatus = (
    key: keyof FilterState["transactionStatuses"]
  ) => {
    setLocalFilters({
      ...localFilters,
      transactionStatuses: {
        ...localFilters.transactionStatuses,
        [key]: !localFilters.transactionStatuses[key],
      },
    });
  };

  const getTransactionTypeLabel = () => {
    const selected = Object.entries(localFilters.transactionTypes)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => {
        const labels: Record<string, string> = {
          digitalProducts: "Digital Products",
          coffee: "Coffee",
          webinars: "Webinars",
          withdrawals: "Withdrawals",
          other: "Other",
        };
        return labels[key];
      });

    if (selected.length === 0) return "Select transaction types";
    if (selected.length === 5) return "All transaction types";
    if (selected.length <= 2) return selected.join(", ");
    return `${selected.length} selected`;
  };

  const getTransactionStatusLabel = () => {
    const selected = Object.entries(localFilters.transactionStatuses)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => {
        const labels: Record<string, string> = {
          successful: "Successful",
          pending: "Pending",
          failed: "Failed",
        };
        return labels[key];
      });

    if (selected.length === 0) return "Select transaction status";
    if (
      selected.length === Object.keys(localFilters.transactionStatuses).length
    )
      return "All statuses";
    if (selected.length <= 2) return selected.join(", ");
    return `${selected.length} selected`;
  };

  const handleClear = () => {
    setLocalFilters({
      quickFilter: null,
      dateRange: {
        startDate: undefined,
        endDate: undefined,
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
    });
  };

  const handleQuickFilterChange = (filter: string) => {
    const dateRange = getQuickFilterDateRange(filter);
    setLocalFilters({
      ...localFilters,
      quickFilter: filter,
      dateRange,
    });
  };

  const handleDateChange = (
    type: "startDate" | "endDate",
    date: Date | undefined
  ) => {
    setLocalFilters({
      ...localFilters,
      dateRange: {
        ...localFilters.dateRange,
        [type]: date,
      },
      quickFilter: null,
    });
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const hasChanges = JSON.stringify(localFilters) !== JSON.stringify(filters);

  console.log("localFilters", localFilters);
  console.log("filters", filters);

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
                onClick={() => handleQuickFilterChange(filter)}
                className={`px-5 py-2.5 border border-border rounded-full text-xs md:text-sm transition-colors cursor-pointer ${
                  localFilters.quickFilter === filter
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-[#EBEBEB]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Date Range */}
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
                    {localFilters.dateRange.startDate
                      ? format(localFilters.dateRange.startDate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={localFilters.dateRange.startDate}
                    onSelect={(date) => handleDateChange("startDate", date)}
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
                    {localFilters.dateRange.endDate
                      ? format(localFilters.dateRange.endDate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={localFilters.dateRange.endDate}
                    onSelect={(date) => handleDateChange("endDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Transaction Type */}
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
                      key: "digitalProducts" as const,
                      label: "Digital Products",
                    },
                    { key: "coffee" as const, label: "Coffee" },
                    { key: "webinars" as const, label: "Webinars" },
                    { key: "withdrawals" as const, label: "Withdrawals" },
                    { key: "other" as const, label: "Other" },
                  ].map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted rounded-lg"
                    >
                      <Checkbox
                        id={key}
                        checked={localFilters.transactionTypes[key]}
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

          {/* Transaction Status */}
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
                        checked={localFilters.transactionStatuses[key]}
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

        <div className="fbc gap-8">
          <button
            onClick={handleClear}
            className="flex-1 px-6 py-3 rounded-full text-sm font-medium border border-border hover:bg-muted transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            disabled={!hasChanges}
            className={`flex-1 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              hasChanges
                ? "bg-foreground text-background hover:bg-foreground/90 cursor-pointer"
                : "bg-[#E5E5E5] text-[#A0A0A0] cursor-not-allowed"
            }`}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
