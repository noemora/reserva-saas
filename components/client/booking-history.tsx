'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Star,
  Download,
  Filter,
} from 'lucide-react';
import { useState } from 'react';

export function BookingHistory() {
  const [filter, setFilter] = useState('all');

  const bookingHistory = [
    {
      id: 1,
      service: 'Consulta Médica General',
      professional: 'Dr. Juan Pérez',
      date: '2025-01-20',
      time: '10:00',
      location: 'Clínica Centro',
      price: '$150',
      status: 'confirmed',
      description: 'Consulta de rutina',
      rating: 5,
      notes: 'Excelente atención, muy profesional',
    },
    {
      id: 2,
      service: 'Terapia Física',
      professional: 'Lic. Ana Martínez',
      date: '2025-01-22',
      time: '14:30',
      location: 'Centro Rehabilitación',
      price: '$200',
      status: 'pending',
      description: 'Sesión de rehabilitación',
      rating: null,
      notes: '',
    },
    {
      id: 3,
      service: 'Consulta Nutricional',
      professional: 'Nut. Carlos Ruiz',
      date: '2025-01-18',
      time: '09:00',
      location: 'Clínica Norte',
      price: '$120',
      status: 'completed',
      description: 'Plan nutricional entregado',
      rating: 4,
      notes: 'Muy útil, plan personalizado',
    },
    {
      id: 4,
      service: 'Examen de Laboratorio',
      professional: 'Lab. Central',
      date: '2025-01-15',
      time: '08:00',
      location: 'Laboratorio Central',
      price: '$80',
      status: 'completed',
      description: 'Análisis de sangre completo',
      rating: 5,
      notes: 'Resultados entregados a tiempo',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
            Confirmada
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">
            Pendiente
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
            Completada
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const filteredBookings = bookingHistory.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const stats = {
    total: bookingHistory.length,
    completed: bookingHistory.filter((b) => b.status === 'completed').length,
    pending: bookingHistory.filter((b) => b.status === 'pending').length,
    confirmed: bookingHistory.filter((b) => b.status === 'confirmed').length,
  };

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Historial de Reservas
          </h1>
          <p className="text-gray-600 mt-2">
            Revisa todas tus reservas de servicios anteriores
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Completadas
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.completed}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Confirmadas
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.confirmed}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pendientes
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.pending}
                  </p>
                </div>
                <User className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Filtrar por estado:
                </span>
              </div>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'Todas' },
                  { key: 'completed', label: 'Completadas' },
                  { key: 'confirmed', label: 'Confirmadas' },
                  { key: 'pending', label: 'Pendientes' },
                ].map((filterOption) => (
                  <Button
                    key={filterOption.key}
                    variant={
                      filter === filterOption.key ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setFilter(filterOption.key)}
                    className="text-xs"
                  >
                    {filterOption.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking History List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card
            key={booking.id}
            className="hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex-shrink-0">
                  <User className="w-6 h-6 text-blue-600" />
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.service}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {booking.professional}
                      </p>
                      {booking.description && (
                        <p className="text-sm text-gray-500">
                          {booking.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-xl font-bold text-gray-900">
                        {booking.price}
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  <Separator />

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.location}</span>
                    </div>
                  </div>

                  {/* Rating and Notes */}
                  {booking.status === 'completed' && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        {booking.rating && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">
                              Calificación:
                            </span>
                            {renderStars(booking.rating)}
                          </div>
                        )}
                        {booking.notes && (
                          <div className="flex items-start gap-2">
                            <span className="text-sm font-medium text-gray-700">
                              Notas:
                            </span>
                            <p className="text-sm text-gray-600">
                              {booking.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Recibo
                    </Button>
                    {booking.status === 'completed' && !booking.rating && (
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4 mr-2" />
                        Calificar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay reservas
            </h3>
            <p className="text-gray-600">
              No se encontraron reservas con el filtro seleccionado.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
