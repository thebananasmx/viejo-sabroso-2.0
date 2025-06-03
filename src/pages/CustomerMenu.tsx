import { useState } from "react";
import { ShoppingCart, Plus } from "lucide-react";

// Mock data for restaurant menu
const menuData = [
  {
    id: "1",
    name: "Tacos al Pastor",
    description: "Deliciosos tacos con carne al pastor, piña y salsa verde",
    price: 85.0,
    category: "comida",
    available: true,
  },
  {
    id: "2",
    name: "Quesadilla de Flor de Calabaza",
    description: "Quesadilla artesanal con flor de calabaza y queso oaxaca",
    price: 65.0,
    category: "comida",
    available: true,
  },
  {
    id: "3",
    name: "Pozole Rojo",
    description: "Tradicional pozole rojo con cerdo y acompañamientos",
    price: 120.0,
    category: "comida",
    available: true,
  },
  {
    id: "4",
    name: "Agua de Horchata",
    description: "Refrescante agua de horchata casera",
    price: 35.0,
    category: "bebidas",
    available: true,
  },
  {
    id: "5",
    name: "Agua de Jamaica",
    description: "Agua fresca de flor de jamaica",
    price: 30.0,
    category: "bebidas",
    available: true,
  },
  {
    id: "6",
    name: "Flan Napolitano",
    description: "Flan casero con caramelo tradicional",
    price: 45.0,
    category: "postres",
    available: true,
  },
  {
    id: "7",
    name: "Tres Leches",
    description: "Pastel tres leches con canela",
    price: 55.0,
    category: "postres",
    available: true,
  },
];

const categories = [
  { key: "comida", label: "Comida" },
  { key: "bebidas", label: "Bebidas" },
  { key: "postres", label: "Postres" },
];

function CustomerMenu() {
  const [selectedCategory, setSelectedCategory] = useState("comida");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const filteredItems = menuData.filter(
    (item) => item.category === selectedCategory,
  );
  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const addToCart = (menuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === menuItem.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const placeOrder = () => {
    if (!customerName.trim() || cartItems.length === 0) {
      alert("Por favor ingresa tu nombre y agrega productos al carrito");
      return;
    }

    // Simulate order placement
    console.log("Pedido realizado:", {
      customerName: customerName.trim(),
      tableNumber: tableNumber.trim() || null,
      items: cartItems,
      total: cartTotal,
      timestamp: new Date().toISOString(),
    });

    alert(
      `¡Pedido realizado con éxito!\nTotal: ${formatPrice(cartTotal)}\nCliente: ${customerName}`,
    );

    // Reset form
    setCartItems([]);
    setCustomerName("");
    setTableNumber("");
    setIsCartOpen(false);
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
              <p className="text-sm text-gray-600">Auténtica comida mexicana</p>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative h-12 w-12 rounded-full p-0 flex items-center justify-center text-white transition-colors hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#FF7518" }}
              disabled={cartItemsCount === 0}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs border-2 border-white flex items-center justify-center font-bold">
                  {cartItemsCount}
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-transform hover:scale-105"
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
      </main>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-hidden rounded-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Mi Pedido</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="h-8 w-8 p-0 flex items-center justify-center text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-0">
              {cartItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Tu carrito está vacío
                </div>
              ) : (
                <>
                  <div className="max-h-60 overflow-y-auto p-4 space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 p-0 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>

                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 p-0 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0 flex items-center justify-center text-red-600 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t p-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Tu nombre"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mesa (opcional)
                        </label>
                        <input
                          type="text"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          placeholder="Número de mesa"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <button
                        onClick={placeOrder}
                        disabled={!customerName.trim()}
                        className="w-full px-4 py-3 rounded text-white font-medium transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: "#FF7518" }}
                      >
                        Realizar Pedido
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <a
          href="/cocina"
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-lg"
        >
          👨‍🍳 Cocina
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

export default CustomerMenu;
