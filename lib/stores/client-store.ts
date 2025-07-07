import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Profile } from "@/lib/stores/auth-store"
import {
  getMockClientProfile,
  getMockUpcomingBookings,
  getMockPastBookings,
  getMockAvailableServices,
  getMockBookingHistory,
} from "@/lib/mock-data/client-data"

export interface ClientProfile {
  id: string
  name: string
  email: string
  phone: string
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
  avatar_url?: string
  created_at: string
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

interface ClientState {
  // Current state
  activeTab: ClientTab

  // Data
  profile: Profile | null
  upcomingBookings: ClientBooking[]
  pastBookings: ClientBooking[]
  availableServices: AvailableService[]
  bookingHistory: BookingHistory

  // UI state
  isBookingModalOpen: boolean
  selectedService: AvailableService | null

  // Actions
  setActiveTab: (tab: ClientTab) => void
  setProfile: (profile: Profile) => void

  // Booking actions
  addBooking: (booking: ClientBooking) => void
  updateBookingStatus: (id: string, status: ClientBooking["status"]) => void
  cancelBooking: (id: string) => void

  // Service actions
  setSelectedService: (service: AvailableService | null) => void
  setBookingModalOpen: (open: boolean) => void

  // Load data
  loadData: () => void
}

export const useClientStore = create<ClientState>()(
  persist(
    (set, get) => ({
      // Initial state
      activeTab: "dashboard",

      // Initial data
      profile: null,
      upcomingBookings: [],
      pastBookings: [],
      availableServices: [],
      bookingHistory: {
        total_bookings: 0,
        completed_bookings: 0,
        cancelled_bookings: 0,
        no_show_bookings: 0,
        total_spent: 0,
        average_rating_given: 0,
      },

      // UI state
      isBookingModalOpen: false,
      selectedService: null,

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      setProfile: (profile) => set({ profile }),

      // Booking actions
      addBooking: (booking) => set((s) => ({ upcomingBookings: [booking, ...s.upcomingBookings] })),

      updateBookingStatus: (id, status) =>
        set((s) => ({
          upcomingBookings: s.upcomingBookings.map((b) => (b.id === id ? { ...b, status } : b)),
        })),

      cancelBooking: (id) =>
        set((s) => ({
          upcomingBookings: s.upcomingBookings.filter((b) => b.id !== id),
          pastBookings: [
            ...s.pastBookings,
            {
              ...s.upcomingBookings.find((b) => b.id === id)!,
              status: "cancelled",
            },
          ],
        })),

      // Service actions
      setSelectedService: (service) => set({ selectedService: service }),
      setBookingModalOpen: (open) => set({ isBookingModalOpen: open }),

      // Load data
      loadData: () => {
        set({
          profile: getMockClientProfile(),
          upcomingBookings: getMockUpcomingBookings(),
          pastBookings: getMockPastBookings(),
          availableServices: getMockAvailableServices(),
          bookingHistory: getMockBookingHistory(),
        })
      },
    }),
    {
      name: "client-storage",
      partialize: (state) => ({
        profile: state.profile,
        upcomingBookings: state.upcomingBookings,
        pastBookings: state.pastBookings,
      }),
    },
  ),
)
