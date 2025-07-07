"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Search, Building2 } from "lucide-react"
import type { Workplace } from "@/types/professional"

interface NewLocationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (workplace: Omit<Workplace, "id">) => void
}

// Ubicaciones existentes disponibles
const availableLocations = [
  {
    id: "loc-1",
    name: "Hospital Italiano",
    address: "Perón 4190, C1199ABB CABA",
    description: "Hospital de alta complejidad con múltiples especialidades",
    phone: "+54 11 4959-0200",
    email: "info@hospitalitaliano.org.ar",
    availableServices: ["Consulta General", "Cardiología", "Neurología", "Pediatría", "Ginecología"],
  },
  {
    id: "loc-2",
    name: "Sanatorio Güemes",
    address: "Av. Córdoba 2678, C1120AAF CABA",
    description: "Institución médica de excelencia con tecnología de vanguardia",
    phone: "+54 11 4962-9200",
    email: "contacto@sanatorioguemes.com.ar",
    availableServices: ["Consulta General", "Traumatología", "Oftalmología", "Dermatología"],
  },
  {
    id: "loc-3",
    name: "Centro Médico Deragopyan",
    address: "Av. Díaz Vélez 3889, C1200AAK CABA",
    description: "Centro médico ambulatorio con múltiples especialidades",
    phone: "+54 11 4958-5400",
    email: "turnos@deragopyan.com.ar",
    availableServices: ["Consulta General", "Endocrinología", "Gastroenterología", "Reumatología"],
  },
  {
    id: "loc-4",
    name: "Clínica Bazterrica",
    address: "Av. Jujuy 2176, C1117AAD CABA",
    description: "Clínica privada con servicios de internación y ambulatorios",
    phone: "+54 11 4305-7500",
    email: "info@bazterrica.com.ar",
    availableServices: ["Consulta General", "Cirugía", "Oncología", "Medicina Nuclear"],
  },
]

export function NewLocationModal({ isOpen, onClose, onSave }: NewLocationModalProps) {
  const [activeTab, setActiveTab] = useState("new")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<(typeof availableLocations)[0] | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  // Formulario para nueva ubicación
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    phone: "",
    email: "",
    services: [] as string[],
  })

  const filteredLocations = availableLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSaveNew = () => {
    if (!formData.name || !formData.address) return

    onSave({
      name: formData.name,
      address: formData.address,
      description: formData.description,
      phone: formData.phone,
      email: formData.email,
      services: formData.services,
      isActive: true,
    })

    // Reset form
    setFormData({
      name: "",
      address: "",
      description: "",
      phone: "",
      email: "",
      services: [],
    })
    onClose()
  }

  const handleSaveExisting = () => {
    if (!selectedLocation || selectedServices.length === 0) return

    onSave({
      name: selectedLocation.name,
      address: selectedLocation.address,
      description: selectedLocation.description,
      phone: selectedLocation.phone,
      email: selectedLocation.email,
      services: selectedServices,
      isActive: true,
    })

    // Reset selection
    setSelectedLocation(null)
    setSelectedServices([])
    onClose()
  }

  const handleServiceToggle = (service: string, checked: boolean) => {
    if (activeTab === "new") {
      setFormData((prev) => ({
        ...prev,
        services: checked ? [...prev.services, service] : prev.services.filter((s) => s !== service),
      }))
    } else {
      setSelectedServices((prev) => (checked ? [...prev, service] : prev.filter((s) => s !== service)))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Agregar Lugar de Trabajo
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">Nueva Ubicación</TabsTrigger>
            <TabsTrigger value="existing">Ubicación Existente</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Mi Consultorio"
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Ej: +54 11 1234-5678"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Ej: Av. Corrientes 1234, CABA"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Ej: contacto@consultorio.com"
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción del lugar de trabajo..."
                rows={3}
              />
            </div>

            <div>
              <Label>Servicios que ofrecerás</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Consulta General", "Consulta Especializada", "Control", "Urgencia", "Cirugía Menor"].map(
                  (service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={`new-${service}`}
                        checked={formData.services.includes(service)}
                        onCheckedChange={(checked) => handleServiceToggle(service, checked as boolean)}
                      />
                      <Label htmlFor={`new-${service}`} className="text-sm">
                        {service}
                      </Label>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSaveNew} disabled={!formData.name || !formData.address}>
                Guardar Ubicación
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="existing" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar ubicación por nombre o dirección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div>
              <Label>Seleccionar Ubicación</Label>
              <Select
                onValueChange={(value) => {
                  const location = availableLocations.find((loc) => loc.id === value)
                  setSelectedLocation(location || null)
                  setSelectedServices([])
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Elige una ubicación..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-gray-500">{location.address}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedLocation && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{selectedLocation.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{selectedLocation.address}</p>
                    <p className="text-sm text-gray-700 mb-3">{selectedLocation.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Teléfono:</span>
                        <p className="text-gray-600">{selectedLocation.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>
                        <p className="text-gray-600">{selectedLocation.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedLocation && (
              <div>
                <Label>Servicios que ofrecerás en esta ubicación *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {selectedLocation.availableServices.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={`existing-${service}`}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={(checked) => handleServiceToggle(service, checked as boolean)}
                      />
                      <Label htmlFor={`existing-${service}`} className="text-sm">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedServices.length === 0 && (
                  <p className="text-sm text-red-500 mt-1">Debes seleccionar al menos un servicio</p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSaveExisting} disabled={!selectedLocation || selectedServices.length === 0}>
                Agregar Ubicación
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
