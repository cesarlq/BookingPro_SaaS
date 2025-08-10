'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Hotel, 
  UtensilsCrossed,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Settings,
  BarChart3,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Home,
  ArrowLeft
} from 'lucide-react';

// Mock data for full functionality
const initialStats = {
  totalBookings: 147,
  totalRevenue: 23580,
  pendingBookings: 12,
  confirmedBookings: 89,
};

const initialBookings = [
  {
    id: 1,
    user: { name: 'Ana García', email: 'ana@email.com', phone: '+34 600 123 456' },
    room: { name: 'Suite Deluxe', type: 'SUITE' },
    table: null,
    startDate: new Date(2024, 2, 15, 14, 0),
    endDate: new Date(2024, 2, 17, 12, 0),
    guests: 2,
    totalPrice: 320,
    status: 'CONFIRMED',
    notes: 'Aniversario - Champán incluido'
  },
  {
    id: 2,
    user: { name: 'Carlos López', email: 'carlos@email.com', phone: '+34 600 234 567' },
    room: null,
    table: { name: 'Mesa Terraza', type: 'MEDIUM' },
    startDate: new Date(2024, 2, 16, 19, 30),
    endDate: new Date(2024, 2, 16, 21, 30),
    guests: 4,
    totalPrice: 150,
    status: 'PENDING',
    notes: 'Mesa junto a la ventana'
  },
  {
    id: 3,
    user: { name: 'María Rodríguez', email: 'maria@email.com', phone: '+34 600 345 678' },
    room: { name: 'Habitación Doble', type: 'DOUBLE' },
    table: null,
    startDate: new Date(2024, 2, 17, 16, 0),
    endDate: new Date(2024, 2, 19, 11, 0),
    guests: 3,
    totalPrice: 220,
    status: 'CONFIRMED',
    notes: 'Llegada temprana solicitada'
  }
];

const initialRooms = [
  { id: 1, name: 'Suite Deluxe', type: 'SUITE', capacity: 4, price: 320, isActive: true },
  { id: 2, name: 'Habitación Doble', type: 'DOUBLE', capacity: 2, price: 180, isActive: true },
  { id: 3, name: 'Habitación Individual', type: 'SINGLE', capacity: 1, price: 120, isActive: true },
];

const initialTables = [
  { id: 1, name: 'Mesa Terraza', type: 'MEDIUM', capacity: 4, location: 'Terraza', isActive: true },
  { id: 2, name: 'Mesa VIP', type: 'LARGE', capacity: 6, location: 'Sala VIP', isActive: true },
  { id: 3, name: 'Mesa Bar', type: 'SMALL', capacity: 2, location: 'Barra', isActive: true },
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

export default function HomePage() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [bookings, setBookings] = useState(initialBookings);
  const [rooms, setRooms] = useState(initialRooms);
  const [tables, setTables] = useState(initialTables);
  const [stats, setStats] = useState(initialStats);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [showRoomConfig, setShowRoomConfig] = useState<any>(null);
  const [showNewRoomForm, setShowNewRoomForm] = useState(false);
  const [editingTable, setEditingTable] = useState<any>(null);
  const [showTableConfig, setShowTableConfig] = useState<any>(null);
  const [showNewTableForm, setShowNewTableForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'ALL',
    type: 'ALL',
    dateRange: 'ALL',
    minPrice: '',
    maxPrice: ''
  });

  // Update stats when bookings change
  useEffect(() => {
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
    const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length;
    
    setStats({
      totalBookings: bookings.length,
      totalRevenue,
      pendingBookings,
      confirmedBookings,
    });
  }, [bookings]);

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const handleDeleteBooking = (bookingId: number) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };

  const handleNewBooking = () => {
    setShowBookingForm(true);
  };

  const filteredBookings = bookings.filter(booking => {
    // Search filter
    const matchesSearch = booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = filters.status === 'ALL' || booking.status === filters.status;
    
    // Type filter (room vs table)
    const matchesType = filters.type === 'ALL' || 
      (filters.type === 'ROOM' && booking.room) ||
      (filters.type === 'TABLE' && booking.table);
    
    // Price filter
    const matchesMinPrice = !filters.minPrice || booking.totalPrice >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || booking.totalPrice <= parseFloat(filters.maxPrice);
    
    // Date filter
    const today = new Date();
    const bookingDate = new Date(booking.startDate);
    let matchesDate = true;
    
    if (filters.dateRange === 'TODAY') {
      matchesDate = bookingDate.toDateString() === today.toDateString();
    } else if (filters.dateRange === 'WEEK') {
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      matchesDate = bookingDate >= today && bookingDate <= weekFromNow;
    } else if (filters.dateRange === 'MONTH') {
      const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
      matchesDate = bookingDate >= today && bookingDate <= monthFromNow;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesMinPrice && matchesMaxPrice && matchesDate;
  });

  // Room management functions
  const handleEditRoom = (room: any) => {
    setEditingRoom({ ...room });
  };

  const handleSaveRoom = (updatedRoom: any) => {
    setRooms(rooms.map(room => 
      room.id === updatedRoom.id 
        ? updatedRoom
        : room
    ));
    setEditingRoom(null);
  };

  const handleDeleteRoom = (roomId: number) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  const handleToggleRoomStatus = (roomId: number) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, isActive: !room.isActive }
        : room
    ));
  };

  // Table management functions
  const handleEditTable = (table: any) => {
    setEditingTable({ ...table });
  };

  const handleSaveTable = (updatedTable: any) => {
    setTables(tables.map(table => 
      table.id === updatedTable.id 
        ? updatedTable
        : table
    ));
    setEditingTable(null);
  };

  const handleDeleteTable = (tableId: number) => {
    setTables(tables.filter(table => table.id !== tableId));
  };

  const handleToggleTableStatus = (tableId: number) => {
    setTables(tables.map(table => 
      table.id === tableId 
        ? { ...table, isActive: !table.isActive }
        : table
    ));
  };

  // New room creation function
  const handleCreateRoom = (roomData: any) => {
    const newRoom = {
      id: Math.max(...rooms.map(r => r.id)) + 1,
      ...roomData
    };
    setRooms([...rooms, newRoom]);
    setShowNewRoomForm(false);
  };

  // New table creation function
  const handleCreateTable = (tableData: any) => {
    const newTable = {
      id: Math.max(...tables.map(t => t.id)) + 1,
      ...tableData
    };
    setTables([...tables, newTable]);
    setShowNewTableForm(false);
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Dashboard BookingPro
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Panel de administración - Vista completa del negocio
          </p>
        </div>
        <Button onClick={handleNewBooking} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nueva Reserva
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
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
                {formatCurrency(stats.totalRevenue)}
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
              <div className="text-2xl font-bold">{stats.pendingBookings}</div>
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
              <div className="text-2xl font-bold">{stats.confirmedBookings}</div>
              <p className="text-xs text-muted-foreground">
                Listas para servir
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          onClick={() => setCurrentView('bookings')} 
          variant="outline" 
          className="h-20 flex flex-col items-center justify-center gap-2"
        >
          <Calendar className="h-6 w-6" />
          <span>Gestionar Reservas</span>
        </Button>
        <Button 
          onClick={() => setCurrentView('rooms')} 
          variant="outline" 
          className="h-20 flex flex-col items-center justify-center gap-2"
        >
          <Hotel className="h-6 w-6" />
          <span>Habitaciones</span>
        </Button>
        <Button 
          onClick={() => setCurrentView('tables')} 
          variant="outline" 
          className="h-20 flex flex-col items-center justify-center gap-2"
        >
          <UtensilsCrossed className="h-6 w-6" />
          <span>Mesas</span>
        </Button>
        <Button 
          onClick={() => setCurrentView('analytics')} 
          variant="outline" 
          className="h-20 flex flex-col items-center justify-center gap-2"
        >
          <BarChart3 className="h-6 w-6" />
          <span>Reportes</span>
        </Button>
      </div>

      {/* Recent Bookings Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Reservas Recientes</CardTitle>
          <CardDescription>
            Últimas 3 reservas del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking, index) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedBooking(booking)}
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
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('bookings')}
            >
              Ver Todas las Reservas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Gestión de Reservas</h1>
            <p className="text-gray-600">Administra todas las reservas del sistema</p>
          </div>
        </div>
        <Button onClick={handleNewBooking} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nueva Reserva
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(true)}
        >
          <Filter className="h-4 w-4" />
          Filtros
          {(filters.status !== 'ALL' || filters.type !== 'ALL' || filters.dateRange !== 'ALL' || filters.minPrice || filters.maxPrice) && (
            <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-1">•</span>
          )}
        </Button>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {booking.room ? (
                      <Hotel className="h-10 w-10 text-blue-500" />
                    ) : (
                      <UtensilsCrossed className="h-10 w-10 text-green-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{booking.user.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status === 'CONFIRMED' ? 'Confirmada' : booking.status === 'PENDING' ? 'Pendiente' : booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {booking.user.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {booking.user.phone}
                      </span>
                    </p>
                    <p className="text-sm mt-2">
                      <span className="font-medium">
                        {booking.room ? booking.room.name : booking.table?.name}
                      </span>
                      {' • '}
                      <span>{booking.guests} {booking.guests === 1 ? 'persona' : 'personas'}</span>
                      {' • '}
                      <span>{formatDate(booking.startDate)}</span>
                    </p>
                    {booking.notes && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Notas:</span> {booking.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-4">
                    <p className="font-bold text-lg">{formatCurrency(booking.totalPrice)}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {booking.status === 'PENDING' && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleStatusChange(booking.id, 'CONFIRMED')}
                    >
                      Confirmar
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRooms = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Gestión de Habitaciones</h1>
            <p className="text-gray-600">Administra las habitaciones del hotel</p>
          </div>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowNewRoomForm(true)}
        >
          <Plus className="h-4 w-4" />
          Nueva Habitación
        </Button>
      </div>

      {/* Rooms Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="h-5 w-5 text-blue-500" />
                  {room.name}
                </CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  room.isActive 
                    ? 'text-green-700 bg-green-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {room.isActive ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <CardDescription>
                Tipo: {room.type} • Capacidad: {room.capacity} personas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Precio por noche:</span>
                  <span className="font-bold text-lg">{formatCurrency(room.price)}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditRoom(room)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowRoomConfig(room)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTables = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Gestión de Mesas</h1>
            <p className="text-gray-600">Administra las mesas del restaurante</p>
          </div>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowNewTableForm(true)}
        >
          <Plus className="h-4 w-4" />
          Nueva Mesa
        </Button>
      </div>

      {/* Tables Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <Card key={table.id} className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-green-500" />
                  {table.name}
                </CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  table.isActive 
                    ? 'text-green-700 bg-green-100' 
                    : 'text-red-700 bg-red-100'
                }`}>
                  {table.isActive ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <CardDescription>
                Tipo: {table.type} • Capacidad: {table.capacity} personas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{table.location}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditTable(table)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTableConfig(table)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Reportes y Análisis</h1>
          <p className="text-gray-600">Métricas de rendimiento del negocio</p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendencias de Reservas</CardTitle>
            <CardDescription>Reservas por semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <BarChart3 className="h-16 w-16 text-gray-400" />
              <span className="ml-4 text-gray-500">Gráfico de tendencias</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingresos Mensuales</CardTitle>
            <CardDescription>Comparativa últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <DollarSign className="h-16 w-16 text-gray-400" />
              <span className="ml-4 text-gray-500">Gráfico de ingresos</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600">94%</div>
            <p className="text-sm text-gray-500">Ocupación Promedio</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">4.8</div>
            <p className="text-sm text-gray-500">Calificación Promedio</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">€187</div>
            <p className="text-sm text-gray-500">Ingreso por Reserva</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600">67%</div>
            <p className="text-sm text-gray-500">Clientes Recurrentes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'bookings' && renderBookings()}
          {currentView === 'rooms' && renderRooms()}
          {currentView === 'tables' && renderTables()}
          {currentView === 'analytics' && renderAnalytics()}
        </motion.div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detalles de la Reserva</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedBooking(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Información del Cliente</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Nombre:</span> {selectedBooking.user.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedBooking.user.email}</p>
                      <p><span className="font-medium">Teléfono:</span> {selectedBooking.user.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Detalles de la Reserva</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">
                        {selectedBooking.room ? 'Habitación:' : 'Mesa:'}
                      </span> {selectedBooking.room ? selectedBooking.room.name : selectedBooking.table?.name}</p>
                      <p><span className="font-medium">Huéspedes:</span> {selectedBooking.guests}</p>
                      <p><span className="font-medium">Entrada:</span> {formatDate(selectedBooking.startDate)}</p>
                      {selectedBooking.endDate && (
                        <p><span className="font-medium">Salida:</span> {formatDate(selectedBooking.endDate)}</p>
                      )}
                      <p><span className="font-medium">Total:</span> {formatCurrency(selectedBooking.totalPrice)}</p>
                    </div>
                  </div>
                </div>
                {selectedBooking.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notas</h3>
                    <p className="text-sm bg-gray-50 p-3 rounded">{selectedBooking.notes}</p>
                  </div>
                )}
                <div className="flex gap-3">
                  {selectedBooking.status === 'PENDING' && (
                    <Button 
                      onClick={() => {
                        handleStatusChange(selectedBooking.id, 'CONFIRMED');
                        setSelectedBooking(null);
                      }}
                      className="flex-1"
                    >
                      Confirmar Reserva
                    </Button>
                  )}
                  {selectedBooking.status === 'CONFIRMED' && (
                    <Button 
                      onClick={() => {
                        handleStatusChange(selectedBooking.id, 'COMPLETED');
                        setSelectedBooking(null);
                      }}
                      className="flex-1"
                    >
                      Marcar como Completada
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedBooking(null)}
                    className="flex-1"
                  >
                    Cerrar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Room Modal */}
        {editingRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Editar Habitación</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setEditingRoom(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomName">Nombre de la Habitación</Label>
                    <Input 
                      id="roomName" 
                      value={editingRoom.name}
                      onChange={(e) => setEditingRoom({...editingRoom, name: e.target.value})}
                      placeholder="Nombre de la habitación" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomType">Tipo</Label>
                    <select 
                      id="roomType"
                      value={editingRoom.type}
                      onChange={(e) => setEditingRoom({...editingRoom, type: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="SINGLE">Individual</option>
                      <option value="DOUBLE">Doble</option>
                      <option value="SUITE">Suite</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomCapacity">Capacidad</Label>
                    <Input 
                      id="roomCapacity" 
                      type="number" 
                      min="1" 
                      value={editingRoom.capacity}
                      onChange={(e) => setEditingRoom({...editingRoom, capacity: parseInt(e.target.value)})}
                      placeholder="2" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomPrice">Precio por Noche (€)</Label>
                    <Input 
                      id="roomPrice" 
                      type="number" 
                      min="0" 
                      step="0.01"
                      value={editingRoom.price}
                      onChange={(e) => setEditingRoom({...editingRoom, price: parseFloat(e.target.value)})}
                      placeholder="120" 
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="roomActive"
                    checked={editingRoom.isActive}
                    onChange={(e) => setEditingRoom({...editingRoom, isActive: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="roomActive">Habitación activa</Label>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      handleSaveRoom(editingRoom);
                    }}
                    className="flex-1"
                  >
                    Guardar Cambios
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingRoom(null)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Room Configuration Modal */}
        {showRoomConfig && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Configuración de {showRoomConfig.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowRoomConfig(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Estado de la Habitación</h3>
                  <div className="flex gap-4">
                    <Button 
                      variant={showRoomConfig.isActive ? "default" : "outline"}
                      onClick={() => {
                        if (!showRoomConfig.isActive) {
                          handleToggleRoomStatus(showRoomConfig.id);
                          setShowRoomConfig({...showRoomConfig, isActive: true});
                        }
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activar
                    </Button>
                    <Button 
                      variant={!showRoomConfig.isActive ? "destructive" : "outline"}
                      onClick={() => {
                        if (showRoomConfig.isActive) {
                          handleToggleRoomStatus(showRoomConfig.id);
                          setShowRoomConfig({...showRoomConfig, isActive: false});
                        }
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Desactivar
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Información Actual</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Tipo:</span> {showRoomConfig.type}</p>
                    <p><span className="font-medium">Capacidad:</span> {showRoomConfig.capacity} personas</p>
                    <p><span className="font-medium">Precio:</span> {formatCurrency(showRoomConfig.price)} por noche</p>
                    <p><span className="font-medium">Estado:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        showRoomConfig.isActive 
                          ? 'text-green-700 bg-green-100' 
                          : 'text-red-700 bg-red-100'
                      }`}>
                        {showRoomConfig.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Acciones Peligrosas</h3>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      if (confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
                        handleDeleteRoom(showRoomConfig.id);
                        setShowRoomConfig(null);
                      }
                    }}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Habitación
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowRoomConfig(null)}
                    className="flex-1"
                  >
                    Cerrar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Table Modal */}
        {editingTable && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Editar Mesa</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setEditingTable(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tableName">Nombre de la Mesa</Label>
                    <Input 
                      id="tableName" 
                      value={editingTable.name}
                      onChange={(e) => setEditingTable({...editingTable, name: e.target.value})}
                      placeholder="Nombre de la mesa" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tableType">Tipo</Label>
                    <select 
                      id="tableType"
                      value={editingTable.type}
                      onChange={(e) => setEditingTable({...editingTable, type: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="SMALL">Pequeña</option>
                      <option value="MEDIUM">Mediana</option>
                      <option value="LARGE">Grande</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tableCapacity">Capacidad</Label>
                    <Input 
                      id="tableCapacity" 
                      type="number" 
                      min="1" 
                      value={editingTable.capacity}
                      onChange={(e) => setEditingTable({...editingTable, capacity: parseInt(e.target.value)})}
                      placeholder="4" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tableLocation">Ubicación</Label>
                    <Input 
                      id="tableLocation" 
                      value={editingTable.location}
                      onChange={(e) => setEditingTable({...editingTable, location: e.target.value})}
                      placeholder="Terraza, Salón, etc." 
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="tableActive"
                    checked={editingTable.isActive}
                    onChange={(e) => setEditingTable({...editingTable, isActive: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="tableActive">Mesa activa</Label>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      handleSaveTable(editingTable);
                    }}
                    className="flex-1"
                  >
                    Guardar Cambios
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditingTable(null)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Table Configuration Modal */}
        {showTableConfig && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Configuración de {showTableConfig.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowTableConfig(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Estado de la Mesa</h3>
                  <div className="flex gap-4">
                    <Button 
                      variant={showTableConfig.isActive ? "default" : "outline"}
                      onClick={() => {
                        if (!showTableConfig.isActive) {
                          handleToggleTableStatus(showTableConfig.id);
                          setShowTableConfig({...showTableConfig, isActive: true});
                        }
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activar
                    </Button>
                    <Button 
                      variant={!showTableConfig.isActive ? "destructive" : "outline"}
                      onClick={() => {
                        if (showTableConfig.isActive) {
                          handleToggleTableStatus(showTableConfig.id);
                          setShowTableConfig({...showTableConfig, isActive: false});
                        }
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Desactivar
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Información Actual</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Tipo:</span> {showTableConfig.type}</p>
                    <p><span className="font-medium">Capacidad:</span> {showTableConfig.capacity} personas</p>
                    <p><span className="font-medium">Ubicación:</span> {showTableConfig.location}</p>
                    <p><span className="font-medium">Estado:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        showTableConfig.isActive 
                          ? 'text-green-700 bg-green-100' 
                          : 'text-red-700 bg-red-100'
                      }`}>
                        {showTableConfig.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Acciones Peligrosas</h3>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      if (confirm('¿Estás seguro de que quieres eliminar esta mesa?')) {
                        handleDeleteTable(showTableConfig.id);
                        setShowTableConfig(null);
                      }
                    }}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Mesa
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowTableConfig(null)}
                    className="flex-1"
                  >
                    Cerrar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* New Room Form Modal */}
        {showNewRoomForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Nueva Habitación</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowNewRoomForm(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newRoomName">Nombre de la Habitación</Label>
                    <Input 
                      id="newRoomName" 
                      placeholder="Ej: Suite Presidencial" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newRoomType">Tipo</Label>
                    <select 
                      id="newRoomType"
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="SINGLE">Individual</option>
                      <option value="DOUBLE">Doble</option>
                      <option value="SUITE">Suite</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newRoomCapacity">Capacidad</Label>
                    <Input 
                      id="newRoomCapacity" 
                      type="number" 
                      min="1" 
                      placeholder="2" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newRoomPrice">Precio por Noche (€)</Label>
                    <Input 
                      id="newRoomPrice" 
                      type="number" 
                      min="0" 
                      step="0.01"
                      placeholder="120" 
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newRoomActive"
                    defaultChecked={true}
                    className="rounded"
                  />
                  <Label htmlFor="newRoomActive">Habitación activa</Label>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      const name = (document.getElementById('newRoomName') as HTMLInputElement).value;
                      const type = (document.getElementById('newRoomType') as HTMLSelectElement).value;
                      const capacity = parseInt((document.getElementById('newRoomCapacity') as HTMLInputElement).value);
                      const price = parseFloat((document.getElementById('newRoomPrice') as HTMLInputElement).value);
                      const isActive = (document.getElementById('newRoomActive') as HTMLInputElement).checked;
                      
                      if (name && type && capacity && price) {
                        handleCreateRoom({
                          name,
                          type,
                          capacity,
                          price,
                          isActive
                        });
                      } else {
                        alert('Por favor, completa todos los campos');
                      }
                    }}
                    className="flex-1"
                  >
                    Crear Habitación
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewRoomForm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* New Table Form Modal */}
        {showNewTableForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Nueva Mesa</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowNewTableForm(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newTableName">Nombre de la Mesa</Label>
                    <Input 
                      id="newTableName" 
                      placeholder="Ej: Mesa VIP 1" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newTableType">Tipo</Label>
                    <select 
                      id="newTableType"
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="SMALL">Pequeña</option>
                      <option value="MEDIUM">Mediana</option>
                      <option value="LARGE">Grande</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newTableCapacity">Capacidad</Label>
                    <Input 
                      id="newTableCapacity" 
                      type="number" 
                      min="1" 
                      placeholder="4" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newTableLocation">Ubicación</Label>
                    <Input 
                      id="newTableLocation" 
                      placeholder="Terraza, Salón, etc." 
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newTableActive"
                    defaultChecked={true}
                    className="rounded"
                  />
                  <Label htmlFor="newTableActive">Mesa activa</Label>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      const name = (document.getElementById('newTableName') as HTMLInputElement).value;
                      const type = (document.getElementById('newTableType') as HTMLSelectElement).value;
                      const capacity = parseInt((document.getElementById('newTableCapacity') as HTMLInputElement).value);
                      const location = (document.getElementById('newTableLocation') as HTMLInputElement).value;
                      const isActive = (document.getElementById('newTableActive') as HTMLInputElement).checked;
                      
                      if (name && type && capacity && location) {
                        handleCreateTable({
                          name,
                          type,
                          capacity,
                          location,
                          isActive
                        });
                      } else {
                        alert('Por favor, completa todos los campos');
                      }
                    }}
                    className="flex-1"
                  >
                    Crear Mesa
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewTableForm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Filtros de Reservas</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowFilters(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="filterStatus">Estado</Label>
                    <select 
                      id="filterStatus"
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="ALL">Todos los estados</option>
                      <option value="PENDING">Pendiente</option>
                      <option value="CONFIRMED">Confirmada</option>
                      <option value="COMPLETED">Completada</option>
                      <option value="CANCELLED">Cancelada</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filterType">Tipo de Reserva</Label>
                    <select 
                      id="filterType"
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="ALL">Habitaciones y Mesas</option>
                      <option value="ROOM">Solo Habitaciones</option>
                      <option value="TABLE">Solo Mesas</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filterDate">Rango de Fechas</Label>
                    <select 
                      id="filterDate"
                      value={filters.dateRange}
                      onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="ALL">Todas las fechas</option>
                      <option value="TODAY">Hoy</option>
                      <option value="WEEK">Esta semana</option>
                      <option value="MONTH">Este mes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Rango de Precio (€)</Label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Mín"
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      />
                      <Input 
                        placeholder="Máx"
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Mostrando {filteredBookings.length} de {bookings.length} reservas
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setShowFilters(false)}
                      className="flex-1"
                    >
                      Aplicar Filtros
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setFilters({
                          status: 'ALL',
                          type: 'ALL',
                          dateRange: 'ALL',
                          minPrice: '',
                          maxPrice: ''
                        });
                      }}
                    >
                      Limpiar
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowFilters(false)}
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* New Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Nueva Reserva</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowBookingForm(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Nombre del Cliente</Label>
                    <Input id="customerName" placeholder="Nombre completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input id="customerEmail" type="email" placeholder="email@ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Teléfono</Label>
                    <Input id="customerPhone" placeholder="+34 600 123 456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Número de Huéspedes</Label>
                    <Input id="guests" type="number" min="1" placeholder="2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Fecha de Entrada</Label>
                    <Input id="checkIn" type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Fecha de Salida (Hoteles)</Label>
                    <Input id="checkOut" type="datetime-local" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas Especiales</Label>
                  <textarea 
                    id="notes"
                    className="w-full p-3 border rounded-md"
                    rows={3}
                    placeholder="Peticiones especiales, alergias, etc."
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      // Aquí iría la lógica para crear la reserva
                      alert('Funcionalidad de crear reserva - En desarrollo');
                      setShowBookingForm(false);
                    }}
                    className="flex-1"
                  >
                    Crear Reserva
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}