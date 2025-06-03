import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, ShoppingCart } from "lucide-react";

const sampleMenuItems = [
  {
    id: "1",
    name: "Paella Valenciana",
    description: "Arroz con pollo, verduras y azafrán",
    price: 18.5,
    category: "comida",
    available: true,
  },
  {
    id: "2",
    name: "Tortilla Española",
    description: "Tortilla de patatas casera con cebolla",
    price: 8.9,
    category: "comida",
    available: true,
  },
  {
    id: "3",
    name: "Sangría",
    description: "Sangría tradicional con frutas",
    price: 12.0,
    category: "bebidas",
    available: false,
  },
  {
    id: "4",
    name: "Flan Casero",
    description: "Flan de huevo con caramelo",
    price: 6.5,
    category: "postres",
    available: true,
  },
];

const categories = [
  { value: "comida", label: "Comida" },
  { value: "bebidas", label: "Bebidas" },
  { value: "postres", label: "Postres" },
];

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState(sampleMenuItems);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredItems =
    selectedCategory === "todos"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const toggleAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item,
      ),
    );
    alert("Disponibilidad actualizada");
  };

  const deleteItem = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar "${name}"?`)) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      alert("Producto eliminado");
    }
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
              onClick={() => setShowAddForm(true)}
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
            onClick={() => setSelectedCategory("todos")}
            className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md transition-colors ${
              selectedCategory === "todos"
                ? "text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            style={
              selectedCategory === "todos" ? { backgroundColor: "#FF7518" } : {}
            }
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category.value
                  ? "text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              style={
                selectedCategory === category.value
                  ? { backgroundColor: "#FF7518" }
                  : {}
              }
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items List */}
      <main className="p-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <p className="text-gray-500 mb-4">
              {selectedCategory === "todos"
                ? "No hay productos en el menú"
                : `No hay productos en la categoría ${categories.find((c) => c.value === selectedCategory)?.label}`}
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded text-white transition-colors hover:opacity-90 mx-auto"
              style={{ backgroundColor: "#FF7518" }}
            >
              <Plus className="h-4 w-4" />
              Agregar Primer Producto
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg border overflow-hidden ${
                  !item.available
                    ? "opacity-60 border-gray-300"
                    : "border-gray-200"
                }`}
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p
                              className="text-sm text-gray-600 mt-1"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {item.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            <span className="font-bold text-lg">
                              {formatPrice(item.price)}
                            </span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                              {
                                categories.find(
                                  (c) => c.value === item.category,
                                )?.label
                              }
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => toggleAvailability(item.id)}
                            className="h-8 w-8 p-0 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          >
                            {item.available ? (
                              <Eye className="h-3 w-3" />
                            ) : (
                              <EyeOff className="h-3 w-3 text-gray-500" />
                            )}
                          </button>

                          <button
                            onClick={() =>
                              alert("Función de editar en desarrollo")
                            }
                            className="h-8 w-8 p-0 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>

                          <button
                            onClick={() => deleteItem(item.id, item.name)}
                            className="h-8 w-8 p-0 border border-red-200 rounded flex items-center justify-center text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Agregar Producto</h2>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ "--tw-ring-color": "#FF7518" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  placeholder="Descripción del producto"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio (€) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option value="comida">Comida</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="postres">Postres</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-t flex gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert("Funcionalidad de agregar en desarrollo");
                  setShowAddForm(false);
                }}
                className="flex-1 px-4 py-2 rounded text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#FF7518" }}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

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
            className="flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors text-gray-500 hover:text-gray-700"
          >
            <span className="text-lg mb-1">👨‍🍳</span>
            <span className="text-xs font-medium">Cocina</span>
          </a>
          <a
            href="/admin-menu"
            className="flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors"
            style={{ color: "#FF7518" }}
          >
            <span className="text-lg mb-1">⚙️</span>
            <span className="text-xs font-medium">Admin</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
