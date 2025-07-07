"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ChevronLeft } from "lucide-react"
import type { BookingService, BookingLocation } from "@/types/booking"
import { BookingDataService } from "@/lib/services/booking-data-service"

interface LocationSelectorProps {
  service: BookingService
  onLocationSelect: (location: BookingLocation) => void
  onBack: () => void
}

export function LocationSelector({ service, onLocationSelect, onBack }: LocationSelectorProps) {
  const locations = BookingDataService.getLocations()
  const availableLocations = locations.filter((location) => service.locations.includes(location.id))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Seleccionar Ubicación</h3>
          <p className="text-gray-600">Selecciona la ubicación más conveniente</p>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-blue-600 font-medium">Servicio Seleccionado:</p>
              <p className="font-semibold">{service.name}</p>
              <p className="text-sm text-gray-600">
                {service.duration} min - ${service.price}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {availableLocations.map((location) => {
          const availableProfessionals = BookingDataService.getAvailableProfessionalsForService(service, location)

          return (
            <Card
              key={location.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onLocationSelect(location)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{location.name}</h4>
                    <p className="text-sm text-gray-600">{location.address}</p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Profesionales disponibles: {availableProfessionals.map((p) => p.name).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      {availableProfessionals.length} profesional{availableProfessionals.length > 1 ? "es" : ""}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
