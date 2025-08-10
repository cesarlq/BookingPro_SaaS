export default function TestStylesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Prueba de Estilos - BookingPro
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Card 1</h2>
            <p className="text-gray-600">
              Esta es una tarjeta de prueba para verificar que Tailwind CSS funciona correctamente.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Card 2</h2>
            <p className="text-gray-300">
              Tarjeta con tema oscuro para probar diferentes estilos.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Card 3</h2>
            <p className="text-white">
              Tarjeta con gradiente para verificar estilos avanzados.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow">
            Botón de Prueba
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-white underline hover:no-underline">
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}