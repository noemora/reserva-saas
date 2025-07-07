"use server"

import { supabase } from "@/lib/supabase"
import { supabaseServer } from "@/lib/supabase-server"
import type { Database } from "@/lib/database.types"
import { revalidatePath } from "next/cache"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

export async function createProfile(profileData: ProfileInsert) {
  try {
    const { data, error } = await supabaseServer.from("profiles").insert(profileData).select().single()

    if (error) {
      console.error("Error creating profile:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true, data }
  } catch (error) {
    console.error("Error creating profile:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getProfile(userId: string): Promise<{ success: boolean; data?: Profile; error?: string }> {
  try {
    const { data, error } = await supabaseServer.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error getting profile:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting profile:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function updateProfile(userId: string, updates: ProfileUpdate) {
  try {
    const { data, error } = await supabaseServer
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating profile:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true, data }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function deleteProfile(userId: string) {
  try {
    const { error } = await supabaseServer.from("profiles").delete().eq("id", userId)

    if (error) {
      console.error("Error deleting profile:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting profile:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Error signing in:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true, data }
  } catch (error) {
    console.error("Error signing in:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function signUpWithEmail(email: string, password: string, userData: Omit<ProfileInsert, "id" | "email">) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error("Error signing up:", error)
      return { success: false, error: error.message }
    }

    if (data.user) {
      // Create profile
      const profileResult = await createProfile({
        id: data.user.id,
        email,
        ...userData,
      })

      if (!profileResult.success) {
        return { success: false, error: "Error creando perfil de usuario" }
      }
    }

    revalidatePath("/")
    return { success: true, data }
  } catch (error) {
    console.error("Error signing up:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error signing out:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error signing out:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}
