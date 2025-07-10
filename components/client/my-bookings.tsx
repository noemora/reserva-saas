'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  CheckCircle,
  AlertCircle,
  Timer,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { NewBookingModal } from './new-booking-modal';

export function MyBookings() {
  const [showNewBooking, setShowNewBooking] = useState(false);

  const stats = [
    {
      label: 'Próximas',
      value: '2',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-blue-500',
    },
    {
      label: 'Pendientes',
      value: '1',
      icon: Timer,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-l-amber-500',
    },
    {
      label: 'Completadas',
      value: '1',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-l-emerald-500',
    },
    {
      label: 'Total',
      value: '4',
      icon: User,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-l-gray-500',
    },
  ];

  const upcomingBookings = [
    {
      id: 1,
      service: 'Corte y Peinado',
      professional: 'Ana Martínez',
      date: '2025-01-20',
      time: '10:00',
      location: 'Salón de Belleza Central',
      price: '$45',
      duration: '60 min',
      status: 'confirmed',
      specialty: 'Estilismo',
      phone: '+1 234 567 8900',
      instructions: 'Traer foto de referencia del corte deseado',
    },
    {
      id: 2,
      service: 'Masaje Relajante',
      professional: 'Lic. Carlos Ruiz',
      date: '2025-01-22',
      time: '14:30',
      location: 'Spa Wellness',
      price: '$85',
      duration: '90 min',
      status: 'pending',
      specialty: 'Terapia de Masajes',
      phone: '+1 234 567 8901',
      instructions: 'Llegar 15 minutos antes para relajarse',
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {
          badge: (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
              <CheckCircle className="w-3 h-3 mr-1" />
              Confirmada
            </Badge>
          ),
          icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
          color: 'text-emerald-600',
        };
      case 'pending':
        return {
          badge: (
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">
              <Timer className="w-3 h-3 mr-1" />
              Pendiente
            </Badge>
          ),
          icon: <Timer className="w-5 h-5 text-amber-600" />,
          color: 'text-amber-600',
        };
      default:
        return {
          badge: <Badge variant="outline">Desconocido</Badge>,
          icon: <AlertCircle className="w-5 h-5 text-gray-600" />,
          color: 'text-gray-600',
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Reservas</h1>
            <p className="text-gray-600 mt-2">
              Gestiona tus reservas de servicios
            </p>
          </div>
          <Button
            onClick={() => setShowNewBooking(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nueva Reserva
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className={`border-l-4 ${stat.borderColor} hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Próximas Reservas
            </h2>
            <p className="text-gray-600">
              Tus reservas programadas para los próximos días
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {upcomingBookings.map((booking) => {
            const statusInfo = getStatusInfo(booking.status);
            return (
              <Card
                key={booking.id}
                className="hover:shadow-lg transition-all duration-200 border-0 shadow-md"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Status Icon */}
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex-shrink-0">
                      {statusInfo.icon}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {booking.service}
                          </h3>
                          <div className="space-y-1">
                            <p className="text-lg text-gray-700 font-medium">
                              {booking.professional}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.specialty}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-2xl font-bold text-gray-900">
                            {booking.price}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.duration}
                          </div>
                          {statusInfo.badge}
                        </div>
                      </div>

                      <Separator />

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Fecha
                            </p>
                            <p className="font-medium text-gray-900">
                              {booking.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Clock className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Hora
                            </p>
                            <p className="font-medium text-gray-900">
                              {booking.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Ubicación
                            </p>
                            <p className="font-medium text-gray-900">
                              {booking.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Instructions */}
                      {booking.instructions && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">
                            Instrucciones:
                          </p>
                          <p className="text-sm text-blue-800">
                            {booking.instructions}
                          </p>
                        </div>
                      )}

                      <Separator />

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 bg-transparent"
                          >
                            <Phone className="w-4 h-4" />
                            Llamar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 bg-transparent"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Mensaje
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          {booking.status === 'confirmed' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                            >
                              Reagendar
                            </Button>
                          )}
                          {booking.status === 'pending' && (
                            <Button variant="destructive" size="sm">
                              Cancelar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {upcomingBookings.length === 0 && (
          <Card className="border-2 border-dashed border-gray-200">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No tienes reservas programadas
              </h3>
              <p className="text-gray-600 mb-6">
                Reserva tu primer servicio para comenzar
              </p>
              <Button
                onClick={() => setShowNewBooking(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Reservar Servicio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <NewBookingModal
        open={showNewBooking}
        onClose={() => setShowNewBooking(false)}
      />
    </div>
  );
}
