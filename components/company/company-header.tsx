"use client"

import { Button } from "@/components/ui/button"
import { Building } from "lucide-react"
import type { Company } from "@/types/company"

interface CompanyHeaderProps {
  company: Company
  onLogout: () => void
}

export function CompanyHeader({ company, onLogout }: CompanyHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Panel de Administración</h1>
            <p className="text-sm text-gray-600">Bienvenido, {company.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">Lugar de Trabajo</span>
            </div>

            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">Empresa</span>

            <Button variant="outline" onClick={onLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
