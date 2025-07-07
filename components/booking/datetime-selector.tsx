"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { BookingService, BookingProfessional } from "@/types/booking"
import { AvailabilityService } from "@/lib/services/availability-service"

interface DateTimeSelectorProps {
  service: BookingService
  professional: BookingProfessional
  onDateTimeSelect: (date: string, time: string) => void
  onBack: () => void
}

export function DateTimeSelector({ service, professional, onDateTimeSelect, onBack }: DateTimeSelectorProps) {
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

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return []

    const dateString = `2025-06-${selectedDate.split("/")[0].padStart(2, "0")}`
    const dateObj = new Date(dateString)
    const bookedSlots = AvailabilityService.getMockBookedSlots()

    return AvailabilityService.getAvailableTimeSlots(professional, service, dateObj, bookedSlots)
  }

  const availableTimeSlots = getAvailableTimeSlots()

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onDateTimeSelect(selectedDate, selectedTime)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
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
        {dates.map((date, index) => {
          const dateString = `2025-06-${date.day.padStart(2, "0")}`
          const dateObj = new Date(dateString)

          const isAvailable = AvailabilityService.isServiceAvailableOnDate(professional, service, dateObj)

          return (
            <button
              key={index}
              onClick={() => isAvailable && setSelectedDate(`${date.day}/${date.month}`)}
              disabled={!isAvailable}
              className={`p-3 text-center rounded-lg border transition-colors ${
                !isAvailable
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  : selectedDate === `${date.day}/${date.month}`
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-lg font-semibold">{date.day}</div>
              <div className="text-xs">{date.weekday}</div>
            </button>
          )
        })}
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Selecciona una hora</h4>
            <p className="text-sm text-gray-600">{availableTimeSlots.length} disponibles</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {availableTimeSlots.map((time) => (
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

          {availableTimeSlots.length === 0 && selectedDate && (
            <div className="text-center py-4">
              <p className="text-gray-500">No hay horarios disponibles para esta fecha</p>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack}>
          Volver
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className="bg-gray-600 hover:bg-gray-700"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
