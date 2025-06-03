function NotFound() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-4">
            ¡Oops! Página no encontrada
          </p>
          <p className="text-gray-500 mb-6">
            La página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="/menu-cliente"
            className="block w-full px-4 py-3 rounded text-white font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: "#FF7518" }}
          >
            🍽️ Ir al Menú Principal
          </a>

          <div className="flex gap-2">
            <a
              href="/cocina"
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              👨‍🍳 Cocina
            </a>
            <a
              href="/admin-menu"
              className="flex-1 px-3 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
            >
              ⚙️ Admin
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            Viejo Sabroso - Auténtica comida mexicana
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
