"use client"

import { Button } from "@/components/ui/button"
import type { BookingData } from "@/types/booking"

interface BookingConfirmationProps {
  data: BookingData
  onConfirm: () => void
  onBack: () => void
  onCancel: () => void
}

export function BookingConfirmation({ data, onConfirm, onBack, onCancel }: BookingConfirmationProps) {
  return (
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
            <span className="font-medium">María García</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Servicio:</span>
            <span className="font-medium">{data.service?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ubicación:</span>
            <span className="font-medium">{data.location?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Profesional:</span>
            <span className="font-medium">{data.professional?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fecha:</span>
            <span className="font-medium">{data.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Hora:</span>
            <span className="font-medium">{data.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duración:</span>
            <span className="font-medium">{data.service?.duration} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Precio:</span>
            <span className="font-semibold text-green-600">${data.service?.price}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack}>
          Volver
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onConfirm} className="bg-gray-600 hover:bg-gray-700">
          Crear Reserva
        </Button>
      </div>
    </div>
  )
}
