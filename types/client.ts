import type { Profile } from "./auth"

export interface ClientProfile extends Profile {
  date_of_birth?: string
  address?: string
  emergency_contact?: {
    name: string
    phone: string
    relationship: string
  }
  medical_history?: string[]
  allergies?: string[]
  current_medications?: string[]
  insurance_provider?: string
  insurance_number?: string
  preferred_language?: string
  communication_preferences?: {
    email: boolean
    sms: boolean
    phone: boolean
  }
}

export interface ClientBooking {
  id: string
  date: string
  professional: string
  clinic: string
  status: "confirmed" | "pending" | "cancelled"
}

export interface AvailableService {
  id: string
  name: string
  description: string
  category: string
  duration: number
  price: number
  professional: {
    id: string
    name: string
    specialty: string
    rating: number
    avatar_url?: string
  }
  location: {
    id: string
    name: string
    address: string
    phone: string
  }
  available_slots: Array<{
    date: string
    times: string[]
  }>
  is_popular: boolean
  tags: string[]
}

export interface BookingHistory {
  total_bookings: number
  completed_bookings: number
  cancelled_bookings: number
  no_show_bookings: number
  total_spent: number
  average_rating_given: number
  favorite_professional?: string
  most_booked_service?: string
  first_booking_date?: string
  last_booking_date?: string
}

export type ClientTab = "dashboard" | "bookings" | "history" | "profile"

export interface ClientSlice {
  activeTab: ClientTab
  profile: ClientProfile | null
  upcomingBookings: ClientBooking[]
  pastBookings: ClientBooking[]
  availableServices: AvailableService[]
  bookingHistory: BookingHistory
  isBookingModalOpen: boolean
  selectedService: AvailableService | null
  setActiveTab: (tab: ClientTab) => void
  setProfile: (profile: ClientProfile) => void
  addBooking: (booking: ClientBooking) => void
  loadData: () => void
}
