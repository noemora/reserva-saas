"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, DollarSign, Users, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CompanyStats, CompanyBooking, CompanyProfessional, Company } from "@/types/company"

interface CompanyDashboardViewProps {
  stats: CompanyStats
  bookings: CompanyBooking[]
  professionals: CompanyProfessional[]
  company: Company
}

export function CompanyDashboardView({ stats, bookings, professionals, company }: CompanyDashboardViewProps) {
  const recentBookings = bookings.slice(0, 3)
  const todayProfessionals = professionals.filter((p) => p.isActive && p.todayBookings > 0)

  const statsCards = [
    {
      title: "Reservas Hoy",
      value: stats.todayBookings.toString(),
      subtitle: "+2 desde ayer",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Pendientes",
      value: stats.pendingBookings.toString(),
      subtitle: "Requieren atención",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Ingresos del Mes",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      subtitle: "+15% vs mes anterior",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Profesionales Activos",
      value: stats.activeProfessionals.toString(),
      subtitle: "Trabajando hoy",
      icon: Users,
      color: "text-purple-600",
    },
  ]

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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Reservas Recientes</h2>
                <p className="text-gray-600">Últimas reservas en tu lugar de trabajo</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentBookings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay reservas recientes</p>
              ) : (
                recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{booking.clientName}</h3>
                      <p className="text-gray-600">{booking.serviceName}</p>
                      <p className="text-sm text-gray-500">con {booking.professionalName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {booking.date} - {booking.time}
                      </p>
                      <p className="text-green-600 font-semibold">${booking.price}</p>
                    </div>
                    <Badge
                      className={
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {booking.status === "confirmed" ? "Confirmada" : "Pendiente"}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Today's Professionals */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Profesionales de Hoy</h2>
                <p className="text-gray-600">Actividad de los profesionales en tu lugar</p>
              </div>
            </div>

            <div className="space-y-4">
              {todayProfessionals.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay profesionales activos hoy</p>
              ) : (
                todayProfessionals.map((professional) => (
                  <div key={professional.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{professional.name}</h3>
                      <p className="text-gray-600">{professional.title}</p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">Activo</Badge>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Hoy</p>
                          <p className="font-semibold">{professional.todayBookings}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Semana</p>
                          <p className="font-semibold">{professional.weeklyBookings}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Mes</p>
                          <p className="font-semibold text-green-600">${professional.monthlyRevenue}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Ingresos</p>
                          <p className="font-semibold text-green-600">Mes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
