import type { Database } from '@/lib/database.types';

// Tipo base de booking desde la base de datos
export type BookingRow = Database['public']['Tables']['bookings']['Row'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

// Tipo para booking con información relacionada (para JOINs)
export interface BookingWithDetails extends BookingRow {
  // Información del servicio
  service_name: string;
  service_category: string;

  // Información del profesional
  professional_name: string;
  professional_title: string | null;
  professional_specialty: string[];
  professional_phone: string | null;
  professional_email: string;

  // Información del lugar de trabajo
  workplace_name: string;
  workplace_address: string;
  workplace_phone: string | null;
  workplace_email: string | null;

  // Información de la empresa
  company_name: string | null;

  // Información del cliente
  client_name: string;
  client_email: string;
  client_phone: string | null;
}

// Tipo para la UI del cliente (simplificado)
export interface ClientBookingView {
  id: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  location: string;
  price: string;
  duration: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  specialty: string;
  phone: string | null;
  instructions: string | null;
  description: string | null;
  notes: string | null;
  rating?: number | null; // Viene de la tabla reviews
}

// Tipo para el historial de reservas
export interface BookingHistoryItem extends ClientBookingView {
  rating: number | null;
  review_comment: string | null;
  completion_date: string | null;
}

// Estados de reserva
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'no_show';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

// Tipos para el proceso de reserva (legacy - mantener compatibilidad)
export interface BookingService {
  id: string;
  name: string;
  description: string;
  duration: number; // En minutos
  professionals: string[];
  price: number;
  category: string;
  locations: string[];
}

export interface BookingLocation {
  id: string;
  name: string;
  address: string;
}

export interface BookingProfessional {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  experience: string;
  locations: string[];
  services?: Array<{
    id: string;
    name: string;
    schedule: ServiceSchedule;
  }>;
}

export interface ServiceSchedule {
  [key: string]: {
    isAvailable: boolean;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
  };
}

export interface BookingData {
  service: BookingService | null;
  location: BookingLocation | null;
  professional: BookingProfessional | null;
  date: string;
  time: string;
}

export type BookingStep =
  | 'service'
  | 'location'
  | 'professional'
  | 'datetime'
  | 'confirmation';

export interface BookingStepProps {
  data: BookingData;
  onNext: (data: Partial<BookingData>) => void;
  onBack: () => void;
}
