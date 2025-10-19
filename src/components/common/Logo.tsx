import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return <img src={logo} alt="Logo" className={cn("w-8 h-8", className)} />;
}
