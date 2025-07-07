import type { ClientProfile, ClientBooking, AvailableService, BookingHistory } from "@/types/client"

/* -------------------------------------------------------------------------- */
/*  MOCK CLIENT DATA HELPERS – SINGLE RESPONSIBILITY FOR TEST-ONLY DATA       */
/* -------------------------------------------------------------------------- */

export const getMockClientProfile = (): ClientProfile => ({
  id: "1",
  user_type: "Cliente",
  full_name: "Juan Pérez",
  name: "Juan Pérez",
  email: "juan@email.com",
  phone: "+1234567890",
  avatar_url: "/placeholder.svg?width=40&height=40",
  created_at: "2023-01-15T00:00:00Z",
  date_of_birth: "1985-06-15",
  address: "Calle Principal 123, Ciudad",
  emergency_contact: {
    name: "María Pérez",
    phone: "+1234567891",
    relationship: "Esposa",
  },
  medical_history: ["Hipertensión leve"],
  allergies: ["Polen"],
  current_medications: ["Losartán 50 mg"],
  insurance_provider: "Seguros Médicos SA",
  insurance_number: "SM123456789",
  preferred_language: "Español",
  communication_preferences: {
    email: true,
    sms: true,
    phone: false,
  },
})

export const getMockUpcomingBookings = (): ClientBooking[] => [
  {
    id: "1",
    date: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().split("T")[0],
    professional: "Dr. María García",
    clinic: "Clínica Central",
    status: "confirmed",
  },
  {
    id: "2",
    date: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split("T")[0],
    professional: "Dr. Carlos López",
    clinic: "Centro Médico Norte",
    status: "pending",
  },
]

export const getMockPastBookings = (): ClientBooking[] => [
  {
    id: "3",
    date: "2023-11-15",
    professional: "Dr. Ana Rodríguez",
    clinic: "Clínica Central",
    status: "cancelled",
  },
]

export const getMockAvailableServices = (): AvailableService[] => [
  {
    id: "1",
    name: "Consulta General",
    description: "Chequeo médico completo con médico general.",
    category: "Medicina General",
    duration: 30,
    price: 50,
    professional: {
      id: "1",
      name: "Dr. Ana Rodríguez",
      specialty: "Medicina General",
      rating: 4.8,
    },
    location: {
      id: "1",
      name: "Clínica Central",
      address: "Av. Principal 123",
      phone: "+1234567890",
    },
    available_slots: [
      {
        date: new Date(Date.now() + 1 * 24 * 3600 * 1000).toISOString().split("T")[0],
        times: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      },
      {
        date: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().split("T")[0],
        times: ["09:30", "10:30", "14:30", "15:30"],
      },
    ],
    is_popular: true,
    tags: ["Chequeo", "Preventivo", "General"],
  },
  {
    id: "2",
    name: "Consulta Cardiológica",
    description: "Evaluación cardiovascular especializada.",
    category: "Cardiología",
    duration: 60,
    price: 100,
    professional: {
      id: "2",
      name: "Dr. María García",
      specialty: "Cardiología",
      rating: 4.9,
    },
    location: {
      id: "1",
      name: "Clínica Central",
      address: "Av. Principal 123",
      phone: "+1234567890",
    },
    available_slots: [
      {
        date: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split("T")[0],
        times: ["10:00", "11:00", "16:00"],
      },
      {
        date: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().split("T")[0],
        times: ["09:00", "10:00", "15:00", "16:00"],
      },
    ],
    is_popular: false,
    tags: ["Corazón", "Especialista", "Cardiovascular"],
  },
]

export const getMockBookingHistory = (): BookingHistory => ({
  total_bookings: 8,
  completed_bookings: 7,
  cancelled_bookings: 1,
  no_show_bookings: 0,
  total_spent: 580,
  average_rating_given: 4.6,
  favorite_professional: "Dr. Ana Rodríguez",
  most_booked_service: "Consulta General",
  first_booking_date: "2023-06-01",
  last_booking_date: "2023-11-15",
})
