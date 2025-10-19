import { Bell, MessageSquareText, TextAlignJustify } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AppsDropdown } from "../AppsDropdown";
import { ProfileMenu } from "../ProfileMenu";
import Logo from "../common/Logo";
import {
  AnalyticsIcon,
  AppsIcon,
  CRMIcon,
  HomeIcon,
  WalletIcon,
} from "../../assets/svg";

export function Navbar() {
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const appsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = window.location.pathname;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setIsAppsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isAppsOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAppsOpen, isProfileOpen]);

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
    {
      label: "Apps",
      icon: AppsIcon,
      href: "#",
    },
  ];

  return (
    <nav className="border-b border-border bg-background px-6 py-3 mx-auto w-[98%] rounded-full shadow-sm">
      <div className="fbc">
        <Logo />

        <div className="flex items-center gap-8">
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
              OJ
            </div>

            <div className="relative " ref={profileRef}>
              <div className="p-2 hover:bg-muted rounded-lg transition-colors">
                <TextAlignJustify className="w-5 h-5" />
              </div>

              <ProfileMenu isOpen={isProfileOpen} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
