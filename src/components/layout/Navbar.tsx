import { Home, BarChart3, DollarSign, Users, Grid3x3 } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-foreground text-background p-2 rounded">
              <div className="w-5 h-5 flex items-center justify-center font-bold text-sm">
                iii
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              Home
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-foreground text-background">
              <DollarSign className="w-4 h-4" />
              Revenue
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Users className="w-4 h-4" />
              CRM
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Grid3x3 className="w-4 h-4" />
              Apps
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-medium">
            DI
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
