export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          user_type: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          user_type?: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          user_type?: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      companies: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string | null;
          address: string | null;
          website: string | null;
          description: string | null;
          logo_url: string | null;
          capacity: number | null;
          founded_year: number | null;
          rating: number;
          total_bookings: number;
          monthly_revenue: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          phone?: string | null;
          address?: string | null;
          website?: string | null;
          description?: string | null;
          logo_url?: string | null;
          capacity?: number | null;
          founded_year?: number | null;
          rating?: number;
          total_bookings?: number;
          monthly_revenue?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          address?: string | null;
          website?: string | null;
          description?: string | null;
          logo_url?: string | null;
          capacity?: number | null;
          founded_year?: number | null;
          rating?: number;
          total_bookings?: number;
          monthly_revenue?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      professionals: {
        Row: {
          id: string;
          user_id: string;
          company_id: string | null;
          name: string;
          title: string;
          email: string;
          phone: string | null;
          license_number: string | null;
          experience: number | null;
          education: string | null;
          specialties: string[];
          biography: string | null;
          avatar_url: string | null;
          rating: number;
          total_bookings: number;
          monthly_revenue: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_id?: string | null;
          name: string;
          title: string;
          email: string;
          phone?: string | null;
          license_number?: string | null;
          experience?: number | null;
          education?: string | null;
          specialties?: string[];
          biography?: string | null;
          avatar_url?: string | null;
          rating?: number;
          total_bookings?: number;
          monthly_revenue?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_id?: string | null;
          name?: string;
          title?: string;
          email?: string;
          phone?: string | null;
          license_number?: string | null;
          experience?: number | null;
          education?: string | null;
          specialties?: string[];
          biography?: string | null;
          avatar_url?: string | null;
          rating?: number;
          total_bookings?: number;
          monthly_revenue?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      workplaces: {
        Row: {
          id: string;
          company_id: string | null;
          name: string;
          address: string;
          description: string | null;
          phone: string | null;
          email: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id?: string | null;
          name: string;
          address: string;
          description?: string | null;
          phone?: string | null;
          email?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string | null;
          name?: string;
          address?: string;
          description?: string | null;
          phone?: string | null;
          email?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          professional_id: string;
          workplace_id: string;
          name: string;
          description: string | null;
          duration: number;
          price: number;
          category: string | null;
          schedule: Record<string, any> | null; // JSONB schedule
          tags: string[] | null;
          requirements: string | null;
          preparation_time: number;
          cleanup_time: number;
          max_bookings_per_day: number;
          booking_window_days: number;
          image_url: string | null;
          color: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          professional_id: string;
          workplace_id: string;
          name: string;
          description?: string | null;
          duration: number;
          price: number;
          category?: string | null;
          schedule?: Record<string, any> | null;
          tags?: string[] | null;
          requirements?: string | null;
          preparation_time?: number;
          cleanup_time?: number;
          max_bookings_per_day?: number;
          booking_window_days?: number;
          image_url?: string | null;
          color?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          professional_id?: string;
          workplace_id?: string;
          name?: string;
          description?: string | null;
          duration?: number;
          price?: number;
          category?: string | null;
          schedule?: Record<string, any> | null;
          tags?: string[] | null;
          requirements?: string | null;
          preparation_time?: number;
          cleanup_time?: number;
          max_bookings_per_day?: number;
          booking_window_days?: number;
          image_url?: string | null;
          color?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
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
          status:
            | 'pending'
            | 'confirmed'
            | 'completed'
            | 'cancelled'
            | 'no_show';
          notes: string | null;
          instructions: string | null;
          description: string | null;
          cancellation_reason: string | null;
          payment_status: 'pending' | 'paid' | 'refunded';
          payment_method: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          professional_id: string;
          service_id: string;
          workplace_id: string;
          company_id?: string | null;
          booking_date: string;
          booking_time: string;
          duration: number;
          price: number;
          status?:
            | 'pending'
            | 'confirmed'
            | 'completed'
            | 'cancelled'
            | 'no_show';
          notes?: string | null;
          instructions?: string | null;
          description?: string | null;
          cancellation_reason?: string | null;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_method?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          professional_id?: string;
          service_id?: string;
          workplace_id?: string;
          company_id?: string | null;
          booking_date?: string;
          booking_time?: string;
          duration?: number;
          price?: number;
          status?:
            | 'pending'
            | 'confirmed'
            | 'completed'
            | 'cancelled'
            | 'no_show';
          notes?: string | null;
          instructions?: string | null;
          description?: string | null;
          cancellation_reason?: string | null;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_method?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          date_of_birth: string | null;
          address: string | null;
          emergency_contact: {
            name: string;
            phone: string;
            relationship: string;
          } | null;
          medical_history: string[] | null;
          allergies: string[] | null;
          current_medications: string[] | null;
          insurance_provider: string | null;
          insurance_number: string | null;
          preferred_language: string | null;
          communication_preferences: {
            email: boolean;
            sms: boolean;
            phone: boolean;
          } | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          email: string;
          phone?: string | null;
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
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          email?: string;
          phone?: string | null;
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
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
