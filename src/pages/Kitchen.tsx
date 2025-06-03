import { Clock } from "lucide-react";

function Kitchen() {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

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
            <div className="text-lg font-bold text-gray-900">0</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div>
            <div className="text-lg font-bold" style={{ color: "#FF7518" }}>
              0
            </div>
            <div className="text-xs text-gray-600">Nuevos</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">0</div>
            <div className="text-xs text-gray-600">En Prep.</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">0</div>
            <div className="text-xs text-gray-600">Listos</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          <button
            className="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md transition-colors text-white"
            style={{ backgroundColor: "#FF7518" }}
          >
            Todos
          </button>
          <button className="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50">
            Nuevos
          </button>
          <button className="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50">
            En Prep.
          </button>
          <button className="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50">
            Listos
          </button>
        </div>
      </div>

      {/* Orders List */}
      <main className="p-4">
        <div className="text-center py-12">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👨‍🍳</span>
          </div>
          <p className="text-gray-500 mb-4">
            No hay pedidos activos. Los nuevos pedidos aparecerán aquí
            automáticamente.
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
    </div>
  );
}

export default Kitchen;
