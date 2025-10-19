import {
  Settings,
  Receipt,
  Gift,
  Grid3x3,
  Bug,
  UserCog,
  LogOut,
} from "lucide-react";

interface ProfileMenuProps {
  isOpen: boolean;
}

export function ProfileMenu({ isOpen }: ProfileMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 1, icon: Settings, label: "Settings" },
    { id: 2, icon: Receipt, label: "Purchase History" },
    { id: 3, icon: Gift, label: "Refer and Earn" },
    { id: 4, icon: Grid3x3, label: "Integrations" },
    { id: 5, icon: Bug, label: "Report Bug" },
    { id: 6, icon: UserCog, label: "Switch Account" },
    { id: 7, icon: LogOut, label: "Sign Out" },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-[320px] bg-white rounded-2xl shadow-xl border border-border py-6 z-50">
      <div className="px-6 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center text-lg font-semibold">
            OJ
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base">Olivier Jones</h3>
            <p className="text-sm text-muted-foreground">
              olivierjones@gmail.com
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="w-full px-6 py-3.5 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left"
          >
            <item.icon className="w-5 h-5 text-foreground" />
            <span className="text-base">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
