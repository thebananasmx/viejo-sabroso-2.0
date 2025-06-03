import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, ChefHat, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    path: "/menu-cliente",
    label: "Menú",
    icon: ShoppingCart,
  },
  {
    path: "/cocina",
    label: "Cocina",
    icon: ChefHat,
  },
  {
    path: "/admin-menu",
    label: "Admin",
    icon: Settings,
  },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors",
                isActive ? "text-orange" : "text-gray-500 hover:text-gray-700",
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive && "text-orange")} />
              <span
                className={cn("text-xs font-medium", isActive && "text-orange")}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
