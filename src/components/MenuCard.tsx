import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@/types";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  className?: string;
}

export function MenuCard({ item, onAddToCart, className }: MenuCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        {item.imageUrl && (
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{formatPrice(item.price)}</span>

            <Button
              onClick={() => onAddToCart(item)}
              disabled={!item.available}
              className={cn(
                "bg-orange text-white hover:bg-orange-600 disabled:opacity-50",
                "h-10 w-10 rounded-full p-0 flex-shrink-0",
              )}
              aria-label={`Agregar ${item.name} al carrito`}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {!item.available && (
            <p className="text-sm text-red-600 font-medium">No disponible</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
