'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Hotel, 
  UtensilsCrossed,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  BarChart3,
  MapPin
} from 'lucide-react';

// Demo data
const demoStats = {
  totalBookings: 147,
  totalRevenue: 23580,
  pendingBookings: 12,
  confirmedBookings: 89,
};

const demoBookings = [
  {
    id: 1,
    user: { name: 'Ana García' },
    room: { name: 'Suite Deluxe' },
    table: null,
    startDate: new Date(2024, 2, 15, 14, 0),
    guests: 2,
    totalPrice: 320,
    status: 'CONFIRMED'
  },
  {
    id: 2,
    user: { name: 'Carlos López' },
    room: null,
    table: { name: 'Mesa Terraza' },
    startDate: new Date(2024, 2, 16, 19, 30),
    guests: 4,
    totalPrice: 150,
    status: 'PENDING'
  },
  {
    id: 3,
    user: { name: 'María Rodríguez' },
    room: { name: 'Habitación Doble' },
    table: null,
    startDate: new Date(2024, 2, 17, 16, 0),
    guests: 3,
    totalPrice: 220,
    status: 'CONFIRMED'
  }
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'PENDING':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'CANCELLED':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    case 'PENDING':
      return 'text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
    case 'CANCELLED':
      return 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
    default:
      return 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
  }
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                BookingPro Demo
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Panel de administración - Vista completa del negocio
              </p>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              Volver al inicio
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reservas</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{demoStats.totalBookings}</div>
                <p className="text-xs text-muted-foreground">
                  +12% respecto al mes pasado
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(demoStats.totalRevenue)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +8% respecto al mes pasado
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{demoStats.pendingBookings}</div>
                <p className="text-xs text-muted-foreground">
                  Esperando confirmación
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{demoStats.confirmedBookings}</div>
                <p className="text-xs text-muted-foreground">
                  Listas para servir
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Reservas Recientes</CardTitle>
                <CardDescription>
                  Últimas reservaciones del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {booking.room ? (
                            <Hotel className="h-8 w-8 text-blue-500" />
                          ) : (
                            <UtensilsCrossed className="h-8 w-8 text-green-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{booking.user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.room ? booking.room.name : booking.table?.name} • {' '}
                            {booking.guests} {booking.guests === 1 ? 'persona' : 'personas'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(booking.startDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status === 'CONFIRMED' ? 'Confirmada' : booking.status === 'PENDING' ? 'Pendiente' : booking.status}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(booking.totalPrice)}
                        </span>
                        {getStatusIcon(booking.status)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Gestiona tu negocio fácilmente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Nueva Reserva Hotel
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  Nueva Reserva Restaurante
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Gestionar Clientes
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Ver Reportes
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  Configurar Espacios
                </Button>
              </CardContent>
            </Card>

            {/* Features Preview */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Próximas Funcionalidades</CardTitle>
                <CardDescription>
                  Características avanzadas en desarrollo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Integración con WhatsApp</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>App móvil nativa</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>IA para predicción de demanda</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Sistema de fidelización</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}