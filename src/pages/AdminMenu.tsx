import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, ShoppingCart } from "lucide-react";
import { MenuItem, MenuCategory } from "@/types";
import {
  subscribeToMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "@/lib/firestore";

const categories: { value: MenuCategory; label: string }[] = [
  { value: "comida", label: "Comida" },
  { value: "bebidas", label: "Bebidas" },
  { value: "postres", label: "Postres" },
];

interface MenuItemFormData {
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  imageUrl: string;
  available: boolean;
}

const initialFormData: MenuItemFormData = {
  name: "",
  description: "",
  price: 0,
  category: "comida",
  imageUrl: "",
  available: true,
};

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    MenuCategory | "todos"
  >("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuItemFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToMenuItems((items) => {
      setMenuItems(items);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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

  const handleOpenDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        imageUrl: item.imageUrl || "",
        available: item.available,
      });
    } else {
      setEditingItem(null);
      setFormData(initialFormData);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price <= 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, {
          ...formData,
          imageUrl: formData.imageUrl || undefined,
        });
        alert("Producto actualizado correctamente");
      } else {
        await addMenuItem({
          ...formData,
          imageUrl: formData.imageUrl || undefined,
        });
        alert("Producto agregado correctamente");
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert("Error al guardar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item: MenuItem) => {
    if (!confirm(`¿Estás seguro de eliminar "${item.name}"?`)) return;

    try {
      await deleteMenuItem(item.id);
      alert("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Error al eliminar el producto");
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      await updateMenuItem(item.id, { available: !item.available });
      alert(
        item.available
          ? "Producto marcado como no disponible"
          : "Producto marcado como disponible",
      );
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Error al actualizar la disponibilidad");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#FF7518" }}
          ></div>
          <p className="text-gray-600">Cargando menú desde Firebase...</p>
        </div>
      </div>
    );
  }

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
              onClick={() => handleOpenDialog()}
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
            Todos ({menuItems.length})
          </button>
          {categories.map((category) => {
            const count = menuItems.filter(
              (item) => item.category === category.value,
            ).length;
            return (
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
                {category.label} ({count})
              </button>
            );
          })}
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
                ? "No hay productos en el menú. ¡Agrega el primer producto!"
                : `No hay productos en la categoría ${categories.find((c) => c.value === selectedCategory)?.label}`}
            </p>
            <button
              onClick={() => handleOpenDialog()}
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
                className={`bg-white rounded-lg border overflow-hidden transition-transform hover:scale-[1.01] ${
                  !item.available
                    ? "opacity-60 border-gray-300"
                    : "border-gray-200"
                }`}
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    {item.imageUrl && (
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

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
                            <span
                              className="text-xs px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: "#FFF4ED",
                                color: "#FF7518",
                              }}
                            >
                              {
                                categories.find(
                                  (c) => c.value === item.category,
                                )?.label
                              }
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                item.available
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {item.available ? "Disponible" : "No disponible"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleToggleAvailability(item)}
                            className="h-8 w-8 p-0 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                            title={
                              item.available
                                ? "Marcar como no disponible"
                                : "Marcar como disponible"
                            }
                          >
                            {item.available ? (
                              <Eye className="h-3 w-3 text-green-600" />
                            ) : (
                              <EyeOff className="h-3 w-3 text-gray-500" />
                            )}
                          </button>

                          <button
                            onClick={() => handleOpenDialog(item)}
                            className="h-8 w-8 p-0 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                            title="Editar producto"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>

                          <button
                            onClick={() => handleDelete(item)}
                            className="h-8 w-8 p-0 border border-red-200 rounded flex items-center justify-center text-red-600 hover:text-red-700 hover:border-red-300 transition-colors"
                            title="Eliminar producto"
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

      {/* Add/Edit Form Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">
                {editingItem ? "Editar Producto" : "Agregar Producto"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Nombre del producto"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": "#FF7518" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descripción del producto"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": "#FF7518" }}
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
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value) || 0,
                    }))
                  }
                  placeholder="0.00"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": "#FF7518" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value as MenuCategory,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": "#FF7518" }}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de Imagen (opcional)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      imageUrl: e.target.value,
                    }))
                  }
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": "#FF7518" }}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      available: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300"
                />
                <label
                  htmlFor="available"
                  className="text-sm font-medium text-gray-700"
                >
                  Disponible para venta
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={
                    !formData.name.trim() || formData.price <= 0 || isSubmitting
                  }
                  className="flex-1 px-4 py-2 rounded text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#FF7518" }}
                >
                  {isSubmitting
                    ? "Guardando..."
                    : editingItem
                      ? "Actualizar"
                      : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
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
