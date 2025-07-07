"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Settings, User, BarChart3, Home } from "lucide-react"

interface ProfessionalNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  selectedWorkplace?: any
}

export function ProfessionalNavigation({ activeTab, onTabChange, selectedWorkplace }: ProfessionalNavigationProps) {
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      id: "bookings",
      label: "Reservas",
      icon: Calendar,
    },
    {
      id: "calendar",
      label: "Calendario",
      icon: Calendar,
    },
    {
      id: "services",
      label: "Servicios",
      icon: Settings,
    },
    {
      id: "locations",
      label: "Ubicaciones",
      icon: MapPin,
    },
    {
      id: "statistics",
      label: "Estadísticas",
      icon: BarChart3,
    },
    {
      id: "profile",
      label: "Perfil",
      icon: User,
    },
  ]

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Panel Profesional</h2>

        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </div>

        {selectedWorkplace && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-1">Ubicación Actual</div>
            <div className="text-sm text-gray-600">{selectedWorkplace.name}</div>
          </div>
        )}
      </div>
    </nav>
  )
}
