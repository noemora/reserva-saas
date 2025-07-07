"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, TrendingUp, Users, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ProfessionalStatisticsProps {
  bookings: any[]
  services: any[]
  workplaces: any[]
  stats: any
}

export function ProfessionalStatistics({ bookings, services, workplaces, stats }: ProfessionalStatisticsProps) {
  // Calcular estadísticas detalladas
  const totalBookings = bookings.length
  const completedBookings = bookings.filter((b) => b.status === "completed").length
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const pendingBookings = bookings.filter((b) => b.status === "pending").length
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled").length

  const completionRate = totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0
  const confirmationRate = totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0

  const totalRevenue = bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + (b.price || 0), 0)

  const averageBookingValue = completedBookings > 0 ? totalRevenue / completedBookings : 0

  // Estadísticas por servicio
  const serviceStats = services
    .map((service) => {
      const serviceBookings = bookings.filter((b) => b.serviceId === service.id)
      const serviceRevenue = serviceBookings
        .filter((b) => b.status === "completed")
        .reduce((sum, b) => sum + (b.price || 0), 0)

      return {
        ...service,
        bookingCount: serviceBookings.length,
        revenue: serviceRevenue,
        completionRate:
          serviceBookings.length > 0
            ? (serviceBookings.filter((b) => b.status === "completed").length / serviceBookings.length) * 100
            : 0,
      }
    })
    .sort((a, b) => b.bookingCount - a.bookingCount)

  // Estadísticas por ubicación
  const workplaceStats = workplaces
    .map((workplace) => {
      const workplaceBookings = bookings.filter((b) => b.workplaceId === workplace.id)
      const workplaceRevenue = workplaceBookings
        .filter((b) => b.status === "completed")
        .reduce((sum, b) => sum + (b.price || 0), 0)

      return {
        ...workplace,
        bookingCount: workplaceBookings.length,
        revenue: workplaceRevenue,
        completionRate:
          workplaceBookings.length > 0
            ? (workplaceBookings.filter((b) => b.status === "completed").length / workplaceBookings.length) * 100
            : 0,
      }
    })
    .sort((a, b) => b.bookingCount - a.bookingCount)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Estadísticas Profesionales</h2>
        <p className="text-gray-600">Análisis detallado de tu desempeño y métricas</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Citas</p>
                <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasa de Finalización</p>
                <p className="text-2xl font-bold text-gray-900">{completionRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Promedio</p>
                <p className="text-2xl font-bold text-gray-900">${averageBookingValue.toFixed(0)}</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribución por estado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Distribución por Estado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Completadas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{completedBookings}</span>
                <span className="text-sm font-medium">{((completedBookings / totalBookings) * 100).toFixed(1)}%</span>
              </div>
            </div>
            <Progress value={(completedBookings / totalBookings) * 100} className="h-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Confirmadas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{confirmedBookings}</span>
                <span className="text-sm font-medium">{((confirmedBookings / totalBookings) * 100).toFixed(1)}%</span>
              </div>
            </div>
            <Progress value={(confirmedBookings / totalBookings) * 100} className="h-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium">Pendientes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{pendingBookings}</span>
                <span className="text-sm font-medium">{((pendingBookings / totalBookings) * 100).toFixed(1)}%</span>
              </div>
            </div>
            <Progress value={(pendingBookings / totalBookings) * 100} className="h-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">Canceladas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{cancelledBookings}</span>
                <span className="text-sm font-medium">{((cancelledBookings / totalBookings) * 100).toFixed(1)}%</span>
              </div>
            </div>
            <Progress value={(cancelledBookings / totalBookings) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rendimiento por servicio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Rendimiento por Servicio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceStats.slice(0, 5).map((service, index) => (
                <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{service.name}</span>
                      {index === 0 && (
                        <Badge variant="secondary" className="text-xs">
                          Más Popular
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {service.bookingCount} citas • ${service.revenue.toLocaleString()} ingresos
                    </div>
                    <Progress value={service.completionRate} className="h-1 mt-2" />
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-medium">{service.completionRate.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">finalización</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rendimiento por ubicación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Rendimiento por Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workplaceStats.map((workplace, index) => (
                <div key={workplace.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{workplace.name}</span>
                      {index === 0 && (
                        <Badge variant="secondary" className="text-xs">
                          Principal
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {workplace.bookingCount} citas • ${workplace.revenue.toLocaleString()} ingresos
                    </div>
                    <Progress value={workplace.completionRate} className="h-1 mt-2" />
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-medium">{workplace.completionRate.toFixed(1)}%</div>
                    <div className="text-xs text-gray-500">finalización</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas de calidad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Tasa de Finalización</p>
                <p className="text-xl font-bold text-green-600">{completionRate.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">
                  {completionRate >= 80 ? "Excelente" : completionRate >= 60 ? "Bueno" : "Mejorable"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Citas Pendientes</p>
                <p className="text-xl font-bold text-yellow-600">{pendingBookings}</p>
                <p className="text-xs text-gray-500">{pendingBookings === 0 ? "Al día" : "Requiere atención"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Tasa de Cancelación</p>
                <p className="text-xl font-bold text-red-600">
                  {((cancelledBookings / totalBookings) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">
                  {cancelledBookings / totalBookings < 0.1 ? "Excelente" : "Revisar causas"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
