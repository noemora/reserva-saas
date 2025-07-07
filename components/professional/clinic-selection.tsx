"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface ClinicSelectionProps {
  onContinue: () => void
}

export function ClinicSelection({ onContinue }: ClinicSelectionProps) {
  const clinics = [
    {
      id: "1",
      name: "Clínica Centro",
      address: "Av. Principal 123",
    },
    {
      id: "2",
      name: "Clínica Norte",
      address: "Av. Norte 789",
    },
    {
      id: "3",
      name: "Centro Rehabilitación",
      address: "Calle Salud 456",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Selecciona una Clínica</h1>
          <p className="text-gray-600">
            Para comenzar, selecciona la clínica donde trabajarás hoy desde el menú superior.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {clinics.map((clinic) => (
            <Card key={clinic.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onContinue}>
              <CardContent className="p-8 text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{clinic.name}</h3>
                <p className="text-gray-600">{clinic.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
