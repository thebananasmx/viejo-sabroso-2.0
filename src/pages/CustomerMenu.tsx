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

  const updateCartItemQuantity = (menuItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart((prevCart) =>
        prevCart.filter((item) => item.menuItem.id !== menuItemId),
      );
      toast.info("Producto eliminado del carrito");
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.menuItem.id === menuItemId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
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

  const clearCart = () => {
    setCart([]);
    setShowCart(false);
    toast.success("Carrito vaciado");
  };

  const placeOrder = async (customerName: string, tableNumber?: string) => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    if (!customerName.trim()) {
      toast.error("Por favor ingresa un nombre");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderId = await addOrder({
        customerName: customerName.trim(),
        tableNumber: tableNumber?.trim(),
        items: cart,
        total: getCartTotal(),
      });

      toast.success(
        "¡Pedido realizado con éxito! Se está preparando en cocina.",
      );
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error al realizar el pedido. Inténtalo de nuevo.");
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
                className="p-2 rounded-full"
                style={{ backgroundColor: "rgba(255, 117, 24, 0.1)" }}
              >
                <span className="text-2xl">🍽️</span>
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

      {/* Category Tabs */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`whitespace-nowrap flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeCategory === category.key
                  ? "text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              style={
                activeCategory === category.key
                  ? { backgroundColor: "#FF7518" }
                  : {}
              }
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <main className="p-4 pb-20">
        <div className="grid gap-4">
          {getItemsByCategory(activeCategory).length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-gray-500 mb-4">
                No hay productos disponibles en esta categoría
              </p>
              <p className="text-sm text-gray-400">
                Los productos aparecerán aquí cuando estén disponibles
              </p>
            </div>
          ) : (
            getItemsByCategory(activeCategory).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className="grid grid-cols-12 gap-4 p-4 min-h-[80px] items-center">
                  {/* Columna 1: Imagen (3 columnas) */}
                  <div className="col-span-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={getPlaceholderImage(item)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to a solid color background with emoji if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center text-lg rounded-lg" style="background-color: rgba(255, 117, 24, 0.1)">
                                ${item.category === "comida" ? "🍽️" : item.category === "bebidas" ? "🥤" : "🍰"}
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Columna 2: Nombre y Descripción (6 columnas) */}
                  <div className="col-span-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Columna 3: Precio y Botón (3 columnas) */}
                  <div className="col-span-3 flex flex-col items-end gap-2">
                    <div
                      className="text-lg font-bold text-right"
                      style={{ color: "#FF7518" }}
                    >
                      {formatPrice(item.price)}
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 rounded-full text-white transition-colors hover:opacity-90 flex items-center justify-center"
                      style={{ backgroundColor: "#FF7518" }}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
            {/* Cart Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Carrito de Compras
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Cart Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.menuItem.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.menuItem.price)} c/u
                        </p>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              item.menuItem.id,
                              item.quantity - 1,
                            )
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              item.menuItem.id,
                              item.quantity + 1,
                            )
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="ml-4 text-right">
                        <div className="font-medium text-gray-900">
                          {formatPrice(item.menuItem.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Total:
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: "#FF7518" }}
                  >
                    {formatPrice(getCartTotal())}
                  </span>
                </div>

                <OrderForm
                  onSubmit={placeOrder}
                  isPlacing={isPlacingOrder}
                  onCancel={() => setShowCart(false)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Order Form Component
function OrderForm({
  onSubmit,
  isPlacing,
  onCancel,
}: {
  onSubmit: (name: string, table?: string) => void;
  isPlacing: boolean;
  onCancel: () => void;
}) {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customerName, tableNumber);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="customerName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre del cliente *
        </label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Ingresa tu nombre"
          required
          disabled={isPlacing}
        />
      </div>

      <div>
        <label
          htmlFor="tableNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Número de mesa (opcional)
        </label>
        <input
          type="text"
          id="tableNumber"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Ej: 5"
          disabled={isPlacing}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPlacing}
          className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPlacing || !customerName.trim()}
          className="flex-1 py-2 px-4 text-white rounded transition-colors hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#FF7518" }}
        >
          {isPlacing ? "Realizando..." : "Realizar Pedido"}
        </button>
      </div>
    </form>
  );
}

export default CustomerMenu;
