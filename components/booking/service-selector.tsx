"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Filter } from "lucide-react"
import type { BookingService } from "@/types/booking"
import { BookingDataService } from "@/lib/services/booking-data-service"

interface ServiceSelectorProps {
  onServiceSelect: (service: BookingService) => void
}

export function ServiceSelector({ onServiceSelect }: ServiceSelectorProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [professionalFilter, setProfessionalFilter] = useState<string>("all")

  const services = BookingDataService.getServices()
  const categories = BookingDataService.getCategories()
  const allProfessionals = BookingDataService.getAllProfessionalNames()

  const filteredServices = services.filter((service) => {
    const categoryMatch = categoryFilter === "all" || service.category === categoryFilter
    const professionalMatch = professionalFilter === "all" || service.professionals.includes(professionalFilter)
    return categoryMatch && professionalMatch
  })

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Seleccionar Servicio</h3>
        <p className="text-gray-600">Elige el servicio que necesitas</p>
      </div>

      {/* Filtros */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h4 className="font-medium">Filtros</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Categoría</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Profesional</label>
              <Select value={professionalFilter} onValueChange={setProfessionalFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Todos los profesionales" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los profesionales</SelectItem>
                  {allProfessionals.map((professional) => (
                    <SelectItem key={professional} value={professional}>
                      {professional}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onServiceSelect(service)}
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
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {service.professionals.length} profesional{service.professionals.length > 1 ? "es" : ""}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-green-600">${service.price}</div>
                </div>
                <div className="text-xs text-gray-500">Profesionales: {service.professionals.join(", ")}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron servicios con los filtros seleccionados</p>
          <Button
            variant="outline"
            onClick={() => {
              setCategoryFilter("all")
              setProfessionalFilter("all")
            }}
            className="mt-2"
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  )
}
