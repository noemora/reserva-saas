"use client"

import type React from "react"

import { useEffect } from "react"
import { redirect } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Redirige a /auth/login si no hay sesión.
 * Muestra un spinner mientras se comprueba el estado.
 */
export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { session, profile, isLoading, loading, initialize } = useAuthStore()

  useEffect(() => {
    console.log("🛡️ AuthGuard: Inicializando...")
    initialize()
  }, [initialize])

  // Mostrar loading mientras se inicializa o está cargando
  if (isLoading || loading) {
    console.log("⏳ AuthGuard: Cargando...", { isLoading, loading })
    return (
      fallback ?? (
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      )
    )
  }

  // Si no hay sesión, redirigir al login
  if (!session) {
    console.log("🚫 AuthGuard: No hay sesión, redirigiendo a login")
    redirect("/auth/login")
  }

  // Si hay sesión pero no perfil, mostrar error
  if (session && !profile) {
    console.log("⚠️ AuthGuard: Sesión sin perfil")
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: No se pudo cargar el perfil de usuario</p>
          <button
            onClick={() => useAuthStore.getState().signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  console.log("✅ AuthGuard: Usuario autenticado", { session: !!session, profile: !!profile })
  return <>{children}</>
}
