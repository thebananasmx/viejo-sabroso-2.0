import { Plus } from "lucide-react";

function AdminMenu() {
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
                <span className="text-2xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Administración
                </h1>
                <p className="text-sm text-gray-600">
                  Gestión de menú e inventario
                </p>
              </div>
            </div>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#FF7518" }}
            >
              <Plus className="h-4 w-4" />
              Agregar
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          <button
            className="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md text-white transition-colors"
            style={{ backgroundColor: "#FF7518" }}
          >
            Todos (0)
          </button>
          <button className="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            Comida (0)
          </button>
          <button className="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            Bebidas (0)
          </button>
          <button className="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            Postres (0)
          </button>
        </div>
      </div>

      {/* Menu Items List */}
      <main className="p-4">
        <div className="text-center py-12">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚙️</span>
          </div>
          <p className="text-gray-500 mb-4">
            No hay productos en el menú. ¡Agrega el primer producto!
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Aquí podrás gestionar los productos del menú del restaurante
          </p>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded text-white transition-colors hover:opacity-90 mx-auto"
            style={{ backgroundColor: "#FF7518" }}
          >
            <Plus className="h-4 w-4" />
            Agregar Primer Producto
          </button>
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
          href="/cocina"
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-lg"
        >
          👨‍🍳 Cocina
        </a>
      </div>
    </div>
  );
}

export default AdminMenu;
