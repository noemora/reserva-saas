"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Star } from "lucide-react"
import type { Professional } from "@/types/professional"

interface ProfessionalProfileProps {
  professional: Professional
}

export function ProfessionalProfile({ professional }: ProfessionalProfileProps) {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: professional.name,
    title: professional.title,
    email: professional.email,
    phone: professional.phone,
    licenseNumber: professional.licenseNumber,
    experience: professional.experience.toString(),
    education: professional.education,
    specialties: professional.specialties.join(", "),
    biography: professional.biography,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Mi Perfil Profesional</h2>
        <p className="text-gray-600">Gestiona tu información profesional y credenciales</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <p className="text-sm text-gray-600">Actualiza tus datos personales y profesionales</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-lg">
                  {professional.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{professional.name}</h3>
                <p className="text-gray-600">{professional.title}</p>
                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                  Cambiar Foto
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  value={personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="title">Título Profesional</Label>
                <Input
                  id="title"
                  value={personalInfo.title}
                  onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licenseNumber">Número de Matrícula</Label>
                <Input
                  id="licenseNumber"
                  value={personalInfo.licenseNumber}
                  onChange={(e) => handlePersonalInfoChange("licenseNumber", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="experience">Experiencia</Label>
                <Input
                  id="experience"
                  value={personalInfo.experience}
                  onChange={(e) => handlePersonalInfoChange("experience", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="education">Educación</Label>
              <Input
                id="education"
                value={personalInfo.education}
                onChange={(e) => handlePersonalInfoChange("education", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="specialties">Especialidades</Label>
              <Input
                id="specialties"
                value={personalInfo.specialties}
                onChange={(e) => handlePersonalInfoChange("specialties", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="biography">Biografía Profesional</Label>
              <Textarea
                id="biography"
                value={personalInfo.biography}
                onChange={(e) => handlePersonalInfoChange("biography", e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>

            <Button className="w-full bg-gray-900 hover:bg-gray-800">Editar Perfil</Button>
          </CardContent>
        </Card>

        {/* Security & Stats */}
        <div className="space-y-6">
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
                <span className="text-gray-600">Total de Reservas:</span>
                <span className="font-semibold">{professional.totalBookings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating Promedio:</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{professional.rating}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Años de Experiencia:</span>
                <span className="font-semibold">{professional.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Miembro desde:</span>
                <span className="font-semibold">{professional.memberSince}</span>
              </div>
            </CardContent>
          </Card>

          {/* Work Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Lugares de Trabajo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {professional.workplaces.map((workplace) => (
                <div key={workplace.id} className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-medium">{workplace.name}</p>
                    <p className="text-sm text-gray-600">{workplace.address}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
