import { useState } from "react";
import { ShoppingCart, Plus } from "lucide-react";
import { useRealtimeMenuItems } from "../hooks/useRealtimeMenuItems";
import { useSettings } from "../contexts/SettingsContext";
import { addOrder } from "../lib/firestore";
import { CartItem, MenuItem } from "../types";
import { toast } from "sonner";

function CustomerMenu() {
  const { menuItems, availableItems, getItemsByCategory, loading, error } =
    useRealtimeMenuItems();
  const { settings } = useSettings();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<MenuItem["category"]>("comida");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  // Function to get placeholder image based on category and item name
  const getPlaceholderImage = (item: MenuItem) => {
    if (item.imageUrl) return item.imageUrl;

    // Generate placeholder images based on category and name
    const seed = item.name.toLowerCase().replace(/\s+/g, "-");

    if (item.category === "comida") {
      return `https://picsum.photos/seed/${seed}-food/200/200`;
    } else if (item.category === "bebidas") {
      return `https://picsum.photos/seed/${seed}-drink/200/200`;
    } else {
      return `https://picsum.photos/seed/${seed}-dessert/200/200`;
    }
  };

  const addToCart = (menuItem: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.menuItem.id === menuItem.id,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { menuItem, quantity: 1 }];
      }
    });

    toast.success(`${menuItem.name} agregado al carrito`);
  };

  const removeFromCart = (menuItemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.menuItem.id !== menuItemId),
    );
  };

  const updateQuantity = (menuItemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(menuItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItem.id === menuItemId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0,
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    if (!customerName.trim()) {
      toast.error("Por favor ingresa tu nombre");
      return;
    }

    setIsPlacingOrder(true);

    try {
      await addOrder({
        customerName: customerName.trim(),
        tableNumber: tableNumber.trim() || undefined,
        items: cart,
        total: getCartTotal(),
      });

      setCart([]);
      setShowCart(false);
      setCustomerName("");
      setTableNumber("");
      toast.success("¡Orden enviada exitosamente!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error al enviar la orden");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const categories = [
    { key: "comida" as const, label: "Comida", icon: "🍽️" },
    { key: "bebidas" as const, label: "Bebidas", icon: "🥤" },
    { key: "postres" as const, label: "Postres", icon: "🍰" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando menú desde Firebase...</p>
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
                className="p-2 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255, 117, 24, 0.1)" }}
              >
                {settings.headerIcon?.startsWith("http") ? (
                  <img
                    src={settings.headerIcon}
                    alt="Icono del restaurante"
                    className="w-8 h-8 object-contain sm:w-8 sm:h-8 max-sm:w-full max-sm:flex-grow"
                  />
                ) : (
                  <span className="text-2xl">
                    {settings.headerIcon || "🍽️"}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {settings.headerTitle}
                </h1>
                <p className="text-sm text-gray-600">
                  {settings.headerSubtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {getCartItemCount() > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 text-xs text-white rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FF7518" }}
                >
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.key
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor:
                  activeCategory === category.key ? "#FF7518" : undefined,
              }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 pb-20">
        <div className="space-y-4">
          {getItemsByCategory(activeCategory).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border shadow-sm overflow-hidden"
            >
              <div className="grid grid-cols-12 gap-4 p-4 min-h-[80px] items-center">
                {/* Column 1: Image (25%) */}
                <div className="col-span-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={getPlaceholderImage(item)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Column 2: Info (50%) */}
                <div className="col-span-6">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  {!item.available && (
                    <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded mt-1">
                      No disponible
                    </span>
                  )}
                </div>

                {/* Column 3: Price/Action (25%) */}
                <div className="col-span-3 text-right max-sm:flex max-sm:flex-col">
                  <div className="font-bold text-lg text-gray-900 mb-2">
                    {formatPrice(item.price)}
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.available}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed max-sm:ml-auto max-sm:justify-center max-sm:items-center"
                    style={{
                      backgroundColor: item.available ? "#FF7518" : "#9CA3AF",
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getItemsByCategory(activeCategory).length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <p className="text-gray-600">
              No hay productos disponibles en esta categoría
            </p>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md max-h-[90vh] rounded-lg flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Carrito</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-6xl mb-4">🛒</div>
                  <p className="text-gray-600">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.menuItem.name}</h4>
                        <p className="text-gray-600">
                          {formatPrice(item.menuItem.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.menuItem.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.menuItem.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: "#FF7518" }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t space-y-4">
                {/* Customer Information */}
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nombre *
                    </label>
                    <input
                      id="customerName"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ingresa tu nombre"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tableNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Número de Mesa (opcional)
                    </label>
                    <input
                      id="tableNumber"
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Ej: Mesa 5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Total and Order Button */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-xl font-bold">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder || !customerName.trim()}
                    className="w-full py-3 text-white rounded-lg font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#FF7518" }}
                  >
                    {isPlacingOrder ? "Enviando..." : "Realizar Pedido"}
                  </button>
                  {!customerName.trim() && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Ingresa tu nombre para continuar
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerMenu;
