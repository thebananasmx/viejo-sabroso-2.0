import { useState } from "react";
import { seedDatabase } from "../lib/seedDatabase";
import { toast } from "sonner";

export function DevTools() {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDatabase = async () => {
    if (
      !confirm(
        "¿Estás seguro de que quieres poblar la base de datos con productos de ejemplo?",
      )
    ) {
      return;
    }

    setIsSeeding(true);
    try {
      await seedDatabase();
      toast.success("Base de datos poblada exitosamente!");
    } catch (error) {
      console.error("Error seeding database:", error);
      toast.error("Error al poblar la base de datos");
    } finally {
      setIsSeeding(false);
    }
  };

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 shadow-lg">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          🛠️ Herramientas de Desarrollo
        </h3>
        <button
          onClick={handleSeedDatabase}
          disabled={isSeeding}
          className="w-full px-3 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 disabled:opacity-50"
        >
          {isSeeding ? "Poblando..." : "Poblar BD con productos"}
        </button>
        <p className="text-xs text-yellow-700 mt-1">
          Solo visible en desarrollo
        </p>
      </div>
    </div>
  );
}
