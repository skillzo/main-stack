import { RotateCcw, Home, Wallet, FileText } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-16 border-r border-border bg-background flex flex-col items-center py-6 gap-4">
      <button className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
        <RotateCcw className="w-5 h-5 text-muted-foreground" />
      </button>
      <button className="w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
        <Home className="w-5 h-5 text-muted-foreground" />
      </button>
      <button className="w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
        <Wallet className="w-5 h-5 text-muted-foreground" />
      </button>
      <button className="w-10 h-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
        <FileText className="w-5 h-5 text-muted-foreground" />
      </button>
    </aside>
  );
}
