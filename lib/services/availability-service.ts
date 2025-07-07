import type { BookingProfessional, BookingService } from "@/types/booking"
import { getAvailableTimeSlotsForService, isServiceAvailableOnDate } from "@/utils/schedule-utils"

export class AvailabilityService {
  static getAvailableTimeSlots(
    professional: BookingProfessional,
    service: BookingService,
    date: Date,
    bookedSlots: string[] = [],
  ): string[] {
    const professionalService = professional.services?.find((s) => s.name === service.name)
    if (!professionalService) return []

    return getAvailableTimeSlotsForService(professionalService.schedule, date, service.duration, bookedSlots)
  }

  static isServiceAvailableOnDate(professional: BookingProfessional, service: BookingService, date: Date): boolean {
    const professionalService = professional.services?.find((s) => s.name === service.name)
    if (!professionalService) return false

    return isServiceAvailableOnDate(professionalService.schedule, date)
  }

  static getMockBookedSlots(): string[] {
    // En una aplicación real, esto vendría de la base de datos
    return ["10:00", "14:30"]
  }
}
