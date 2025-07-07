"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, User, Clock, CheckCircle, XCircle } from "lucide-react"
import { ProfessionalBookingModal } from "./professional-booking-modal"
import type { Booking, Client, Service, Workplace } from "@/types/professional"

interface BookingsManagementProps {
  bookings: Booking[]
  clients: Client[]
  services: Service[]
  selectedWorkplace?: Workplace
  onUpdateBookingStatus: (id: string, status: Booking["status"]) => void
  onAddBooking: (booking: Omit<Booking, "id">) => void
  onAddClient: (client: Omit<Client, "id" | "createdAt">) => Client
}

export function BookingsManagement({
  bookings,
  clients,
  services,
  selectedWorkplace,
  onUpdateBookingStatus,
  onAddBooking,
  onAddClient,
}: BookingsManagementProps) {
  const [showNewBooking, setShowNewBooking] = useState(false)
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all")

  const workplaceBookings = bookings.filter((b) => b.workplaceId === selectedWorkplace?.id)

  const filteredBookings =
    activeFilter === "all" ? workplaceBookings : workplaceBookings.filter((b) => b.status === activeFilter)

  const stats = [
    {
      label: "Pendientes",
      value: workplaceBookings.filter((b) => b.status === "pending").length,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      label: "Confirmadas",
      value: workplaceBookings.filter((b) => b.status === "confirmed").length,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Completadas",
      value: workplaceBookings.filter((b) => b.status === "completed").length,
      icon: CheckCircle,
      color: "text-blue-600",
    },
    {
      label: "Canceladas",
      value: workplaceBookings.filter((b) => b.status === "cancelled").length,
      icon: XCircle,
      color: "text-red-600",
    },
  ]

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmada</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completada</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Gestión de Reservas</h2>
          <p className="text-gray-600">Administra las reservas de {selectedWorkplace?.name}</p>
        </div>
        <Button onClick={() => setShowNewBooking(true)} className="bg-gray-900 hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Reserva
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { key: "all", label: "Todas" },
          { key: "pending", label: "Pendientes" },
          { key: "confirmed", label: "Confirmadas" },
          { key: "completed", label: "Completadas" },
          { key: "cancelled", label: "Canceladas" },
        ].map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter.key as any)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No hay reservas para mostrar</p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{booking.clientName}</h3>
                    <p className="text-sm text-gray-600">
                      {booking.clientEmail} • {booking.clientPhone}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{booking.date}</span>
                      <span>{booking.time}</span>
                      <span>{booking.workplaceName}</span>
                    </div>
                    <p className="text-sm font-medium mt-1">{booking.serviceName}</p>
                    {booking.notes && <p className="text-sm text-gray-600 mt-1">{booking.notes}</p>}
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(booking.status)}
                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => onUpdateBookingStatus(booking.id, "confirmed")}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Marcar como Completada
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateBookingStatus(booking.id, "cancelled")}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <ProfessionalBookingModal
        open={showNewBooking}
        onClose={() => setShowNewBooking(false)}
        clients={clients}
        services={services.filter((s) => s.workplaceId === selectedWorkplace?.id)}
        selectedWorkplace={selectedWorkplace}
        onAddBooking={onAddBooking}
        onAddClient={onAddClient}
      />
    </div>
  )
}
