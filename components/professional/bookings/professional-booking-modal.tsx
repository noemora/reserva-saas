"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronLeft, ChevronRight, User } from "lucide-react"
import type { Client, Service, Workplace, Booking } from "@/types/professional"

interface ProfessionalBookingModalProps {
  open: boolean
  onClose: () => void
  clients: Client[]
  services: Service[]
  selectedWorkplace?: Workplace
  onAddBooking: (booking: Omit<Booking, "id">) => void
  onAddClient: (client: Omit<Client, "id" | "createdAt">) => Client
}

export function ProfessionalBookingModal({
  open,
  onClose,
  clients,
  services,
  selectedWorkplace,
  onAddBooking,
  onAddClient,
}: ProfessionalBookingModalProps) {
  const [step, setStep] = useState<"client" | "service" | "datetime" | "confirmation">("client")
  const [clientMode, setClientMode] = useState<"existing" | "new">("existing")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [newClientData, setNewClientData] = useState({ name: "", email: "", phone: "" })
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  const dates = [
    { day: "26", weekday: "JUE", month: "JUNIO" },
    { day: "27", weekday: "VIE", month: "JUNIO" },
    { day: "30", weekday: "LUN", month: "JUNIO" },
    { day: "1", weekday: "MAR", month: "JULIO" },
    { day: "2", weekday: "MIE", month: "JULIO" },
    { day: "3", weekday: "JUE", month: "JULIO" },
    { day: "4", weekday: "VIE", month: "JULIO" },
  ]

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ]

  const handleClientSelection = () => {
    if (clientMode === "existing" && selectedClient) {
      setStep("service")
    } else if (clientMode === "new" && newClientData.name && newClientData.email && newClientData.phone) {
      const client = onAddClient(newClientData)
      setSelectedClient(client)
      setStep("service")
    }
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setStep("datetime")
  }

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      setStep("confirmation")
    }
  }

  const handleConfirmBooking = () => {
    if (selectedClient && selectedService && selectedDate && selectedTime && selectedWorkplace) {
      const booking: Omit<Booking, "id"> = {
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        clientEmail: selectedClient.email,
        clientPhone: selectedClient.phone,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        date: "2025-07-01", // Mock date
        time: selectedTime,
        duration: selectedService.duration,
        price: selectedService.price,
        status: "pending",
        workplaceId: selectedWorkplace.id,
        workplaceName: selectedWorkplace.name,
      }

      onAddBooking(booking)
      onClose()
      resetModal()
    }
  }

  const resetModal = () => {
    setStep("client")
    setClientMode("existing")
    setSelectedClient(null)
    setNewClientData({ name: "", email: "", phone: "" })
    setSelectedService(null)
    setSelectedDate("")
    setSelectedTime("")
  }

  const renderClientSelection = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Seleccionar Cliente</h3>
        <p className="text-gray-600">Selecciona un cliente existente o registra uno nuevo</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={clientMode === "existing" ? "default" : "outline"}
          onClick={() => setClientMode("existing")}
          className="flex-1"
        >
          Cliente Existente
        </Button>
        <Button
          variant={clientMode === "new" ? "default" : "outline"}
          onClick={() => setClientMode("new")}
          className="flex-1"
        >
          Nuevo Cliente
        </Button>
      </div>

      {clientMode === "existing" ? (
        <div className="space-y-4">
          <div>
            <Label>Seleccionar Cliente</Label>
            <Select
              value={selectedClient?.id}
              onValueChange={(value) => {
                const client = clients.find((c) => c.id === value)
                setSelectedClient(client || null)
              }}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Buscar cliente..." />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.email}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="clientName">Nombre Completo</Label>
            <Input
              id="clientName"
              value={newClientData.name}
              onChange={(e) => setNewClientData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nombre del cliente"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={newClientData.email}
              onChange={(e) => setNewClientData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="email@ejemplo.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="clientPhone">Teléfono</Label>
            <Input
              id="clientPhone"
              value={newClientData.phone}
              onChange={(e) => setNewClientData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+1234567890"
              className="mt-1"
            />
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          onClick={handleClientSelection}
          disabled={
            clientMode === "existing"
              ? !selectedClient
              : !newClientData.name || !newClientData.email || !newClientData.phone
          }
        >
          Continuar
        </Button>
      </div>
    </div>
  )

  const renderServiceSelection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setStep("client")}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Seleccionar Servicio</h3>
          <p className="text-gray-600">Elige el servicio para {selectedClient?.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {services.map((service) => (
          <Card
            key={service.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleServiceSelect(service)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">{service.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {service.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{service.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration} min
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-green-600">${service.price}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderDateTimeSelection = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setStep("service")}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Seleccionar Fecha y Hora</h3>
          <p className="text-gray-600">Elige la fecha y hora disponible</p>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">JUNIO</h4>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(`${date.day}/${date.month}`)}
            className={`p-3 text-center rounded-lg border transition-colors ${
              selectedDate === `${date.day}/${date.month}`
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-lg font-semibold">{date.day}</div>
            <div className="text-xs">{date.weekday}</div>
          </button>
        ))}
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Selecciona una hora</h4>
            <p className="text-sm text-gray-600">16 disponibles de 16 horarios</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 text-center rounded-lg border transition-colors ${
                  selectedTime === time
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setStep("service")}>
          Volver
        </Button>
        <Button
          onClick={handleDateTimeSelect}
          disabled={!selectedDate || !selectedTime}
          className="bg-gray-600 hover:bg-gray-700"
        >
          Continuar
        </Button>
      </div>
    </div>
  )

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Confirmar Reserva</h3>
        <p className="text-gray-600">Revisa y confirma los detalles de la reserva</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Resumen de la Reserva</h4>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Cliente:</span>
            <span className="font-medium">{selectedClient?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{selectedClient?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Teléfono:</span>
            <span className="font-medium">{selectedClient?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Servicio:</span>
            <span className="font-medium">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ubicación:</span>
            <span className="font-medium">{selectedWorkplace?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fecha:</span>
            <span className="font-medium">2025-07-01</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Hora:</span>
            <span className="font-medium">{selectedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duración:</span>
            <span className="font-medium">{selectedService?.duration} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Precio:</span>
            <span className="font-semibold text-green-600">${selectedService?.price}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setStep("datetime")}>
          Volver
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleConfirmBooking} className="bg-gray-600 hover:bg-gray-700">
          Crear Reserva
        </Button>
      </div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Reserva</DialogTitle>
          <p className="text-gray-600">Reserva un servicio para un cliente</p>
        </DialogHeader>

        <div className="mt-6">
          {step === "client" && renderClientSelection()}
          {step === "service" && renderServiceSelection()}
          {step === "datetime" && renderDateTimeSelection()}
          {step === "confirmation" && renderConfirmation()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
