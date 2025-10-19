import { Info } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <button className="text-muted-foreground hover:text-foreground">
          <Info className="w-4 h-4" />
        </button>
      </div>
      <p className="text-2xl font-semibold">
        USD{" "}
        {value?.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}
