"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Building, Star } from "lucide-react"
import type { Company } from "@/types/company"

interface CompanyProfileProps {
  company: Company
}

export function CompanyProfile({ company }: CompanyProfileProps) {
  const [establishmentInfo, setEstablishmentInfo] = useState({
    name: company.name,
    email: company.email,
    phone: company.phone,
    address: company.address,
    website: company.website,
    capacity: company.capacity.toString(),
    foundedYear: company.foundedYear.toString(),
    description: company.description,
    services: company.services.join(", "),
  })

  const [schedule, setSchedule] = useState(company.schedule)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleEstablishmentInfoChange = (field: string, value: string) => {
    setEstablishmentInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleScheduleChange = (day: string, field: "open" | "close" | "isOpen", value: string | boolean) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  const dayLabels = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Perfil del Lugar de Trabajo</h2>
        <p className="text-gray-600">Gestiona la información de tu establecimiento</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Establishment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Establecimiento</CardTitle>
            <p className="text-sm text-gray-600">Actualiza los datos de tu lugar de trabajo</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo/Icon */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">{company.name}</h3>
                <p className="text-gray-600">Lugar de Trabajo</p>
                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                  Cambiar Logo
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <Label htmlFor="establishmentName">Nombre del Establecimiento</Label>
              <Input
                id="establishmentName"
                value={establishmentInfo.name}
                onChange={(e) => handleEstablishmentInfoChange("name", e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={establishmentInfo.email}
                  onChange={(e) => handleEstablishmentInfoChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={establishmentInfo.phone}
                  onChange={(e) => handleEstablishmentInfoChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={establishmentInfo.address}
                onChange={(e) => handleEstablishmentInfoChange("address", e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="website">Sitio Web</Label>
                <Input
                  id="website"
                  value={establishmentInfo.website}
                  onChange={(e) => handleEstablishmentInfoChange("website", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacidad</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={establishmentInfo.capacity}
                  onChange={(e) => handleEstablishmentInfoChange("capacity", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="foundedYear">Año de Fundación</Label>
                <Input
                  id="foundedYear"
                  type="number"
                  value={establishmentInfo.foundedYear}
                  onChange={(e) => handleEstablishmentInfoChange("foundedYear", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={establishmentInfo.description}
                onChange={(e) => handleEstablishmentInfoChange("description", e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="services">Servicios Ofrecidos</Label>
              <Textarea
                id="services"
                value={establishmentInfo.services}
                onChange={(e) => handleEstablishmentInfoChange("services", e.target.value)}
                className="mt-1"
                rows={2}
                placeholder="Medicina General, Nutrición, Dermatología"
              />
            </div>

            <Button className="w-full bg-gray-900 hover:bg-gray-800">Editar Perfil</Button>
          </CardContent>
        </Card>

        {/* Schedule & Security */}
        <div className="space-y-6">
          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Horarios de Atención</CardTitle>
              <p className="text-sm text-gray-600">Configura los horarios de tu establecimiento</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(schedule).map(([day, daySchedule]) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-20">
                    <Label className="text-sm">{dayLabels[day as keyof typeof dayLabels]}</Label>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={daySchedule.open}
                      onChange={(e) => handleScheduleChange(day, "open", e.target.value)}
                      className="w-24"
                      disabled={!daySchedule.isOpen}
                    />
                    <span className="text-gray-500">-</span>
                    <Input
                      type="time"
                      value={daySchedule.close}
                      onChange={(e) => handleScheduleChange(day, "close", e.target.value)}
                      className="w-24"
                      disabled={!daySchedule.isOpen}
                    />
                    <input
                      type="checkbox"
                      checked={daySchedule.isOpen}
                      onChange={(e) => handleScheduleChange(day, "isOpen", e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <p className="text-sm text-gray-600">Cambia tu contraseña</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button className="w-full bg-gray-900 hover:bg-gray-800">Cambiar Contraseña</Button>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Profesionales Activos:</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reservas este Mes:</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ingresos del Mes:</span>
                <span className="font-semibold text-green-600">$12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating Promedio:</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
