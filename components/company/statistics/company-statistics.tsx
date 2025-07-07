"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, TrendingUp, Users, DollarSign, Clock, CheckCircle } from "lucide-react"
import type {
  CompanyStats,
  WeeklyTrend,
  ProfessionalPerformance,
  ServiceDemand,
  HourlyUtilization,
} from "@/types/company"

interface CompanyStatisticsProps {
  stats: CompanyStats
  weeklyTrend: WeeklyTrend[]
  professionalPerformance: ProfessionalPerformance[]
  serviceDemand: ServiceDemand[]
  hourlyUtilization: HourlyUtilization[]
}

export function CompanyStatistics({
  stats,
  weeklyTrend,
  professionalPerformance,
  serviceDemand,
  hourlyUtilization,
}: CompanyStatisticsProps) {
  const maxWeeklyBookings = Math.max(...weeklyTrend.map((d) => d.bookings))
  const maxRevenue = Math.max(...professionalPerformance.map((p) => p.revenue))
  const maxServiceBookings = Math.max(...serviceDemand.map((s) => s.bookings))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Estadísticas y Reportes</h2>
        <p className="text-gray-600">Análisis detallado del rendimiento de tu lugar de trabajo</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">Total Reservas</p>
            <p className="text-2xl font-bold">156</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Ingresos Totales</p>
            <p className="text-2xl font-bold">$18,750</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Valor Promedio</p>
            <p className="text-2xl font-bold">$120</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Tasa Completado</p>
            <p className="text-2xl font-bold">92%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">Rating Promedio</p>
            <p className="text-2xl font-bold">4.7</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-sm text-gray-600">Tasa Cancelación</p>
            <p className="text-2xl font-bold">8%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia Semanal</CardTitle>
            <p className="text-gray-600">Reservas e ingresos por día de la semana</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyTrend.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{day.day}</span>
                    <div className="text-right">
                      <span className="font-semibold">Reservas: {day.bookings}</span>
                      <p className="text-sm text-green-600">${day.revenue}</p>
                    </div>
                  </div>
                  <Progress value={(day.bookings / maxWeeklyBookings) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento por Profesional</CardTitle>
            <p className="text-gray-600">Estadísticas de cada profesional este mes</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {professionalPerformance.map((prof) => (
                <div key={prof.professionalId} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{prof.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{prof.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-600">{prof.bookings}</p>
                      <p className="text-xs text-gray-600">Reservas</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">${prof.revenue}</p>
                      <p className="text-xs text-gray-600">Ingresos</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">{prof.completionRate}%</p>
                      <p className="text-xs text-gray-600">Completado</p>
                    </div>
                  </div>
                  <Progress value={(prof.revenue / maxRevenue) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Service Demand */}
        <Card>
          <CardHeader>
            <CardTitle>Servicios Más Solicitados</CardTitle>
            <p className="text-gray-600">Análisis de demanda por tipo de servicio</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceDemand.map((service) => (
                <div key={service.serviceName} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{service.serviceName}</h4>
                      <p className="text-sm text-gray-600">{service.duration}min duración</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{service.bookings} reservas</p>
                      <p className="text-sm text-green-600">${service.revenue}</p>
                    </div>
                  </div>
                  <Progress value={(service.bookings / maxServiceBookings) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hourly Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Utilización por Horarios</CardTitle>
            <p className="text-gray-600">Análisis de ocupación por franja horaria</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hourlyUtilization.map((slot) => (
                <div key={slot.timeSlot} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{slot.timeSlot}</span>
                    <div className="text-right">
                      <span className="font-semibold">{slot.bookings} reservas</span>
                      <p className="text-sm text-gray-600">{slot.utilization}% utilización</p>
                    </div>
                  </div>
                  <Progress
                    value={slot.utilization}
                    className={`h-3 ${
                      slot.utilization >= 90
                        ? "[&>div]:bg-red-500"
                        : slot.utilization >= 70
                          ? "[&>div]:bg-yellow-500"
                          : "[&>div]:bg-green-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
