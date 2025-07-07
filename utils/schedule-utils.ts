import type { ServiceSchedule } from "@/types/professional"

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number,
  breakStart?: string,
  breakEnd?: string,
): string[] {
  const slots: string[] = []
  const start = timeToMinutes(startTime)
  const end = timeToMinutes(endTime)
  const breakStartMin = breakStart ? timeToMinutes(breakStart) : null
  const breakEndMin = breakEnd ? timeToMinutes(breakEnd) : null

  for (let time = start; time + duration <= end; time += 30) {
    // Skip if slot overlaps with break time
    if (breakStartMin && breakEndMin) {
      if (time < breakEndMin && time + duration > breakStartMin) {
        continue
      }
    }

    slots.push(minutesToTime(time))
  }

  return slots
}

export function isServiceAvailableOnDate(schedule: ServiceSchedule, date: Date): boolean {
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const dayName = dayNames[date.getDay()]

  return schedule[dayName]?.isAvailable || false
}

export function getAvailableTimeSlotsForService(
  schedule: ServiceSchedule,
  date: Date,
  duration: number,
  bookedSlots: string[] = [],
): string[] {
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const dayName = dayNames[date.getDay()]
  const daySchedule = schedule[dayName]

  if (!daySchedule?.isAvailable) {
    return []
  }

  const allSlots = generateTimeSlots(
    daySchedule.startTime,
    daySchedule.endTime,
    duration,
    daySchedule.breakStart,
    daySchedule.breakEnd,
  )

  // Filter out booked slots
  return allSlots.filter((slot) => !bookedSlots.includes(slot))
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
}
