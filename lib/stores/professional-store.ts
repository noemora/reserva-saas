import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ProfessionalService {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: string
  is_active: boolean
  created_at: string
}

export interface ProfessionalBooking {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  service_name: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
  location_name: string
  created_at: string
}

export interface ProfessionalClient {
  id: string
  name: string
  email: string
  phone: string
  last_visit: string
  total_visits: number
  total_spent: number
  notes?: string
  created_at: string
}

export interface ProfessionalLocation {
  id: string
  name: string
  address: string
  city: string
  phone: string
  is_active: boolean
  created_at: string
}

export interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  email: string
}

export interface ProfessionalStats {
  totalBookings: number
  completedBookings: number
  pendingBookings: number
  totalRevenue: number
  monthlyRevenue: number
  totalClients: number
  newClientsThisMonth: number
  averageRating: number
}

interface ProfessionalState {
  // Current state
  activeView: "dashboard" | "bookings" | "calendar" | "clients" | "services" | "locations" | "profile" | "statistics"
  selectedClinic: Clinic | null
  showClinicSelection: boolean

  // Data
  services: ProfessionalService[]
  bookings: ProfessionalBooking[]
  clients: ProfessionalClient[]
  locations: ProfessionalLocation[]
  clinics: Clinic[]
  stats: ProfessionalStats

  // Actions
  setActiveView: (view: ProfessionalState["activeView"]) => void
  setSelectedClinic: (clinic: Clinic | null) => void
  setShowClinicSelection: (show: boolean) => void

  // Data actions
  addService: (service: Omit<ProfessionalService, "id" | "created_at">) => void
  updateService: (id: string, service: Partial<ProfessionalService>) => void
  deleteService: (id: string) => void

  addBooking: (booking: Omit<ProfessionalBooking, "id" | "created_at">) => void
  updateBooking: (id: string, booking: Partial<ProfessionalBooking>) => void
  deleteBooking: (id: string) => void

  addLocation: (location: Omit<ProfessionalLocation, "id" | "created_at">) => void
  updateLocation: (id: string, location: Partial<ProfessionalLocation>) => void
  deleteLocation: (id: string) => void

  // Initialize with mock data
  initializeMockData: () => void
}

export const useProfessionalStore = create<ProfessionalState>()(
  persist(
    (set, get) => ({
      // Initial state
      activeView: "dashboard",
      selectedClinic: null,
      showClinicSelection: true,

      // Initial data
      services: [],
      bookings: [],
      clients: [],
      locations: [],
      clinics: [],
      stats: {
        totalBookings: 0,
        completedBookings: 0,
        pendingBookings: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        totalClients: 0,
        newClientsThisMonth: 0,
        averageRating: 0,
      },

      // Actions
      setActiveView: (view) => set({ activeView: view }),
      setSelectedClinic: (clinic) => set({ selectedClinic: clinic, showClinicSelection: false }),
      setShowClinicSelection: (show) => set({ showClinicSelection: show }),

      // Service actions
      addService: (serviceData) => {
        const newService: ProfessionalService = {
          ...serviceData,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        }
        set((state) => ({ services: [...state.services, newService] }))
      },

      updateService: (id, serviceData) => {
        set((state) => ({
          services: state.services.map((service) => (service.id === id ? { ...service, ...serviceData } : service)),
        }))
      },

      deleteService: (id) => {
        set((state) => ({
          services: state.services.filter((service) => service.id !== id),
        }))
      },

      // Booking actions
      addBooking: (bookingData) => {
        const newBooking: ProfessionalBooking = {
          ...bookingData,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        }
        set((state) => ({ bookings: [...state.bookings, newBooking] }))
      },

      updateBooking: (id, bookingData) => {
        set((state) => ({
          bookings: state.bookings.map((booking) => (booking.id === id ? { ...booking, ...bookingData } : booking)),
        }))
      },

      deleteBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== id),
        }))
      },

      // Location actions
      addLocation: (locationData) => {
        const newLocation: ProfessionalLocation = {
          ...locationData,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        }
        set((state) => ({ locations: [...state.locations, newLocation] }))
      },

      updateLocation: (id, locationData) => {
        set((state) => ({
          locations: state.locations.map((location) =>
            location.id === id ? { ...location, ...locationData } : location,
          ),
        }))
      },

      deleteLocation: (id) => {
        set((state) => ({
          locations: state.locations.filter((location) => location.id !== id),
        }))
      },

      // Initialize mock data
      initializeMockData: () => {
        const mockClinics: Clinic[] = [
          {
            id: "1",
            name: "Clínica Central",
            address: "Av. Principal 123",
            phone: "+1234567890",
            email: "info@clinicacentral.com",
          },
          {
            id: "2",
            name: "Centro Médico Norte",
            address: "Calle Norte 456",
            phone: "+1234567891",
            email: "contacto@centronorte.com",
          },
        ]

        const mockServices: ProfessionalService[] = [
          {
            id: "1",
            name: "Consulta General",
            description: "Consulta médica general",
            duration: 30,
            price: 50,
            category: "Consulta",
            is_active: true,
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Revisión Especializada",
            description: "Revisión médica especializada",
            duration: 60,
            price: 100,
            category: "Especialidad",
            is_active: true,
            created_at: new Date().toISOString(),
          },
        ]

        const mockBookings: ProfessionalBooking[] = [
          {
            id: "1",
            client_name: "Juan Pérez",
            client_email: "juan@email.com",
            client_phone: "+1234567890",
            service_name: "Consulta General",
            date: new Date().toISOString().split("T")[0],
            time: "10:00",
            status: "confirmed",
            location_name: "Clínica Central",
            created_at: new Date().toISOString(),
          },
        ]

        const mockClients: ProfessionalClient[] = [
          {
            id: "1",
            name: "Juan Pérez",
            email: "juan@email.com",
            phone: "+1234567890",
            last_visit: new Date().toISOString(),
            total_visits: 5,
            total_spent: 250,
            created_at: new Date().toISOString(),
          },
        ]

        const mockLocations: ProfessionalLocation[] = [
          {
            id: "1",
            name: "Consultorio Principal",
            address: "Av. Principal 123",
            city: "Ciudad",
            phone: "+1234567890",
            is_active: true,
            created_at: new Date().toISOString(),
          },
        ]

        const mockStats: ProfessionalStats = {
          totalBookings: 25,
          completedBookings: 20,
          pendingBookings: 5,
          totalRevenue: 2500,
          monthlyRevenue: 800,
          totalClients: 15,
          newClientsThisMonth: 3,
          averageRating: 4.8,
        }

        set({
          clinics: mockClinics,
          services: mockServices,
          bookings: mockBookings,
          clients: mockClients,
          locations: mockLocations,
          stats: mockStats,
        })
      },
    }),
    {
      name: "professional-storage",
      partialize: (state) => ({
        selectedClinic: state.selectedClinic,
        services: state.services,
        bookings: state.bookings,
        clients: state.clients,
        locations: state.locations,
      }),
    },
  ),
)
