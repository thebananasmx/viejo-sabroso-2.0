import { useState, useEffect } from "react";
import { ShoppingCart, Plus } from "lucide-react";
import { MenuItem, CartItem, MenuCategory } from "../types";
import { subscribeToMenuItems, addOrder } from "../lib/firestore";
import { toast } from "sonner";

const categories = [
  { key: "comida", label: "Comida" },
  { key: "bebidas", label: "Bebidas" },
  { key: "postres", label: "Postres" },
];

function CustomerMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>("comida");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("🔥 Conectando con Firebase para obtener productos...");

    const unsubscribe = subscribeToMenuItems((items) => {
      console.log("📦 Productos recibidos de Firebase:", items.length);
      setMenuItems(items.filter((item) => item.available));
      setLoading(false);
      setError(null);
    });

    return unsubscribe;
  }, []);

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory,
  );
  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0,
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.menuItem.id === menuItem.id,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { menuItem, quantity: 1 }];
    });

    toast.success(`${menuItem.name} agregado al carrito`, {
      description: `${formatPrice(menuItem.price)} - ${cartItemsCount + 1} producto(s) en el carrito`,
      duration: 2000,
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      const item = cartItems.find((item) => item.menuItem.id === itemId);
      setCartItems((prev) =>
        prev.filter((item) => item.menuItem.id !== itemId),
      );
      if (item) {
        toast.info(`${item.menuItem.name} eliminado del carrito`, {
          duration: 2000,
        });
      }
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (itemId: string) => {
    const item = cartItems.find((item) => item.menuItem.id === itemId);
    setCartItems((prev) => prev.filter((item) => item.menuItem.id !== itemId));
    if (item) {
      toast.info(`${item.menuItem.name} eliminado del carrito`, {
        duration: 2000,
      });
    }
  };

  const placeOrder = async () => {
    if (!customerName.trim() || cartItems.length === 0) {
      toast.error("Por favor ingresa tu nombre y agrega productos al carrito", {
        description: "Todos los campos marcados con * son obligatorios",
        duration: 4000,
      });
      return;
    }

    const loadingToast = toast.loading("Realizando pedido...", {
      description: "Enviando tu pedido al sistema",
    });

    try {
      await addOrder({
        customerName: customerName.trim(),
        tableNumber: tableNumber.trim() || undefined,
        items: cartItems,
        total: cartTotal,
      });

      setCartItems([]);
      setCustomerName("");
      setTableNumber("");
      setIsCartOpen(false);

      toast.dismiss(loadingToast);
      toast.success("¡Pedido realizado con éxito!", {
        description: `Total: ${formatPrice(cartTotal)} - El personal de cocina ha sido notificado`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.dismiss(loadingToast);
      toast.error("Error al realizar el pedido", {
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
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: "#FF7518" }}
          >
            🍽️
          </div>
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#FF7518" }}
          ></div>
          <p className="text-gray-600">Cargando menú desde Firebase...</p>
          <p className="text-sm text-gray-400 mt-2">
            Conectando con base de datos
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Error de Conexión
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#FF7518" }}
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Viejo Sabroso
              </h1>
              <p className="text-sm text-gray-600">
                Auténtica comida mexicana - {menuItems.length} productos
                disponibles
              </p>
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
          {categories.map((category) => {
            const categoryCount = menuItems.filter(
              (item) => item.category === category.key,
            ).length;
            return (
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
                {category.label} ({categoryCount})
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Items */}
      <main className="p-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <p className="text-gray-500 mb-4">
              {menuItems.length === 0
                ? "No hay productos en el menú. Ve al panel de administración para agregar productos."
                : "No hay productos disponibles en esta categoría"}
            </p>
            {menuItems.length === 0 && (
              <a
                href="/admin-menu"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#FF7518" }}
              >
                <span className="text-lg">⚙️</span>
                Ir a Administración
              </a>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-transform hover:scale-105"
              >
                {item.imageUrl && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg leading-tight">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}
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
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.menuItem.id,
                                item.quantity - 1,
                              )
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
                              updateCartQuantity(
                                item.menuItem.id,
                                item.quantity + 1,
                              )
                            }
                            className="h-8 w-8 p-0 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeFromCart(item.menuItem.id)}
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
