"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import type { CompanyProfessional, Company } from "@/types/company"

interface NewProfessionalModalProps {
  open: boolean
  onClose: () => void
  company: Company
  onAddProfessional: (professional: Omit<CompanyProfessional, "id" | "joinedDate">) => CompanyProfessional
}

export function NewProfessionalModal({ open, onClose, company, onAddProfessional }: NewProfessionalModalProps) {
  const [mode, setMode] = useState<"existing" | "new">("existing")
  const [selectedProfessional, setSelectedProfessional] = useState<string>("")
  const [newProfessionalData, setNewProfessionalData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    specialties: [] as string[],
  })

  // Mock existing professionals that could be added
  const existingProfessionals = [
    {
      id: "4",
      name: "Dr. María González",
      title: "Cardióloga",
      email: "maria.gonzalez@email.com",
      phone: "+1234567898",
      specialties: ["Cardiología", "Medicina Interna"],
    },
    {
      id: "5",
      name: "Lic. Pedro Martín",
      title: "Fisioterapeuta",
      email: "pedro.martin@email.com",
      phone: "+1234567899",
      specialties: ["Fisioterapia", "Rehabilitación"],
    },
  ]

  const specialtyOptions = [
    "Medicina General",
    "Cardiología",
    "Dermatología",
    "Nutrición",
    "Fisioterapia",
    "Psicología",
    "Pediatría",
    "Ginecología",
  ]

  const handleSubmit = () => {
    if (mode === "existing" && selectedProfessional) {
      const professional = existingProfessionals.find((p) => p.id === selectedProfessional)
      if (professional) {
        const newProfessional: Omit<CompanyProfessional, "id" | "joinedDate"> = {
          name: professional.name,
          title: professional.title,
          email: professional.email,
          phone: professional.phone,
          specialties: professional.specialties,
          isActive: true,
          todayBookings: 0,
          weeklyBookings: 0,
          monthlyRevenue: 0,
          rating: 0,
        }
        onAddProfessional(newProfessional)
        onClose()
        resetModal()
      }
    } else if (mode === "new" && newProfessionalData.name && newProfessionalData.email && newProfessionalData.phone) {
      const professional: Omit<CompanyProfessional, "id" | "joinedDate"> = {
        name: newProfessionalData.name,
        title: newProfessionalData.title || "Profesional",
        email: newProfessionalData.email,
        phone: newProfessionalData.phone,
        specialties: newProfessionalData.specialties,
        isActive: true,
        todayBookings: 0,
        weeklyBookings: 0,
        monthlyRevenue: 0,
        rating: 0,
      }
      onAddProfessional(professional)
      onClose()
      resetModal()
    }
  }

  const resetModal = () => {
    setMode("existing")
    setSelectedProfessional("")
    setNewProfessionalData({
      name: "",
      email: "",
      phone: "",
      title: "",
      specialties: [],
    })
  }

  const handleSpecialtyToggle = (specialty: string) => {
    setNewProfessionalData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nuevo Profesional</DialogTitle>
          <p className="text-gray-600">Selecciona un profesional existente o registra uno nuevo</p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="flex gap-2">
            <Button
              variant={mode === "existing" ? "default" : "outline"}
              onClick={() => setMode("existing")}
              className="flex-1"
            >
              Profesional Existente
            </Button>
            <Button variant={mode === "new" ? "default" : "outline"} onClick={() => setMode("new")} className="flex-1">
              Nuevo Profesional
            </Button>
          </div>

          {mode === "existing" ? (
            <div className="space-y-4">
              <div>
                <Label>Seleccionar Profesional</Label>
                <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Buscar profesional..." />
                  </SelectTrigger>
                  <SelectContent>
                    {existingProfessionals.map((professional) => (
                      <SelectItem key={professional.id} value={professional.id}>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <div>
                            <p className="font-medium">{professional.name}</p>
                            <p className="text-sm text-gray-500">{professional.title}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProfessional && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    {(() => {
                      const professional = existingProfessionals.find((p) => p.id === selectedProfessional)
                      return professional ? (
                        <div>
                          <h4 className="font-semibold">{professional.name}</h4>
                          <p className="text-gray-600">{professional.title}</p>
                          <p className="text-sm text-gray-600">{professional.email}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {professional.specialties.map((specialty) => (
                              <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="professionalName">Nombre Completo</Label>
                  <Input
                    id="professionalName"
                    value={newProfessionalData.name}
                    onChange={(e) => setNewProfessionalData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Dr. Juan Pérez"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="professionalTitle">Título Profesional</Label>
                  <Input
                    id="professionalTitle"
                    value={newProfessionalData.title}
                    onChange={(e) => setNewProfessionalData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Médico General"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="professionalEmail">Email</Label>
                  <Input
                    id="professionalEmail"
                    type="email"
                    value={newProfessionalData.email}
                    onChange={(e) => setNewProfessionalData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="doctor@email.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="professionalPhone">Teléfono</Label>
                  <Input
                    id="professionalPhone"
                    value={newProfessionalData.phone}
                    onChange={(e) => setNewProfessionalData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1234567890"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Especialidades</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {specialtyOptions.map((specialty) => (
                    <label key={specialty} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newProfessionalData.specialties.includes(specialty)}
                        onChange={() => handleSpecialtyToggle(specialty)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                mode === "existing"
                  ? !selectedProfessional
                  : !newProfessionalData.name || !newProfessionalData.email || !newProfessionalData.phone
              }
              className="flex-1 bg-gray-600 hover:bg-gray-700"
            >
              Agregar Profesional
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
