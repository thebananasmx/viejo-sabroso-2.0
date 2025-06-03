import { useState } from "react";
import { Clock } from "lucide-react";
import { useRealtimeOrders } from "../hooks/useRealtimeOrders";
import { updateOrderStatus } from "../lib/firestore";
import { Order, OrderStatus } from "../types";
import { toast } from "sonner";

type FilterStatus = "todos" | "nuevo" | "en-preparacion" | "listo";

function Kitchen() {
  const { orders, stats, loading, error } = useRealtimeOrders();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("todos");

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "nuevo":
        return "#FF7518";
      case "en-preparacion":
        return "#3B82F6";
      case "listo":
        return "#10B981";
      case "entregado":
        return "#6B7280";
      default:
        return "#6B7280";
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "nuevo":
        return "Nuevo";
      case "en-preparacion":
        return "En Preparación";
      case "listo":
        return "Listo";
      case "entregado":
        return "Entregado";
      default:
        return status;
    }
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case "nuevo":
        return "en-preparacion";
      case "en-preparacion":
        return "listo";
      case "listo":
        return "entregado";
      default:
        return null;
    }
  };

  const getStatusButtonText = (status: OrderStatus) => {
    switch (status) {
      case "nuevo":
        return "Iniciar Preparación";
      case "en-preparacion":
        return "Marcar como Listo";
      case "listo":
        return "Entregar Pedido";
      default:
        return "";
    }
  };

  const handleStatusUpdate = async (
    orderId: string,
    currentStatus: OrderStatus,
  ) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return;

    try {
      await updateOrderStatus(orderId, nextStatus);
      toast.success(
        `Pedido marcado como ${getStatusText(nextStatus).toLowerCase()}`,
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error al actualizar el estado del pedido");
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "todos") return true;
    return order.status === activeFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedidos desde Firebase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Reintentar
          </button>
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
                style={{ backgroundColor: "rgba(255, 117, 24, 0.1)" }}
              >
                <span className="text-2xl" style={{ opacity: 1 }}>
                  👨‍🍳
                </span>
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
            <div className="text-lg font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div>
            <div className="text-lg font-bold" style={{ color: "#FF7518" }}>
              {stats.nuevo}
            </div>
            <div className="text-xs text-gray-600">Nuevos</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {stats.enPreparacion}
            </div>
            <div className="text-xs text-gray-600">En Prep.</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {stats.listo}
            </div>
            <div className="text-xs text-gray-600">Listos</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: "todos", label: "Todos" },
            { key: "nuevo", label: "Nuevos" },
            { key: "en-preparacion", label: "En Prep." },
            { key: "listo", label: "Listos" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as FilterStatus)}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md transition-colors ${
                activeFilter === filter.key
                  ? "text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              style={
                activeFilter === filter.key
                  ? { backgroundColor: "#FF7518" }
                  : {}
              }
            >
              {filter.label}
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
            <p className="text-gray-500 mb-4">
              {activeFilter === "todos"
                ? "No hay pedidos activos. Los nuevos pedidos aparecerán aquí automáticamente."
                : `No hay pedidos ${activeFilter === "nuevo" ? "nuevos" : activeFilter === "en-preparacion" ? "en preparación" : "listos"}.`}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Los clientes pueden hacer pedidos desde el menú principal
            </p>
            <a
              href="/menu-cliente"
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#FF7518" }}
            >
              🍽️ Ir al Menú
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border p-4"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.customerName}
                    </h3>
                    {order.tableNumber && (
                      <p className="text-sm text-gray-600">
                        Mesa {order.tableNumber}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {formatTime(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusText(order.status)}
                    </div>
                    <div className="text-lg font-bold text-gray-900 mt-1">
                      {formatPrice(order.total)}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-t border-gray-100"
                    >
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">
                          {item.quantity}x {item.menuItem.name}
                        </span>
                        {item.menuItem.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.menuItem.description}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-600 ml-4">
                        {formatPrice(item.menuItem.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                {order.status !== "entregado" && (
                  <button
                    onClick={() => handleStatusUpdate(order.id, order.status)}
                    className="w-full py-2 px-4 rounded text-white font-medium transition-colors hover:opacity-90"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusButtonText(order.status)}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Navigation Links */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <a
          href="/menu-cliente"
          className="px-3 py-2 text-white rounded-lg text-sm hover:opacity-90 transition-colors shadow-lg"
          style={{ backgroundColor: "#FF7518" }}
        >
          🍽️ Menú
        </a>
        <a
          href="/admin-menu"
          className="px-3 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors shadow-lg"
        >
          ⚙️ Admin
        </a>
      </div>

      {/* Status indicator for real-time connection */}
      <div className="fixed top-4 left-4 z-30">
        <div className="bg-blue-100 border border-blue-300 rounded-lg px-3 py-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-700">
              Firebase conectado ({orders.length} pedidos activos)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kitchen;
