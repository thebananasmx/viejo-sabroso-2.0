import { useState } from "react";
import { Clock, User, Hash, ShoppingCart } from "lucide-react";

const sampleOrders = [
  {
    id: "1",
    customerName: "María García",
    tableNumber: "5",
    items: [
      { name: "Paella Valenciana", quantity: 2, price: 18.5 },
      { name: "Sangría", quantity: 1, price: 12.0 },
    ],
    total: 49.0,
    status: "nuevo",
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
  },
  {
    id: "2",
    customerName: "Carlos López",
    tableNumber: "3",
    items: [{ name: "Tortilla Española", quantity: 1, price: 8.9 }],
    total: 8.9,
    status: "en-preparacion",
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutos atrás
  },
];

const statusLabels = {
  nuevo: "Nuevo",
  "en-preparacion": "En Preparación",
  listo: "Listo",
  entregado: "Entregado",
};

const statusColors = {
  nuevo: "#FF7518",
  "en-preparacion": "#3B82F6",
  listo: "#10B981",
  entregado: "#6B7280",
};

const nextActions = {
  nuevo: { status: "en-preparacion", label: "Preparar" },
  "en-preparacion": { status: "listo", label: "Marcar Listo" },
  listo: { status: "entregado", label: "Entregar" },
  entregado: null,
};

export default function Kitchen() {
  const [orders, setOrders] = useState(sampleOrders);
  const [selectedFilter, setSelectedFilter] = useState("todos");

  const filteredOrders =
    selectedFilter === "todos"
      ? orders
      : orders.filter((order) => order.status === selectedFilter);

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

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
    alert("Estado del pedido actualizado");
  };

  const orderCounts = {
    total: orders.length,
    nuevo: orders.filter((o) => o.status === "nuevo").length,
    "en-preparacion": orders.filter((o) => o.status === "en-preparacion")
      .length,
    listo: orders.filter((o) => o.status === "listo").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 sm:pb-0">
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
                <p className="text-sm text-gray-600">Gestión de pedidos</p>
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

      {/* Orders List */}
      <main className="p-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍🍳</span>
            </div>
            <p className="text-gray-500">No hay pedidos activos</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const nextAction = nextActions[order.status];
              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-lg border overflow-hidden ${
                    order.status === "nuevo"
                      ? "border-orange-300"
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
                          className="px-2 py-1 rounded text-white text-sm font-medium"
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
                  </div>

                  <div className="px-4 space-y-4">
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <div className="flex-1">
                            <span className="font-medium">{item.name}</span>
                            {item.quantity > 1 && (
                              <span
                                className="font-semibold ml-1"
                                style={{ color: "#FF7518" }}
                              >
                                x{item.quantity}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 pb-4 flex justify-between items-center">
                      <span className="font-semibold">
                        Total: {formatPrice(order.total)}
                      </span>

                      {nextAction && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, nextAction.status)
                          }
                          className="text-sm px-4 py-2 rounded text-white transition-colors hover:opacity-90"
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

      {/* Simple Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden">
        <div className="flex items-center justify-around py-2">
          <a
            href="/menu-cliente"
            className="flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors text-gray-500 hover:text-gray-700"
          >
            <ShoppingCart className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Menú</span>
          </a>
          <a
            href="/cocina"
            className="flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors"
            style={{ color: "#FF7518" }}
          >
            <span className="text-lg mb-1">👨‍🍳</span>
            <span className="text-xs font-medium">Cocina</span>
          </a>
          <a
            href="/admin-menu"
            className="flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors text-gray-500 hover:text-gray-700"
          >
            <span className="text-lg mb-1">⚙️</span>
            <span className="text-xs font-medium">Admin</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
