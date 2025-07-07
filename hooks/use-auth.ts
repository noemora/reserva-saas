"use client"

/**
 * Hook de compatibilidad para proyectos que aún importan `useAuth`
 * desde "@/hooks/use-auth".  Internamente lee y expone el estado
 * del store de Zustand (`useAuthStore`), evitando dependencias de
 * React Context.
 *
 * Si más adelante quieres migrar todo a `useAuthStore` directamente,
 * solo tendrás que actualizar las importaciones, pero este wrapper
 * garantiza que nada rompa durante la transición.
 */

import { useAuthStore } from "@/lib/stores/auth-store"

/**
 * Mantiene la API anterior (`useAuth()`) pero delega en Zustand.
 * Así no hace falta refactorizar todos los imports.
 */
export const useAuth = useAuthStore
export default useAuth
