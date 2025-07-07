export interface BookingService {
  id: string
  name: string
  description: string
  duration: number // En minutos
  professionals: string[]
  price: number
  category: string
  locations: string[]
}

export interface BookingLocation {
  id: string
  name: string
  address: string
}

export interface BookingProfessional {
  id: string
  name: string
  title: string
  specialties: string[]
  rating: number
  experience: string
  locations: string[]
  services?: Array<{
    id: string
    name: string
    schedule: ServiceSchedule
  }>
}

export interface ServiceSchedule {
  [key: string]: {
    isAvailable: boolean
    startTime: string
    endTime: string
    breakStart?: string
    breakEnd?: string
  }
}

export interface BookingData {
  service: BookingService | null
  location: BookingLocation | null
  professional: BookingProfessional | null
  date: string
  time: string
}

export type BookingStep = "service" | "location" | "professional" | "datetime" | "confirmation"

export interface BookingStepProps {
  data: BookingData
  onNext: (data: Partial<BookingData>) => void
  onBack: () => void
}
