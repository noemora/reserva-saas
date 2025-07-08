import type { Profile } from './auth';
import type { Database } from '@/lib/database.types';

// Tipo base desde la base de datos
type ClientDBRow = Database['public']['Tables']['clients']['Row'];

// Interfaz extendida para el cliente que combina Profile y datos específicos del cliente
export interface ClientProfile extends Profile {
  // Campos específicos del cliente desde la base de datos
  date_of_birth?: string | null;
  address?: string | null;
  emergency_contact?: {
    name: string;
    phone: string;
    relationship: string;
  } | null;
  medical_history?: string[] | null;
  allergies?: string[] | null;
  current_medications?: string[] | null;
  insurance_provider?: string | null;
  insurance_number?: string | null;
  preferred_language?: string | null;
  communication_preferences?: {
    email: boolean;
    sms: boolean;
    phone: boolean;
  } | null;

  // Campos de compatibilidad con la UI existente
  name?: string; // Alias para full_name
}

export interface ClientBooking {
  id: string;
  date: string;
  time?: string;
  professional: string;
  clinic: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  // Campos adicionales para la UI completa
  service?: string;
  location?: string;
  price?: string;
  duration?: string;
  specialty?: string;
  phone?: string;
  instructions?: string;
  description?: string;
  rating?: number | null;
  notes?: string;
}

// Tipo extendido basado en la base de datos con JOINs
export interface BookingWithDetails {
  id: string;
  client_id: string;
  professional_id: string;
  service_id: string;
  workplace_id: string;
  company_id: string | null;
  booking_date: string;
  booking_time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  notes: string | null;
  instructions: string | null;
  description: string | null;
  cancellation_reason: string | null;
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method: string | null;
  created_at: string;
  updated_at: string;
  // Campos de JOIN
  service_name: string;
  professional_name: string;
  professional_specialty: string;
  professional_phone: string | null;
  workplace_name: string;
  workplace_address: string;
  workplace_phone: string | null;
  company_name: string | null;
  // Campos calculados para la UI
  formatted_price: string;
  formatted_duration: string;
  formatted_date: string;
  formatted_time: string;
}

export interface AvailableService {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  professional: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    avatar_url?: string;
  };
  location: {
    id: string;
    name: string;
    address: string;
    phone: string;
  };
  available_slots: Array<{
    date: string;
    times: string[];
  }>;
  is_popular: boolean;
  tags: string[];
}

export interface BookingHistory {
  total_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  no_show_bookings: number;
  total_spent: number;
  average_rating_given: number;
  favorite_professional?: string;
  most_booked_service?: string;
  first_booking_date?: string;
  last_booking_date?: string;
}

export type ClientTab = 'dashboard' | 'bookings' | 'history' | 'profile';

export interface ClientSlice {
  activeTab: ClientTab;
  profile: ClientProfile | null;
  upcomingBookings: ClientBooking[];
  pastBookings: ClientBooking[];
  availableServices: AvailableService[];
  bookingHistory: BookingHistory;
  isBookingModalOpen: boolean;
  selectedService: AvailableService | null;
  setActiveTab: (tab: ClientTab) => void;
  setProfile: (profile: ClientProfile) => void;
  addBooking: (booking: ClientBooking) => void;
  loadData: () => void;
}
