"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, User, Star, Settings, Trash2 } from "lucide-react"
import { NewProfessionalModal } from "./new-professional-modal"
import type { CompanyProfessional, Company } from "@/types/company"

interface CompanyProfessionalsManagementProps {
  professionals: CompanyProfessional[]
  company: Company
  onAddProfessional: (professional: Omit<CompanyProfessional, "id" | "joinedDate">) => CompanyProfessional
  onUpdateProfessional: (id: string, updates: Partial<CompanyProfessional>) => void
}

export function CompanyProfessionalsManagement({
  professionals,
  company,
  onAddProfessional,
  onUpdateProfessional,
}: CompanyProfessionalsManagementProps) {
  const [showNewProfessional, setShowNewProfessional] = useState(false)

  const activeProfessionals = professionals.filter((p) => p.isActive)
  const totalRevenue = professionals.reduce((sum, p) => sum + p.monthlyRevenue, 0)
  const averageRating =
    professionals.length > 0 ? professionals.reduce((sum, p) => sum + p.rating, 0) / professionals.length : 0

  const stats = [
    {
      label: "Total Profesionales",
      value: professionals.length.toString(),
      icon: User,
      color: "text-blue-600",
    },
    {
      label: "Activos Hoy",
      value: activeProfessionals.length.toString(),
      icon: User,
      color: "text-green-600",
    },
    {
      label: "Ingresos del Mes",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: Plus,
      color: "text-purple-600",
    },
    {
      label: "Promedio Rating",
      value: averageRating.toFixed(1),
      icon: Star,
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Gestión de Profesionales</h2>
          <p className="text-gray-600">Administra los profesionales que trabajan en tu lugar</p>
        </div>
        <Button onClick={() => setShowNewProfessional(true)} className="bg-gray-900 hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Profesional
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {professionals.map((professional) => (
          <Card key={professional.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{professional.name}</h3>
                      <p className="text-gray-600">{professional.title}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      professional.isActive
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {professional.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">📧 {professional.email}</p>
                  <p className="text-sm text-gray-600">📞 {professional.phone}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-1">
                    {professional.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{professional.todayBookings}</p>
                    <p className="text-sm text-gray-600">Reservas Hoy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{professional.weeklyBookings}</p>
                    <p className="text-sm text-gray-600">Esta Semana</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">${professional.monthlyRevenue}</p>
                    <p className="text-sm text-gray-600">Este Mes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">${professional.monthlyRevenue}</p>
                    <p className="text-sm text-gray-600">Ingresos</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{professional.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Desde {professional.joinedDate}</p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpdateProfessional(professional.id, { isActive: !professional.isActive })}
                  >
                    {professional.isActive ? "Desactivar" : "Activar"}
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewProfessionalModal
        open={showNewProfessional}
        onClose={() => setShowNewProfessional(false)}
        company={company}
        onAddProfessional={onAddProfessional}
      />
    </div>
  )
}
