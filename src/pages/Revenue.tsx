import { Info, TrendingUp, ChevronDown, Download, Check } from "lucide-react";
import { useState } from "react";
import { FilterDrawer } from "../components/FilterDrawer";

export function Revenue() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const transactions = [
    {
      id: 1,
      title: "Psychology of Money",
      sender: "Roy Cash",
      amount: 600,
      date: "Apr 03,2022",
      status: "success",
    },
    {
      id: 2,
      title: "Buy me a coffee",
      sender: "Jonathan Smart",
      amount: 100,
      date: "Apr 02,2022",
      status: "success",
    },
    {
      id: 3,
      title: "How to build an online brand",
      sender: "Delvan Ludacris",
      amount: 100,
      date: "Apr 02,2022",
      status: "success",
    },
    {
      id: 4,
      title: "Cash withdrawal",
      sender: "Successful",
      amount: 3000.33,
      date: "Apr 01,2022",
      status: "withdrawal",
    },
    {
      id: 5,
      title: "Support my outreach",
      sender: "Shawn Kane",
      amount: 400,
      date: "Apr 02,2022",
      status: "success",
    },
    {
      id: 6,
      title: "Cash withdrawal",
      sender: "Pending",
      amount: 1004.44,
      date: "Apr 01,2022",
      status: "pending",
    },
    {
      id: 7,
      title: "Learn how to pitch your idea",
      sender: "Dujon Jericho",
      amount: 500,
      date: "Apr 02,2022",
      status: "success",
    },
  ];

  const stats = [
    {
      title: "Available Balance",
      value: 120500,
    },
    {
      title: "Total Payout",
      value: 55080,
    },
    {
      title: "Total Revenue",
      value: 175580,
    },
    {
      title: "Pending Payout",
      value: 0,
    },
  ];

  return (
    <div className="p-8 bg-white min-h-full">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="grid grid-cols-[1fr_320px] gap-6">
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-end gap-x-10 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Available Balance
                </p>
                <h2 className="text-4xl font-semibold">USD 120,500.00</h2>
              </div>
              <button className="bg-foreground text-background px-8 py-3 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors">
                Withdraw
              </button>
            </div>

            <div className="h-[280px] relative">
              <svg
                viewBox="0 0 800 280"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#FF9B71" />
                    <stop offset="100%" stopColor="#FFC6A8" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 200 Q 100 80, 200 100 T 400 60 T 600 120 T 800 240"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 text-sm text-muted-foreground">
                <span>Apr 1, 2022</span>
                <span>Apr 30, 2022</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-2">
            {stats.map((stat) => (
              <div className="bg-white rounded-2xl  ">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-2xl font-semibold">
                  USD{" "}
                  {stat.value?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl p-6 ">
          <div className="fbc pb-5 mb-6 border-b border-border">
            <div>
              <h3 className="text-lg font-semibold">24 Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Your transactions for the last 7 days
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex bg-gray-100 items-center gap-2 px-4 py-2 rounded-full  text-sm hover:bg-muted transition-colors cursor-pointer"
              >
                Filter
                <ChevronDown className="w-4 h-4" />
              </button>

              <button className="flex bg-gray-100 items-center gap-2 px-4 py-2 rounded-full  text-sm hover:bg-muted transition-colors cursor-pointer">
                Export list
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === "success"
                        ? "bg-[#E8F5E9]"
                        : transaction.status === "pending"
                        ? "bg-[#FFF3E0]"
                        : "bg-[#FFE8DC]"
                    }`}
                  >
                    {transaction.status === "success" ? (
                      <Check className="w-5 h-5 text-[#4CAF50]" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-[#FF9B71]" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.title}</p>
                    <p
                      className={`text-sm ${
                        transaction.status === "pending"
                          ? "text-[#FF9800]"
                          : transaction.status === "withdrawal"
                          ? "text-[#4CAF50]"
                          : "text-muted-foreground"
                      }`}
                    >
                      {transaction.sender}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">
                    USD {transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
