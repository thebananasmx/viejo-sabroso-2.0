import { useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useRealtimeMenuItems } from "../hooks/useRealtimeMenuItems";
import { addMenuItem, updateMenuItem, deleteMenuItem } from "../lib/firestore";
import { MenuItem } from "../types";
import { toast } from "sonner";

function AdminMenu() {
  const { menuItems, loading, error } = useRealtimeMenuItems();
  const [activeCategory, setActiveCategory] = useState<
    MenuItem["category"] | "todos"
  >("todos");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);
  };

  const getFilteredItems = () => {
    if (activeCategory === "todos") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  };

  const getCategoryCount = (category: MenuItem["category"] | "todos") => {
    if (category === "todos") return menuItems.length;
    return menuItems.filter((item) => item.category === category).length;
  };

  const handleAddItem = async (
    itemData: Omit<MenuItem, "id" | "createdAt" | "updatedAt">,
  ) => {
    setIsSubmitting(true);
    try {
      await addMenuItem(itemData);
      toast.success("Producto agregado con éxito");
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Error al agregar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateItem = async (id: string, updates: Partial<MenuItem>) => {
    setIsSubmitting(true);
    try {
      await updateMenuItem(id, updates);
      toast.success("Producto actualizado con éxito");
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Error al actualizar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar "${name}"?`)) return;

    try {
      await deleteMenuItem(id);
      toast.success("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error al eliminar el producto");
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      await updateMenuItem(item.id, { available: !item.available });
      toast.success(`Producto ${!item.available ? "activado" : "desactivado"}`);
    } catch (error) {
      console.error("Error toggling availability:", error);
      toast.error("Error al cambiar la disponibilidad");
    }
  };

  const categories = [
    { key: "todos" as const, label: "Todos", icon: "📋" },
    { key: "comida" as const, label: "Comida", icon: "🍽️" },
    { key: "bebidas" as const, label: "Bebidas", icon: "🥤" },
    { key: "postres" as const, label: "Postres", icon: "🍰" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando menú...</p>
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
              onClick={() => setShowAddModal(true)}
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
              {category.label} ({getCategoryCount(category.key)})
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items List */}
      <main className="p-4">
        {getFilteredItems().length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500 mb-4">
              {activeCategory === "todos"
                ? "No hay productos en el menú"
                : `No hay productos en la categoría ${activeCategory}`}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#FF7518" }}
            >
              <Plus className="h-4 w-4" />
              Agregar primer producto
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {getFilteredItems().map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg shadow-sm border p-4 ${
                  !item.available ? "opacity-60" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.available ? "Disponible" : "No disponible"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span
                        className="text-xl font-bold"
                        style={{ color: "#FF7518" }}
                      >
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleToggleAvailability(item)}
                      className={`p-2 rounded-full transition-colors ${
                        item.available
                          ? "text-green-600 hover:bg-green-50"
                          : "text-red-600 hover:bg-red-50"
                      }`}
                      title={item.available ? "Desactivar" : "Activar"}
                    >
                      {item.available ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 rounded-full text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id, item.name)}
                      className="p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <ItemModal
          item={editingItem}
          onSubmit={
            editingItem
              ? (data) => handleUpdateItem(editingItem.id, data)
              : handleAddItem
          }
          onCancel={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          isSubmitting={isSubmitting}
        />
      )}

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

// Item Modal Component
function ItemModal({
  item,
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  item?: MenuItem | null;
  onSubmit: (data: Omit<MenuItem, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || 0,
    category: item?.category || ("comida" as MenuItem["category"]),
    available: item?.available ?? true,
    imageUrl: item?.imageUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("El nombre es requerido");
      return;
    }

    if (formData.price <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: formData.price,
      category: formData.category,
      available: formData.available,
      imageUrl: formData.imageUrl.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {item ? "Editar Producto" : "Agregar Producto"}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Nombre del producto"
              required
              disabled={isSubmitting}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Descripción del producto"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio (MXN) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              disabled={isSubmitting}
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
                  category: e.target.value as MenuItem["category"],
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              required
              disabled={isSubmitting}
            >
              <option value="comida">Comida</option>
              <option value="bebidas">Bebidas</option>
              <option value="postres">Postres</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de imagen (opcional)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="https://..."
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center">
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
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              disabled={isSubmitting}
            />
            <label
              htmlFor="available"
              className="ml-2 block text-sm text-gray-900"
            >
              Producto disponible
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 text-white rounded transition-colors hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#FF7518" }}
            >
              {isSubmitting ? "Guardando..." : item ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminMenu;
