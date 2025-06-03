import { useState } from "react";
import { ShoppingCart, Plus } from "lucide-react";

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
    available: true,
  },
];

const categories = [
  { key: "comida", label: "Comida" },
  { key: "bebidas", label: "Bebidas" },
  { key: "postres", label: "Postres" },
];

export default function CustomerMenu() {
  const [selectedCategory, setSelectedCategory] = useState("comida");
  const [cartCount, setCartCount] = useState(0);

  const filteredItems = sampleMenuItems.filter(
    (item) => item.category === selectedCategory,
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const addToCart = (item: any) => {
    setCartCount((prev) => prev + 1);
    // Simular feedback
    alert(`${item.name} agregado al carrito!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Viejo Sabroso
              </h1>
              <p className="text-sm text-gray-600">Menú del restaurante</p>
            </div>

            <button
              className="relative h-12 w-12 rounded-full p-0 flex items-center justify-center text-white"
              style={{ backgroundColor: "#FF7518" }}
              disabled={cartCount === 0}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs border-2 border-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category.key
                  ? "text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              style={
                selectedCategory === category.key
                  ? { backgroundColor: "#FF7518" }
                  : {}
              }
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <main className="p-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No hay productos disponibles en esta categoría
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      {formatPrice(item.price)}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="h-10 w-10 rounded-full p-0 flex-shrink-0 flex items-center justify-center text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#FF7518" }}
                      aria-label={`Agregar ${item.name} al carrito`}
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Simple Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 sm:hidden">
        <div className="flex items-center justify-around py-2">
          <a
            href="/menu-cliente"
            className="flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors"
            style={{ color: "#FF7518" }}
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
