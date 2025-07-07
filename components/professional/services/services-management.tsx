"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, MapPin, Calendar, Edit, Trash2, Plus } from "lucide-react"
import type { Service, Workplace } from "@/types/professional"
import { NewServiceModal } from "./new-service-modal"
import { EditServiceModal } from "./edit-service-modal"

interface ServicesManagementProps {
  services: Service[]
  workplaces: Workplace[]
}

export function ServicesManagement({ services, workplaces }: ServicesManagementProps) {
  const [showNewModal, setShowNewModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const handleEditService = (service: Service) => {
    setEditingService(service)
  }

  const handleDeleteService = (serviceId: string) => {
    console.log("Eliminar servicio:", serviceId)
  }

  const getWorkplaceName = (workplaceId: string) => {
    return workplaces?.find((w) => w.id === workplaceId)?.name || "Ubicación no encontrada"
  }

  const getActiveDaysCount = (service: Service) => {
    if (!service.schedule) return 0
    return Object.values(service.schedule).filter((day) => day.isAvailable).length
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Gestión de Servicios</h2>
          <p className="text-gray-600">Administra tus servicios y horarios de atención</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800" onClick={() => setShowNewModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Servicio
        </Button>
      </div>

      <div className="grid gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                      <Badge
                        className={
                          service.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {service.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {service.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{service.duration} minutos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>${service.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{getWorkplaceName(service.workplaceId)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{getActiveDaysCount(service)} días disponibles</span>
                  </div>
                </div>

                {service.schedule && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Horarios de Atención:</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(service.schedule).map(([day, schedule]) => {
                        if (!schedule.isAvailable) return null

                        const dayNames: { [key: string]: string } = {
                          monday: "Lun",
                          tuesday: "Mar",
                          wednesday: "Mié",
                          thursday: "Jue",
                          friday: "Vie",
                          saturday: "Sáb",
                          sunday: "Dom",
                        }

                        return (
                          <Badge key={day} variant="outline" className="text-xs">
                            {dayNames[day]}: {schedule.startTime}-{schedule.endTime}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button size="sm" variant="outline" onClick={() => handleEditService(service)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewServiceModal
        open={showNewModal}
        onOpenChange={setShowNewModal}
        workplaces={workplaces}
      />

      <EditServiceModal
        open={!!editingService}
        onOpenChange={(open) => !open && setEditingService(null)}
        service={editingService}
        workplaces={workplaces.map((w) => ({ id: w.id, name: w.name }))}
      />
    </div>
  )
}
