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
  status: "active" | "inactive"
}

export interface CompanyStats {
  totalRevenue: number
  monthlyRevenue: number
  totalBookings: number
  activeProfessionals: number
  totalClients: number
  newClientsThisMonth: number
}

export type CompanyTab = "dashboard" | "professionals" | "bookings" | "clients" | "statistics" | "profile"

export interface CompanySlice {
  activeTab: CompanyTab
  professionals: CompanyProfessional[]
  bookings: CompanyBooking[]
  clients: CompanyClient[]
  stats: CompanyStats
  setActiveTab: (tab: CompanyTab) => void
  loadData: () => void
}
