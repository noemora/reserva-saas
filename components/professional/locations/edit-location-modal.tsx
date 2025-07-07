"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Building2, Phone, Mail, FileText, Briefcase } from "lucide-react"
import type { Workplace } from "@/types/professional"

interface EditLocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workplace: Workplace | null
}

const availableServices = [
  "Consulta General",
  "Especialidad Médica",
  "Terapia Física",
  "Psicología",
  "Nutrición",
  "Cardiología",
  "Dermatología",
  "Pediatría",
]

export function EditLocationModal({ open, onOpenChange, workplace }: EditLocationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    phone: "",
    email: "",
    services: [] as string[],
  })

  useEffect(() => {
    if (workplace) {
      setFormData({
        name: workplace.name,
        address: workplace.address,
        description: workplace.description || "",
        phone: workplace.phone || "",
        email: workplace.email || "",
        services: workplace.services,
      })
    }
  }, [workplace])

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de actualización
    console.log("Actualizar ubicación:", { id: workplace?.id, ...formData })
    onOpenChange(false)
  }

  if (!workplace) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Editar Ubicación
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Básica</h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="edit-name" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Nombre de la Ubicación *
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Clínica Central"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Dirección *
                </Label>
                <Input
                  id="edit-address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Ej: Av. Principal 123, Ciudad"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-description" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Descripción (Opcional)
                </Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción de la ubicación..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información de Contacto (Opcional)</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Teléfono
                </Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Ej: +1 234 567 8900"
                />
              </div>

              <div>
                <Label htmlFor="edit-email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Ej: contacto@clinica.com"
                />
              </div>
            </div>
          </div>

          {/* Servicios Disponibles */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Servicios Disponibles *
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-${service}`}
                    checked={formData.services.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <Label htmlFor={`edit-${service}`} className="text-sm font-normal cursor-pointer">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
            {formData.services.length === 0 && <p className="text-sm text-red-600">Selecciona al menos un servicio</p>}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800"
              disabled={!formData.name || !formData.address || formData.services.length === 0}
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
