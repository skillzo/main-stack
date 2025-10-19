import { RecieptIcon } from "@/assets/svg";

interface NoTransactionsProps {
  onFilterClick: () => void;
}

export function NoTransactions({ onFilterClick }: NoTransactionsProps) {
  return (
    <div className="py-12  w-full max-w-[500px] mx-auto">
      <div className="w-14 h-14 rounded-2xl  mb-4 bg-gray-100 flex items-center justify-center">
        <RecieptIcon className="w-12 h-12 " />
      </div>

      <h3 className="text-3xl font-bold text-gray-900 mb-2">
        No matching transaction found for the selected filter
      </h3>
      <p className="text-gray-500 mb-6">
        Change your filters to see more results, or add a new product.
      </p>
      <button
        onClick={onFilterClick}
        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
      >
        Clear Filter
      </button>
    </div>
  );
}
