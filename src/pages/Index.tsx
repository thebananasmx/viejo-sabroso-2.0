import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMenuItems } from "@/lib/firestore";

const Index = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(true);
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFirebaseConnection = async () => {
      try {
        console.log("🔥 Validando conexión con Firebase...");

        // Test Firebase connection using our existing function
        await getMenuItems();

        console.log("✅ Firebase conectado correctamente");
        setFirebaseConnected(true);
        setError(null);

        // Redirect after successful connection
        setTimeout(() => {
          navigate("/menu-cliente", { replace: true });
        }, 1000);
      } catch (err) {
        console.error("❌ Error conectando con Firebase:", err);
        setError("Error de conexión con Firebase");
        setFirebaseConnected(false);

        // Redirect anyway after 3 seconds
        setTimeout(() => {
          navigate("/menu-cliente", { replace: true });
        }, 3000);
      } finally {
        setIsConnecting(false);
      }
    };

    testFirebaseConnection();
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
          {isConnecting ? (
            <>
              <div
                className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"
                style={{ borderColor: "#FF7518" }}
              ></div>
              <p className="text-gray-600">Conectando con Firebase...</p>
              <div className="text-sm text-gray-400">
                <p>🔥 Validando base de datos</p>
                <p>📱 Preparando aplicación</p>
              </div>
            </>
          ) : firebaseConnected ? (
            <>
              <div className="text-green-600 text-4xl mb-2">✅</div>
              <p className="text-green-600 font-medium">¡Conexión exitosa!</p>
              <p className="text-gray-600">Redirigiendo al menú...</p>
            </>
          ) : (
            <>
              <div className="text-orange-500 text-4xl mb-2">⚠️</div>
              <p className="text-orange-600 font-medium">
                Advertencia de conexión
              </p>
              <p className="text-gray-600 text-sm">{error}</p>
              <p className="text-gray-500 text-sm">
                Continuando en modo local...
              </p>
            </>
          )}
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
