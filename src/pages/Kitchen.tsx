import { useState, useEffect } from "react";
import {
  Clock,
  User,
  Hash,
  AlertCircle,
  CheckCircle,
  ChefHat,
} from "lucide-react";
import { Order, OrderStatus } from "@/types";
import { subscribeToOrders, updateOrderStatus } from "@/lib/firestore";
import { toast } from "sonner";

const statusLabels: Record<OrderStatus, string> = {
  nuevo: "Nuevo",
  "en-preparacion": "En Preparación",
  listo: "Listo",
  entregado: "Entregado",
};

const statusColors: Record<OrderStatus, string> = {
  nuevo: "#FF7518",
  "en-preparacion": "#3B82F6",
  listo: "#10B981",
  entregado: "#6B7280",
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

const statusFilters: { key: OrderStatus | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "nuevo", label: "Nuevos" },
  { key: "en-preparacion", label: "En Prep." },
  { key: "listo", label: "Listos" },
];

export default function Kitchen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<OrderStatus | "todos">(
    "todos",
  );
  const [loading, setLoading] = useState(true);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const [previousOrders, setPreviousOrders] = useState<Order[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToOrders((newOrders) => {
      // Check for new orders
      if (previousOrders.length > 0) {
        const newOrderIds = newOrders.map((o) => o.id);
        const previousOrderIds = previousOrders.map((o) => o.id);
        const addedOrders = newOrders.filter(
          (order) => !previousOrderIds.includes(order.id),
        );

        // Check for status changes
        newOrders.forEach((newOrder) => {
          const previousOrder = previousOrders.find(
            (o) => o.id === newOrder.id,
          );
          if (previousOrder && previousOrder.status !== newOrder.status) {
            // Status changed notification
            const customerInfo = newOrder.tableNumber
              ? `${newOrder.customerName} - Mesa ${newOrder.tableNumber}`
              : newOrder.customerName;

            switch (newOrder.status) {
              case "en-preparacion":
                toast.info("Pedido en preparación", {
                  description: `${customerInfo} - ${formatPrice(newOrder.total)}`,
                  icon: <ChefHat className="h-4 w-4" />,
                  duration: 3000,
                });
                break;
              case "listo":
                toast.success("Pedido listo para entregar", {
                  description: `${customerInfo} - ${formatPrice(newOrder.total)}`,
                  icon: <CheckCircle className="h-4 w-4" />,
                  duration: 4000,
                });
                break;
              case "entregado":
                toast("Pedido entregado", {
                  description: `${customerInfo} - ${formatPrice(newOrder.total)}`,
                  duration: 3000,
                });
                break;
            }
          }
        });

        // Show notification for new orders
        if (addedOrders.length > 0) {
          addedOrders.forEach((order) => {
            const customerInfo = order.tableNumber
              ? `${order.customerName} - Mesa ${order.tableNumber}`
              : order.customerName;

            toast.error("¡Nuevo pedido recibido!", {
              description: `${customerInfo} - ${formatPrice(order.total)}`,
              icon: <AlertCircle className="h-4 w-4" />,
              duration: 6000,
            });
          });
        }
      }

      setPreviousOrders(newOrders);
      setOrders(newOrders);
      setLoading(false);

      const newOrdersCount = newOrders.filter(
        (order) => order.status === "nuevo",
      ).length;
      setLastOrderCount(newOrdersCount);
    });

    return unsubscribe;
  }, [previousOrders]);

  const filteredOrders =
    selectedFilter === "todos"
      ? orders
      : orders.filter((order) => order.status === selectedFilter);

  const orderCounts = {
    total: orders.length,
    nuevo: orders.filter((o) => o.status === "nuevo").length,
    "en-preparacion": orders.filter((o) => o.status === "en-preparacion")
      .length,
    listo: orders.filter((o) => o.status === "listo").length,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleUpdateStatus = async (
    orderId: string,
    status: OrderStatus,
    customerName: string,
    total: number,
  ) => {
    const loadingToast = toast.loading("Actualizando estado del pedido...", {
      description: "Guardando cambios",
    });

    try {
      await updateOrderStatus(orderId, status);
      toast.dismiss(loadingToast);

      const statusMessages = {
        "en-preparacion": 'Pedido marcado como "En Preparación"',
        listo: 'Pedido marcado como "Listo"',
        entregado: 'Pedido marcado como "Entregado"',
      };

      toast.success("Estado actualizado correctamente", {
        description: `${statusMessages[status]} - ${customerName}`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.dismiss(loadingToast);
      toast.error("Error al actualizar el estado", {
        description: "Por favor inténtalo de nuevo",
        duration: 4000,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#FF7518" }}
          ></div>
          <p className="text-gray-600">Cargando pedidos desde Firebase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: "#FF7518", opacity: 0.1 }}
              >
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cocina</h1>
                <p className="text-sm text-gray-600">
                  Gestión de pedidos en tiempo real
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                {formatTime(new Date())}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Status Summary */}
      <div className="bg-white border-b px-4 py-3">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {orderCounts.total}
            </div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div>
            <div
              className="text-lg font-bold"
              style={{ color: orderCounts.nuevo > 0 ? "#FF7518" : "#111827" }}
            >
              {orderCounts.nuevo}
            </div>
            <div className="text-xs text-gray-600">Nuevos</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {orderCounts["en-preparacion"]}
            </div>
            <div className="text-xs text-gray-600">En Prep.</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {orderCounts.listo}
            </div>
            <div className="text-xs text-gray-600">Listos</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {statusFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md transition-colors relative ${
                selectedFilter === filter.key
                  ? "text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              style={
                selectedFilter === filter.key
                  ? { backgroundColor: "#FF7518" }
                  : {}
              }
            >
              {filter.label}
              {filter.key !== "todos" &&
                orderCounts[filter.key as keyof typeof orderCounts] > 0 && (
                  <span
                    className={`ml-2 h-5 w-5 rounded-full text-xs flex items-center justify-center ${
                      selectedFilter === filter.key
                        ? "bg-white text-orange"
                        : "bg-orange text-white"
                    }`}
                    style={
                      selectedFilter === filter.key
                        ? { color: "#FF7518" }
                        : { backgroundColor: "#FF7518" }
                    }
                  >
                    {orderCounts[filter.key as keyof typeof orderCounts]}
                  </span>
                )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <main className="p-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <p className="text-gray-500">
              {selectedFilter === "todos"
                ? "No hay pedidos activos. Los nuevos pedidos aparecerán aquí automáticamente."
                : `No hay pedidos ${statusFilters.find((f) => f.key === selectedFilter)?.label.toLowerCase()}`}
            </p>
            {orders.length === 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Los clientes pueden hacer pedidos desde el menú principal
                </p>
                <a
                  href="/menu-cliente"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#FF7518" }}
                >
                  🍽️ Menú de Cliente
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const nextAction = nextStatusActions[order.status];
              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-lg border overflow-hidden transition-transform hover:scale-[1.01] ${
                    order.status === "nuevo"
                      ? "border-orange-300 shadow-lg"
                      : "border-gray-200"
                  }`}
                  style={
                    order.status === "nuevo"
                      ? {
                          borderColor: "#FF7518",
                          animation: "pulse 2s ease-in-out infinite",
                        }
                      : {}
                  }
                >
                  <div className="p-4 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded text-white text-sm font-medium"
                          style={{
                            backgroundColor: statusColors[order.status],
                          }}
                        >
                          {statusLabels[order.status]}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(order.createdAt)}
                        </span>
                        {order.status === "nuevo" && (
                          <span className="text-orange-500">
                            <AlertCircle className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span className="font-medium">
                            {order.customerName}
                          </span>
                        </div>
                        {order.tableNumber && (
                          <div className="flex items-center gap-1">
                            <Hash className="h-3 w-3" />
                            Mesa {order.tableNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 space-y-4">
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-1"
                        >
                          <div className="flex-1">
                            <span className="font-medium">
                              {item.menuItem.name}
                            </span>
                            {item.quantity > 1 && (
                              <span
                                className="font-semibold ml-2 px-2 py-1 rounded text-sm"
                                style={{
                                  color: "#FF7518",
                                  backgroundColor: "#FFF4ED",
                                }}
                              >
                                x{item.quantity}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            {formatPrice(item.menuItem.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 pb-4 flex justify-between items-center">
                      <span className="font-bold text-lg">
                        Total: {formatPrice(order.total)}
                      </span>

                      {nextAction && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              order.id,
                              nextAction.status,
                              order.customerName,
                              order.total,
                            )
                          }
                          className="px-6 py-2 rounded text-white font-medium transition-colors hover:opacity-90"
                          style={{ backgroundColor: "#FF7518" }}
                        >
                          {nextAction.label}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
