import { Info } from "lucide-react";

interface AppsDropdownProps {
  isOpen: boolean;
}

export function AppsDropdown({ isOpen }: AppsDropdownProps) {
  if (!isOpen) return null;

  const apps = [
    {
      id: 1,
      name: "Link in Bio",
      description: "Manage your Link in Bio",
      icon: "🔗",
      bgColor: "bg-purple-100",
    },
    {
      id: 2,
      name: "Store",
      description: "Manage your Store activities",
      icon: "🏪",
      bgColor: "bg-orange-100",
    },
    {
      id: 3,
      name: "Media Kit",
      description: "Manage your Media Kit",
      icon: "📁",
      bgColor: "bg-teal-100",
    },
    {
      id: 4,
      name: "Invoicing",
      description: "Manage your Invoices",
      icon: "📄",
      bgColor: "bg-purple-100",
    },
    {
      id: 5,
      name: "Bookings",
      description: "Manage your Bookings",
      icon: "📅",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-xl border border-border py-4 z-50">
      {apps.map((app) => (
        <button
          key={app.id}
          className="w-full px-5 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
        >
          <div
            className={`w-14 h-14 ${app.bgColor} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}
          >
            {app.icon}
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-base">{app.name}</h3>
            <p className="text-sm text-muted-foreground">{app.description}</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground flex-shrink-0">
            <Info className="w-5 h-5" />
          </button>
        </button>
      ))}
    </div>
  );
}
