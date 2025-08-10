export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            BookingPro
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
            The complete SaaS solution for hotels and restaurants. Manage bookings, 
            process payments, and grow your business with our powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:opacity-90 transition-opacity">
              Ver Demo Interactivo
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
              Conocer Funciones
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies and best practices to scale with your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Hotel Management',
                description: 'Complete hotel booking system with room management, availability tracking, and guest services.',
              },
              {
                title: 'Restaurant Reservations',
                description: 'Table booking system with time slot management, capacity optimization, and dining preferences.',
              },
              {
                title: 'Smart Scheduling',
                description: 'Intelligent booking calendar with real-time availability, conflict resolution, and auto-confirmation.',
              },
              {
                title: 'Payment Processing',
                description: 'Secure payment integration with Stripe, multiple currencies, and automated invoicing.',
              },
              {
                title: 'Multi-User Management',
                description: 'Role-based access control for admins, staff, and customers with detailed permissions.',
              },
              {
                title: 'Analytics & Reports',
                description: 'Comprehensive reporting dashboard with booking insights, revenue tracking, and performance metrics.',
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}