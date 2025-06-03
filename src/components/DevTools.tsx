import { useState } from "react";
import { seedDatabase } from "../lib/seedDatabase";
import { toast } from "sonner";

export function DevTools() {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDatabase = async () => {
    if (
      !confirm(
        "¿Estás seguro de que quieres poblar la base de datos con productos de ejemplo? Esto agregará 14 productos mexicanos auténticos.",
      )
    ) {
      return;
    }

    setIsSeeding(true);
    try {
      await seedDatabase();
      toast.success(
        "¡Base de datos poblada exitosamente! Revisa el menú cliente para ver los productos.",
      );
    } catch (error) {
      console.error("Error seeding database:", error);
      toast.error(
        "Error al poblar la base de datos. Revisa la consola para más detalles.",
      );
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
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 shadow-lg max-w-xs">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          🛠️ Herramientas de Desarrollo
        </h3>
        <button
          onClick={handleSeedDatabase}
          disabled={isSeeding}
          className="w-full px-3 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 disabled:opacity-50 mb-2"
        >
          {isSeeding ? "Poblando..." : "Poblar BD con productos"}
        </button>
        <p className="text-xs text-yellow-700">
          Solo visible en desarrollo. Agrega 14 productos mexicanos a Firebase.
        </p>
      </div>
    </div>
  );
}
