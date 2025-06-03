import { Clock, User, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Order, OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  className?: string;
}

const statusLabels: Record<OrderStatus, string> = {
  nuevo: "Nuevo",
  "en-preparacion": "En Preparación",
  listo: "Listo",
  entregado: "Entregado",
};

const statusColors: Record<OrderStatus, string> = {
  nuevo: "bg-orange text-white",
  "en-preparacion": "bg-blue-500 text-white",
  listo: "bg-green-500 text-white",
  entregado: "bg-gray-500 text-white",
};

const nextStatusActions: Record<
  OrderStatus,
  { status: OrderStatus; label: string } | null
> = {
  nuevo: { status: "en-preparacion", label: "Preparar" },
  "en-preparacion": { status: "listo", label: "Marcar Listo" },
  listo: { status: "entregado", label: "Entregar" },
  entregado: null,
};

export function OrderCard({
  order,
  onUpdateStatus,
  className,
}: OrderCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const nextAction = nextStatusActions[order.status];

  return (
    <Card
      className={cn(
        "overflow-hidden",
        order.status === "nuevo" && "animate-pulse-orange border-orange",
        className,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={statusColors[order.status]}>
              {statusLabels[order.status]}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(order.createdAt)}
            </span>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {order.customerName}
            </div>
            {order.tableNumber && (
              <div className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                Mesa {order.tableNumber}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex-1">
                <span className="font-medium">{item.menuItem.name}</span>
                {item.quantity > 1 && (
                  <span className="text-orange font-semibold ml-1">
                    x{item.quantity}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600">
                {formatPrice(item.menuItem.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-3 flex justify-between items-center">
          <span className="font-semibold">
            Total: {formatPrice(order.total)}
          </span>

          {nextAction && (
            <Button
              onClick={() => onUpdateStatus(order.id, nextAction.status)}
              className={cn(
                "bg-orange text-white hover:bg-orange-600",
                "text-sm px-4 py-2",
              )}
            >
              {nextAction.label}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
