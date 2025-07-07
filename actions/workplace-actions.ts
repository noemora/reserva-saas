"use server"

import { supabaseServer } from "@/lib/supabase-server"
import type { Database } from "@/lib/database.types"
import { revalidatePath } from "next/cache"

type Workplace = Database["public"]["Tables"]["workplaces"]["Row"]
type WorkplaceInsert = Database["public"]["Tables"]["workplaces"]["Insert"]
type WorkplaceUpdate = Database["public"]["Tables"]["workplaces"]["Update"]

export async function createWorkplace(workplaceData: WorkplaceInsert) {
  try {
    const { data, error } = await supabaseServer.from("workplaces").insert(workplaceData).select().single()

    if (error) {
      console.error("Error creating workplace:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/professional")
    revalidatePath("/company")
    return { success: true, data }
  } catch (error) {
    console.error("Error creating workplace:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getWorkplace(
  workplaceId: string,
): Promise<{ success: boolean; data?: Workplace; error?: string }> {
  try {
    const { data, error } = await supabaseServer.from("workplaces").select("*").eq("id", workplaceId).single()

    if (error) {
      console.error("Error getting workplace:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting workplace:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getWorkplacesByCompany(
  companyId: string,
): Promise<{ success: boolean; data?: Workplace[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from("workplaces")
      .select("*")
      .eq("company_id", companyId)
      .eq("is_active", true)
      .order("name")

    if (error) {
      console.error("Error getting workplaces by company:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting workplaces by company:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getAllWorkplaces(): Promise<{ success: boolean; data?: Workplace[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer.from("workplaces").select("*").eq("is_active", true).order("name")

    if (error) {
      console.error("Error getting workplaces:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting workplaces:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function updateWorkplace(workplaceId: string, updates: WorkplaceUpdate) {
  try {
    const { data, error } = await supabaseServer
      .from("workplaces")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", workplaceId)
      .select()
      .single()

    if (error) {
      console.error("Error updating workplace:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/professional")
    revalidatePath("/company")
    return { success: true, data }
  } catch (error) {
    console.error("Error updating workplace:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function deleteWorkplace(workplaceId: string) {
  try {
    const { error } = await supabaseServer.from("workplaces").delete().eq("id", workplaceId)

    if (error) {
      console.error("Error deleting workplace:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/professional")
    revalidatePath("/company")
    return { success: true }
  } catch (error) {
    console.error("Error deleting workplace:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function toggleWorkplaceStatus(workplaceId: string, isActive: boolean) {
  try {
    const { data, error } = await supabaseServer
      .from("workplaces")
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", workplaceId)
      .select()
      .single()

    if (error) {
      console.error("Error toggling workplace status:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/professional")
    revalidatePath("/company")
    return { success: true, data }
  } catch (error) {
    console.error("Error toggling workplace status:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}
