export default function AdminMenu() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Administración
              </h1>
              <p className="text-sm text-gray-600">
                Gestión de menú e inventario
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">
            Panel de Administración
          </h2>
          <p className="text-gray-600 mb-4">
            Aquí podrás gestionar el menú del restaurante
          </p>
          <div className="bg-orange w-12 h-12 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white font-bold">⚙️</span>
          </div>
        </div>
      </main>
    </div>
  );
}
