"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, User, Star } from "lucide-react"
import type { BookingService, BookingLocation, BookingProfessional } from "@/types/booking"
import { BookingDataService } from "@/lib/services/booking-data-service"

interface ProfessionalSelectorProps {
  service: BookingService
  location: BookingLocation
  onProfessionalSelect: (professional: BookingProfessional) => void
  onBack: () => void
}

export function ProfessionalSelector({ service, location, onProfessionalSelect, onBack }: ProfessionalSelectorProps) {
  const availableProfessionals = BookingDataService.getAvailableProfessionalsForService(service, location)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold">Seleccionar Profesional</h3>
          <p className="text-gray-600">Elige el profesional de tu preferencia</p>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div>
              <p className="text-sm text-blue-600 font-medium">Servicio:</p>
              <p className="font-semibold">{service.name}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Ubicación:</p>
              <p className="font-semibold">{location.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableProfessionals.map((professional) => (
          <Card
            key={professional.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onProfessionalSelect(professional)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{professional.name}</h4>
                    <p className="text-gray-600">{professional.title}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{professional.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{professional.experience}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Especialidades:</p>
                  <div className="flex flex-wrap gap-1">
                    {professional.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
