"use server"

import { supabaseServer } from "@/lib/supabase-server"
import type { Database } from "@/lib/database.types"
import { revalidatePath } from "next/cache"

type Company = Database["public"]["Tables"]["companies"]["Row"]
type CompanyInsert = Database["public"]["Tables"]["companies"]["Insert"]
type CompanyUpdate = Database["public"]["Tables"]["companies"]["Update"]

export async function createCompany(companyData: CompanyInsert) {
  try {
    const { data, error } = await supabaseServer.from("companies").insert(companyData).select().single()

    if (error) {
      console.error("Error creating company:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/company")
    return { success: true, data }
  } catch (error) {
    console.error("Error creating company:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getCompany(companyId: string): Promise<{ success: boolean; data?: Company; error?: string }> {
  try {
    const { data, error } = await supabaseServer.from("companies").select("*").eq("id", companyId).single()

    if (error) {
      console.error("Error getting company:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting company:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getCompanyByUserId(
  userId: string,
): Promise<{ success: boolean; data?: Company; error?: string }> {
  try {
    const { data, error } = await supabaseServer.from("companies").select("*").eq("user_id", userId).single()

    if (error) {
      console.error("Error getting company by user:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting company by user:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getAllCompanies(): Promise<{ success: boolean; data?: Company[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer.from("companies").select("*").eq("is_active", true).order("name")

    if (error) {
      console.error("Error getting companies:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting companies:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function updateCompany(companyId: string, updates: CompanyUpdate) {
  try {
    const { data, error } = await supabaseServer
      .from("companies")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", companyId)
      .select()
      .single()

    if (error) {
      console.error("Error updating company:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/company")
    return { success: true, data }
  } catch (error) {
    console.error("Error updating company:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function deleteCompany(companyId: string) {
  try {
    const { error } = await supabaseServer.from("companies").delete().eq("id", companyId)

    if (error) {
      console.error("Error deleting company:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/company")
    return { success: true }
  } catch (error) {
    console.error("Error deleting company:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function toggleCompanyStatus(companyId: string, isActive: boolean) {
  try {
    const { data, error } = await supabaseServer
      .from("companies")
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", companyId)
      .select()
      .single()

    if (error) {
      console.error("Error toggling company status:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/company")
    return { success: true, data }
  } catch (error) {
    console.error("Error toggling company status:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getCompanyStats(companyId: string) {
  try {
    // Get company bookings for stats
    const { data: bookings, error: bookingsError } = await supabaseServer
      .from("bookings")
      .select(`
        *,
        professionals!inner(company_id)
      `)
      .eq("professionals.company_id", companyId)

    if (bookingsError) {
      console.error("Error getting company bookings:", bookingsError)
      return { success: false, error: bookingsError.message }
    }

    // Get company professionals
    const { data: professionals, error: profError } = await supabaseServer
      .from("professionals")
      .select("*")
      .eq("company_id", companyId)

    if (profError) {
      console.error("Error getting company professionals:", profError)
      return { success: false, error: profError.message }
    }

    const today = new Date().toISOString().split("T")[0]
    const todayBookings = bookings?.filter((b) => b.date === today) || []
    const pendingBookings = bookings?.filter((b) => b.status === "pending") || []
    const completedBookings = bookings?.filter((b) => b.status === "completed") || []
    const activeProfessionals = professionals?.filter((p) => p.is_active) || []

    const monthlyRevenue = completedBookings.reduce((sum, booking) => sum + booking.price, 0)
    const completionRate = bookings?.length ? (completedBookings.length / bookings.length) * 100 : 0
    const cancellationRate = bookings?.length
      ? (bookings.filter((b) => b.status === "cancelled").length / bookings.length) * 100
      : 0

    const stats = {
      todayBookings: todayBookings.length,
      pendingBookings: pendingBookings.length,
      monthlyRevenue,
      activeProfessionals: activeProfessionals.length,
      totalProfessionals: professionals?.length || 0,
      completionRate,
      cancellationRate,
      averageRating: 4.5, // This would need to be calculated from reviews
    }

    return { success: true, data: stats }
  } catch (error) {
    console.error("Error getting company stats:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}
