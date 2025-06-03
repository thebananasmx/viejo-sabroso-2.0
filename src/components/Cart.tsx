import { useState } from "react";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartItem } from "@/types";
import { cn } from "@/lib/utils";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: (customerName: string, tableNumber?: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  isOpen,
  onClose,
}: CartProps) {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0,
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onPlaceOrder(customerName.trim(), tableNumber.trim() || undefined);
      setCustomerName("");
      setTableNumber("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden sm:rounded-lg rounded-t-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Mi Pedido
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          {items.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Tu carrito está vacío
            </div>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto p-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="flex items-center gap-3 py-2"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">
                        {item.menuItem.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.menuItem.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity(item.menuItem.id, item.quantity - 1)
                        }
                        className="h-8 w-8 p-0"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity(item.menuItem.id, item.quantity + 1)
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.menuItem.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="customerName">Nombre *</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu nombre"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tableNumber">Mesa (opcional)</Label>
                    <Input
                      id="tableNumber"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Número de mesa"
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!customerName.trim() || isSubmitting}
                    className={cn(
                      "w-full bg-orange text-white hover:bg-orange-600",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                    )}
                  >
                    {isSubmitting ? "Realizando pedido..." : "Realizar Pedido"}
                  </Button>
                </form>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
