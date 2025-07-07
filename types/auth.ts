import type { Session } from "@supabase/supabase-js"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  user_type: "Cliente" | "Profesional" | "Empresa"
  avatar_url: string | null
  created_at: string
}

export interface AuthSlice {
  session: Session | null
  profile: Profile | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  setProfile: (profile: Profile | null) => void
}
