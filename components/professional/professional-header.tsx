"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, LogOut, MapPin, Settings, User } from "lucide-react"
import type { Professional, Workplace } from "@/types/professional"

interface ProfessionalHeaderProps {
  professional?: Professional | null
  workplaces?: Workplace[]
  selectedWorkplaceId?: string
  onWorkplaceChange?: (id: string) => void
}

export function ProfessionalHeader({
  professional = null,
  workplaces = [],
  selectedWorkplaceId,
  onWorkplaceChange,
}: ProfessionalHeaderProps) {
  const { profile, signOut } = useAuth()

  /* ------------------------------------------------------------------ */
  /* Helpers                                                            */
  /* ------------------------------------------------------------------ */
  const fullName = professional?.name || profile?.full_name || professional?.email || profile?.email || "Usuario"

  const initials = fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const avatarUrl = profile?.avatar_url ?? professional?.avatar_url ?? ""

  const handleLogout = async () => {
    await signOut()
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left ― Title & badge */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Panel Profesional</h1>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {profile?.user_type ?? "Profesional"}
          </Badge>
        </div>

        {/* Right ― actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              3
            </span>
          </Button>

          {/* Workplace selector (si aplica) */}
          {workplaces.length > 0 && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <select
                className="rounded-md border px-2 py-1 text-sm"
                value={selectedWorkplaceId ?? ""}
                onChange={(e) => onWorkplaceChange?.(e.target.value)}
              >
                <option value="" disabled>
                  Seleccionar clínica
                </option>
                {workplaces.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={fullName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Abrir menú de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium leading-none">{fullName}</span>
                  <span className="text-xs text-gray-500">{profile?.email ?? professional?.email ?? ""}</span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" /> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Configuración
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
