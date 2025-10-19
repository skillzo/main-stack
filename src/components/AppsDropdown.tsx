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
      image: "/src/assets/link.png",
    },
    {
      id: 2,
      name: "Store",
      description: "Manage your Store activities",
      image: "/src/assets/store.png",
    },
    {
      id: 3,
      name: "Media Kit",
      description: "Manage your Media Kit",
      image: "/src/assets/media-kit.png",
    },
    {
      id: 4,
      name: "Invoicing",
      description: "Manage your Invoices",
      image: "/src/assets/invoicing.png",
    },
    {
      id: 5,
      name: "Bookings",
      description: "Manage your Bookings",
      image: "/src/assets/logo.png",
    },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-xl border border-border py-4 z-50">
      {apps.map((app) => (
        <button
          key={app.id}
          className="w-full px-5 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors group"
        >
          <div
            className={`w-14 h-14  border border-border rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}
          >
            <img
              src={app.image}
              alt={app.name}
              className="w-6 h-6 object-cover"
            />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-base">{app.name}</h3>
            <p className="text-sm text-muted-foreground group-hover:scale-105 transition-transform duration-200">
              {app.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
