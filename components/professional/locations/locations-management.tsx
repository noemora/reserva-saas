"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Edit, Trash2, Plus } from "lucide-react"
import type { Workplace } from "@/types/professional"
import { NewLocationModal } from "./new-location-modal"
import { EditLocationModal } from "./edit-location-modal"

interface LocationsManagementProps {
  workplaces: Workplace[]
}

export function LocationsManagement({ workplaces }: LocationsManagementProps) {
  const [showNewModal, setShowNewModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Workplace | null>(null)

  const handleEditLocation = (workplace: Workplace) => {
    setEditingLocation(workplace)
  }

  const handleDeleteLocation = (workplaceId: string) => {
    // Implementar lógica de eliminación
    console.log("Eliminar ubicación:", workplaceId)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Gestión de Ubicaciones</h2>
          <p className="text-gray-600">Administra tus lugares de trabajo</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800" onClick={() => setShowNewModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Ubicación
        </Button>
      </div>

      <div className="grid gap-6">
        {workplaces.map((workplace) => (
          <Card key={workplace.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{workplace.name}</h3>
                      <Badge
                        className={
                          workplace.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {workplace.isActive ? "Activa" : "Inactiva"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{workplace.address}</span>
                    </div>
                    {workplace.description && <p className="text-gray-600">{workplace.description}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {workplace.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{workplace.phone}</span>
                    </div>
                  )}
                  {workplace.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{workplace.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Servicios Disponibles:</p>
                  <div className="flex flex-wrap gap-2">
                    {workplace.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button size="sm" variant="outline" onClick={() => handleEditLocation(workplace)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => handleDeleteLocation(workplace.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewLocationModal open={showNewModal} onOpenChange={setShowNewModal} />

      <EditLocationModal
        open={!!editingLocation}
        onOpenChange={(open) => !open && setEditingLocation(null)}
        workplace={editingLocation}
      />
    </div>
  )
}
