import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simple redirect with a short delay to show the loading screen
    const timer = setTimeout(() => {
      navigate("/menu-cliente", { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-6">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: "#FF7518" }}
          >
            🍽️
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Viejo Sabroso
          </h1>
          <p className="text-gray-600">Restaurante tradicional mexicano</p>
        </div>

        <div className="space-y-4">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"
            style={{ borderColor: "#FF7518" }}
          ></div>
          <p className="text-gray-600">Cargando aplicación...</p>
          <div className="text-sm text-gray-400">
            <p>🔥 Conectando con Firebase</p>
            <p>📱 Preparando menú</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-400 space-y-1">
            <p>🔄 Tiempo real con Firebase</p>
            <p>💰 Precios en pesos mexicanos</p>
            <p>📱 Optimizado para móviles</p>
          </div>
        </div>

        {/* Manual navigation buttons */}
        <div className="mt-6 space-y-2">
          <button
            onClick={() => navigate("/menu-cliente")}
            className="w-full px-4 py-2 rounded text-white font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: "#FF7518" }}
          >
            Ir al Menú Principal
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/cocina")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-gray-700 text-sm hover:bg-gray-50"
            >
              👨‍🍳 Cocina
            </button>
            <button
              onClick={() => navigate("/admin-menu")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-gray-700 text-sm hover:bg-gray-50"
            >
              ⚙️ Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
