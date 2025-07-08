'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, TrendingUp, DollarSign, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { DashboardStats, Booking, Workplace } from '@/types/professional';

interface DashboardProps {
  stats: DashboardStats;
  bookings: Booking[];
  selectedWorkplace?: Workplace;
}

export function Dashboard({
  stats,
  bookings,
  selectedWorkplace,
}: DashboardProps) {
  const todayBookings = bookings.filter((b) => {
    const today = new Date().toISOString().split('T')[0];
    return b.date === today && b.workplaceId === selectedWorkplace?.id;
  });

  const statsCards = [
    {
      title: 'Reservas Hoy',
      value: stats.todayBookings.toString(),
      subtitle: `En ${selectedWorkplace?.name}`,
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Pendientes',
      value: stats.pendingBookings.toString(),
      subtitle: 'Requieren confirmación',
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Esta Semana',
      value: stats.weeklyBookings.toString(),
      subtitle: 'Reservas programadas',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      title: 'Ingresos del Mes',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      subtitle: 'En esta ubicación',
      icon: DollarSign,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Bookings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                Próximas Reservas - {selectedWorkplace?.name}
              </h2>
              <p className="text-gray-600">
                Tus próximas reservas en esta ubicación
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {todayBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No tienes reservas programadas para hoy
              </p>
            ) : (
              todayBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{booking.client}</h3>
                    <p className="text-gray-600">{booking.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {booking.date} - {booking.time}
                    </p>
                    <p className="text-green-600 font-semibold">
                      ${booking.price}
                    </p>
                  </div>
                  <Badge
                    className={
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800 hover:bg-green-100'
                        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                    }
                  >
                    {booking.status === 'confirmed'
                      ? 'Confirmada'
                      : 'Pendiente'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
