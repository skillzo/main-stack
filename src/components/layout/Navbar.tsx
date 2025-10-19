import {
  Bell,
  MessageSquareText,
  TextAlignJustify,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ProfileMenu } from "../ProfileMenu";
import { AppsDropdown } from "../AppsDropdown";
import Logo from "../common/Logo";
import {
  AnalyticsIcon,
  AppsIcon,
  CRMIcon,
  HomeIcon,
  WalletIcon,
} from "../../assets/svg";
import { useUser } from "@/hooks/useUser";

const navlinks = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "#",
  },
  {
    label: "Analytics",
    icon: AnalyticsIcon,
    href: "#",
  },
  {
    label: "Revenue",
    icon: WalletIcon,
    href: "/",
  },
  {
    label: "CRM",
    icon: CRMIcon,
    href: "#",
  },
];

export function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [showSegmentedControl, setShowSegmentedControl] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const pathname = window.location.pathname;
  const { user, loading, getInitials } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setIsAppsOpen(false);
      }
    };

    if (isProfileOpen || isAppsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isAppsOpen]);

  return (
    <nav className="border-b border-border bg-background px-6 py-3 mx-auto w-[98%] rounded-full shadow-sm">
      <div className="fbc">
        <Logo />

        <div className="flex items-center gap-8">
          {/* Regular nav links */}
          {navlinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                href={link.href}
                key={link.label}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </a>
            );
          })}

          {!showSegmentedControl && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSegmentedControl(!showSegmentedControl);
              }}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-colors text-muted-foreground hover:bg-muted `}
            >
              <AppsIcon className="w-5 h-5" />
              Apps
            </a>
          )}

          {/* Segmented control for Apps */}
          {showSegmentedControl && (
            <div
              className="flex bg-black rounded-full p-1 relative"
              ref={appsRef}
            >
              <button
                onClick={() => {
                  setShowSegmentedControl(!showSegmentedControl);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <AppsIcon className="w-5 h-5 text-black bg-white rounded-full p-1" />
                Apps
              </button>

              <div className="w-px h-6 bg-white/20 mx-1"></div>

              <button
                onClick={() => setIsAppsOpen(!isAppsOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 rounded-full transition-colors"
              >
                Link in Bio
                <ChevronDown className="w-4 h-4" />
              </button>

              <AppsDropdown isOpen={isAppsOpen} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
          </div>

          <div className="p-2 hover:bg-muted rounded-lg transition-colors">
            <MessageSquareText className="w-4 h-4" />
          </div>

          <div
            className="fc gap-2 bg-[#EFF1F6] rounded-full p-1 cursor-pointer "
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-medium">
              {loading ? "..." : getInitials()}
            </div>

            <div className="relative " ref={profileRef}>
              <div className="p-2 hover:bg-muted rounded-lg transition-colors">
                <TextAlignJustify className="w-5 h-5" />
              </div>

              <ProfileMenu
                isOpen={isProfileOpen}
                user={user}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
