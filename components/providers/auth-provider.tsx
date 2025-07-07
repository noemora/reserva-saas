"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/lib/stores/auth-store"

interface AuthProviderProps {
  children: React.ReactNode
}

/**
 * Listener mínimo para futuras integraciones con Supabase.
 * Ahora mismo solo hidrata el store si existieran datos de perfil persistidos.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { profile, setProfile } = useAuthStore()

  // Ejemplo: podrías comprobar la sesión de Supabase aquí.
  useEffect(() => {
    if (!profile) {
      // fetchProfileFromSupabase().then(setProfile)
    }
  }, [profile, setProfile])

  return children
}
