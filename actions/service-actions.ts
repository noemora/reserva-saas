"use server"

import { supabaseServer } from "@/lib/supabase-server"
import type { Database } from "@/lib/database.types"
import { revalidatePath } from "next/cache"

type Service = Database["public"]["Tables"]["services"]["Row"]
type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"]
type ServiceUpdate = Database["public"]["Tables"]["services"]["Update"]

export async function createService(serviceData: ServiceInsert) {
  try {
    const { data, error } = await supabaseServer.from("services").insert(serviceData).select().single()

    if (error) {
      console.error("Error creating service:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/professional")
    revalidatePath("/company")
    return { success: true, data }
  } catch (error) {
    console.error("Error creating service:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getService(serviceId: string): Promise<{ success: boolean; data?: Service; error?: string }> {
  try {
    const { data, error } = await supabaseServer.from("services").select("*").eq("id", serviceId).single()

    if (error) {
      console.error("Error getting service:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting service:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getServicesByProfessional(
  professionalId: string,
): Promise<{ success: boolean; data?: Service[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from("services")
      .select("*")
      .eq("professional_id", professionalId)
      .eq("is_active", true)
      .order("name")

    if (error) {
      console.error("Error getting services by professional:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting services by professional:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getServicesByWorkplace(
  workplaceId: string,
): Promise<{ success: boolean; data?: Service[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from("services")
      .select("*")
      .eq("workplace_id", workplaceId)
      .eq("is_active", true)
      .order("name")

    if (error) {
      console.error("Error getting services by workplace:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting services by workplace:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getAllServices(): Promise<{ success: boolean; data?: Service[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from("services")
      .select(`
        *,
        professionals(name, title),
        workplaces(name, address)
      `)
      .eq("is_active", true)
      .order("name")

    if (error) {
      console.error("Error getting services:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting services:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function updateService(serviceId: string, updates: ServiceUpdate) {
  try {
    const { data, error } = await supabaseServer
      .from("services")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", serviceId)
      .select()
      .single()

    if (error) {
      console.error("Error updating service:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/professional")
    revalidatePath("/company")
    return { success: true, data }
  } catch (error) {
    console.error("Error updating service:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function deleteService(serviceId: string) {
  try {
    const { error } = await supabaseServer.from("services").delete().eq("id", serviceId)

    if (error) {
      console.error("Error deleting service:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/professional")
    revalidatePath("/company")
    return { success: true }
  } catch (error) {
    console.error("Error deleting service:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function toggleServiceStatus(serviceId: string, isActive: boolean) {
  try {
    const { data, error } = await supabaseServer
      .from("services")
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", serviceId)
      .select()
      .single()

    if (error) {
      console.error("Error toggling service status:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/professional")
    revalidatePath("/company")
    return { success: true, data }
  } catch (error) {
    console.error("Error toggling service status:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}

export async function getAvailableTimeSlots(serviceId: string, date: string) {
  try {
    // Get service details
    const { data: service, error: serviceError } = await supabaseServer
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single()

    if (serviceError) {
      console.error("Error getting service:", serviceError)
      return { success: false, error: serviceError.message }
    }

    // Get existing bookings for that date and professional
    const { data: bookings, error: bookingsError } = await supabaseServer
      .from("bookings")
      .select("time, duration")
      .eq("professional_id", service.professional_id)
      .eq("date", date)
      .in("status", ["pending", "confirmed"])

    if (bookingsError) {
      console.error("Error getting bookings:", bookingsError)
      return { success: false, error: bookingsError.message }
    }

    // Generate available time slots (this is a simplified version)
    const workingHours = {
      start: "09:00",
      end: "18:00",
    }

    const slots = []
    const startHour = 9
    const endHour = 18
    const slotDuration = 30 // minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const timeSlot = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

        // Check if slot is available (not booked)
        const isBooked = bookings?.some((booking) => {
          const bookingTime = booking.time
          const bookingEndTime = new Date(`2000-01-01T${bookingTime}`)
          bookingEndTime.setMinutes(bookingEndTime.getMinutes() + booking.duration)

          const slotTime = new Date(`2000-01-01T${timeSlot}`)
          const slotEndTime = new Date(`2000-01-01T${timeSlot}`)
          slotEndTime.setMinutes(slotEndTime.getMinutes() + service.duration)

          return slotTime < bookingEndTime && slotEndTime > new Date(`2000-01-01T${bookingTime}`)
        })

        if (!isBooked) {
          slots.push(timeSlot)
        }
      }
    }

    return { success: true, data: slots }
  } catch (error) {
    console.error("Error getting available time slots:", error)
    return { success: false, error: "Error interno del servidor" }
  }
}
