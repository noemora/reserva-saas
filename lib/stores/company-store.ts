import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CompanyProfessional {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  status: "active" | "inactive"
  total_bookings: number
  rating: number
  joined_date: string
  avatar_url?: string
}

export interface CompanyBooking {
  id: string
  client_name: string
  client_email: string
  professional_name: string
  service_name: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  amount: number
  location: string
  created_at: string
}

export interface CompanyClient {
  id: string
  name: string
  email: string
  phone: string
  registration_date: string
  total_bookings: number
  total_spent: number
  last_visit: string
  preferred_professional?: string
  status: "active" | "inactive"
  medical_history?: string[]
  allergies?: string[]
  emergency_contact?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface CompanyStats {
  totalRevenue: number
  monthlyRevenue: number
  totalBookings: number
  completedBookings: number
  pendingBookings: number
  cancelledBookings: number
  totalProfessionals: number
  activeProfessionals: number
  totalClients: number
  newClientsThisMonth: number
  averageBookingValue: number
  topServices: Array<{
    name: string
    bookings: number
    revenue: number
  }>
  monthlyGrowth: number
  clientRetentionRate: number
}

interface CompanyState {
  // Current state
  activeView: "dashboard" | "professionals" | "bookings" | "clients" | "statistics" | "profile"

  // Data
  professionals: CompanyProfessional[]
  bookings: CompanyBooking[]
  clients: CompanyClient[]
  stats: CompanyStats

  // Actions
  setActiveView: (view: CompanyState["activeView"]) => void

  // Professional actions
  addProfessional: (professional: Omit<CompanyProfessional, "id" | "joined_date">) => void
  updateProfessional: (id: string, professional: Partial<CompanyProfessional>) => void
  deleteProfessional: (id: string) => void

  // Booking actions
  addBooking: (booking: Omit<CompanyBooking, "id" | "created_at">) => void
  updateBooking: (id: string, booking: Partial<CompanyBooking>) => void
  deleteBooking: (id: string) => void

  // Client actions
  addClient: (client: Omit<CompanyClient, "id" | "registration_date">) => void
  updateClient: (id: string, client: Partial<CompanyClient>) => void
  deleteClient: (id: string) => void

  // Initialize with mock data
  initializeMockData: () => void
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      // Initial state
      activeView: "dashboard",

      // Initial data
      professionals: [],
      bookings: [],
      clients: [],
      stats: {
        totalRevenue: 0,
        monthlyRevenue: 0,
        totalBookings: 0,
        completedBookings: 0,
        pendingBookings: 0,
        cancelledBookings: 0,
        totalProfessionals: 0,
        activeProfessionals: 0,
        totalClients: 0,
        newClientsThisMonth: 0,
        averageBookingValue: 0,
        topServices: [],
        monthlyGrowth: 0,
        clientRetentionRate: 0,
      },

      // Actions
      setActiveView: (view) => set({ activeView: view }),

      // Professional actions
      addProfessional: (professionalData) => {
        const newProfessional: CompanyProfessional = {
          ...professionalData,
          id: Date.now().toString(),
          joined_date: new Date().toISOString(),
        }
        set((state) => ({ professionals: [...state.professionals, newProfessional] }))
      },

      updateProfessional: (id, professionalData) => {
        set((state) => ({
          professionals: state.professionals.map((professional) =>
            professional.id === id ? { ...professional, ...professionalData } : professional,
          ),
        }))
      },

      deleteProfessional: (id) => {
        set((state) => ({
          professionals: state.professionals.filter((professional) => professional.id !== id),
        }))
      },

      // Booking actions
      addBooking: (bookingData) => {
        const newBooking: CompanyBooking = {
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

      // Client actions
      addClient: (clientData) => {
        const newClient: CompanyClient = {
          ...clientData,
          id: Date.now().toString(),
          registration_date: new Date().toISOString(),
        }
        set((state) => ({ clients: [...state.clients, newClient] }))
      },

      updateClient: (id, clientData) => {
        set((state) => ({
          clients: state.clients.map((client) => (client.id === id ? { ...client, ...clientData } : client)),
        }))
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((client) => client.id !== id),
        }))
      },

      // Initialize mock data
      initializeMockData: () => {
        const mockProfessionals: CompanyProfessional[] = [
          {
            id: "1",
            name: "Dr. María García",
            email: "maria@clinica.com",
            phone: "+1234567890",
            specialty: "Cardiología",
            status: "active",
            total_bookings: 150,
            rating: 4.8,
            joined_date: "2023-01-15",
          },
          {
            id: "2",
            name: "Dr. Carlos López",
            email: "carlos@clinica.com",
            phone: "+1234567891",
            specialty: "Dermatología",
            status: "active",
            total_bookings: 120,
            rating: 4.6,
            joined_date: "2023-03-20",
          },
        ]

        const mockBookings: CompanyBooking[] = [
          {
            id: "1",
            client_name: "Ana Martínez",
            client_email: "ana@email.com",
            professional_name: "Dr. María García",
            service_name: "Consulta Cardiológica",
            date: new Date().toISOString().split("T")[0],
            time: "10:00",
            status: "confirmed",
            amount: 100,
            location: "Consultorio 1",
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            client_name: "Pedro Rodríguez",
            client_email: "pedro@email.com",
            professional_name: "Dr. Carlos López",
            service_name: "Consulta Dermatológica",
            date: new Date().toISOString().split("T")[0],
            time: "14:00",
            status: "pending",
            amount: 80,
            location: "Consultorio 2",
            created_at: new Date().toISOString(),
          },
        ]

        const mockClients: CompanyClient[] = [
          {
            id: "1",
            name: "Ana Martínez",
            email: "ana@email.com",
            phone: "+1234567890",
            registration_date: "2023-06-01",
            total_bookings: 8,
            total_spent: 800,
            last_visit: new Date().toISOString(),
            preferred_professional: "Dr. María García",
            status: "active",
            medical_history: ["Hipertensión", "Diabetes tipo 2"],
            allergies: ["Penicilina"],
            emergency_contact: {
              name: "Juan Martínez",
              phone: "+1234567899",
              relationship: "Esposo",
            },
          },
          {
            id: "2",
            name: "Pedro Rodríguez",
            email: "pedro@email.com",
            phone: "+1234567891",
            registration_date: "2023-08-15",
            total_bookings: 3,
            total_spent: 240,
            last_visit: "2023-11-20",
            status: "active",
            medical_history: ["Asma"],
            allergies: [],
          },
        ]

        const mockStats: CompanyStats = {
          totalRevenue: 25000,
          monthlyRevenue: 8500,
          totalBookings: 320,
          completedBookings: 280,
          pendingBookings: 25,
          cancelledBookings: 15,
          totalProfessionals: 8,
          activeProfessionals: 7,
          totalClients: 150,
          newClientsThisMonth: 12,
          averageBookingValue: 78,
          topServices: [
            { name: "Consulta General", bookings: 85, revenue: 4250 },
            { name: "Consulta Cardiológica", bookings: 45, revenue: 4500 },
            { name: "Consulta Dermatológica", bookings: 38, revenue: 3040 },
          ],
          monthlyGrowth: 15.5,
          clientRetentionRate: 85.2,
        }

        set({
          professionals: mockProfessionals,
          bookings: mockBookings,
          clients: mockClients,
          stats: mockStats,
        })
      },
    }),
    {
      name: "company-storage",
      partialize: (state) => ({
        professionals: state.professionals,
        bookings: state.bookings,
        clients: state.clients,
      }),
    },
  ),
)
