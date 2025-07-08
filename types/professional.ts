import type { Database } from '@/lib/database.types';
import type { ServiceSchedule } from '@/types/booking';

// Re-export database types with enhanced UI types
export type Service = Database['public']['Tables']['services']['Row'] & {
  schedule?: ServiceSchedule;
  workplaceId?: string; // For UI compatibility
  isActive?: boolean; // For UI compatibility
};

export type Workplace = Database['public']['Tables']['workplaces']['Row'];

// Add missing types for compatibility
export type Professional = Database['public']['Tables']['professionals']['Row'];
export type Client = Database['public']['Tables']['clients']['Row'];

// Booking type for Professional UI (legacy compatibility)
export interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
  client: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  location: string;
  duration: string;
  price: string;
  workplaceId?: string;
}

// Dashboard stats interface
export interface DashboardStats {
  todayBookings: number;
  pendingBookings: number;
  weeklyBookings: number;
  monthlyRevenue: number;
}

export interface ProfessionalService {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface ProfessionalBooking {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_name: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  location_name: string;
  created_at: string;
}

export interface ProfessionalClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  last_visit: string;
  total_visits: number;
  total_spent: number;
  notes?: string;
  created_at: string;
}

export interface ProfessionalLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  is_active: boolean;
  created_at: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface ProfessionalStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalClients: number;
  newClientsThisMonth: number;
  averageRating: number;
}

export type ProfessionalTab =
  | 'dashboard'
  | 'bookings'
  | 'calendar'
  | 'clients'
  | 'services'
  | 'locations'
  | 'profile'
  | 'statistics';

export interface ProfessionalSlice {
  activeTab: ProfessionalTab;
  selectedClinic: Clinic | null;
  showClinicSelection: boolean;
  services: ProfessionalService[];
  bookings: ProfessionalBooking[];
  clients: ProfessionalClient[];
  locations: ProfessionalLocation[];
  clinics: Clinic[];
  stats: ProfessionalStats;
  setActiveTab: (tab: ProfessionalTab) => void;
  selectClinic: (clinic: Clinic) => void;
  loadData: () => void;
}
