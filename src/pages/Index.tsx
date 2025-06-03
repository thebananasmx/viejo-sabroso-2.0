import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to customer menu after 2 seconds
    const timer = setTimeout(() => {
      navigate("/menu-cliente");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div
          className="p-6 rounded-full mb-6 mx-auto w-24 h-24 flex items-center justify-center"
          style={{ backgroundColor: "rgba(255, 117, 24, 0.1)" }}
        >
          <span className="text-4xl">🍽️</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Viejo Sabroso</h1>
        <p className="text-lg text-gray-600 mb-8">Auténtica comida mexicana</p>

        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <a
            href="/menu-cliente"
            className="w-full py-3 px-6 text-white rounded-lg font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: "#FF7518" }}
          >
            🍽️ Ver Menú (Clientes)
          </a>

          <a
            href="/cocina"
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            👨‍🍳 Cocina
          </a>

          <a
            href="/admin-menu"
            className="w-full py-3 px-6 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            ⚙️ Administración
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Redirigiendo al menú automáticamente...
        </p>
      </div>
    </div>
  );
}

export default Index;
