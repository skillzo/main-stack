import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sidebarItems = [
  {
    image: "/src/assets/link.png",
    label: "Link in Bio",
  },
  {
    image: "/src/assets/store.png",
    label: "Store",
  },
  {
    image: "/src/assets/media-kit.png",
    label: "Media Kit",
  },
  {
    image: "/src/assets/invoicing.png",
    label: "Invoicing",
  },
];

export function Sidebar() {
  return (
    <aside className="hidden fixed left-4 top-[25%] bg-transparent md:flex flex-col items-center py-5 px-4 gap-6 rounded-full shadow-lg">
      <TooltipProvider>
        {sidebarItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <button className="w-6 h-6 rounded-lg hover:bg-muted flex items-center justify-center transition-colors cursor-pointer">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-50"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </aside>
  );
}
