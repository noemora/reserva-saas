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
          cancellation_reason: string | null;
          payment_status: 'pending' | 'paid' | 'refunded';
          payment_method: string | null;
          created_at: string;
          updated_at: string;
          instructions: string | null;
          description: string | null;
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
          cancellation_reason?: string | null;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_method?: string | null;
          created_at?: string;
          updated_at?: string;
          instructions?: string | null;
          description?: string | null;
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
          cancellation_reason?: string | null;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_method?: string | null;
          created_at?: string;
          updated_at?: string;
          instructions?: string | null;
          description?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'bookings_client_id_fkey';
            columns: ['client_id'];
            referencedRelation: 'clients';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_professional_id_fkey';
            columns: ['professional_id'];
            referencedRelation: 'professionals';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_service_id_fkey';
            columns: ['service_id'];
            referencedRelation: 'services';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_workplace_id_fkey';
            columns: ['workplace_id'];
            referencedRelation: 'workplaces';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_company_id_fkey';
            columns: ['company_id'];
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          }
        ];
      };
      clients: {
        Row: {
          id: string;
          user_id: string;
          date_of_birth: string | null;
          address: string | null;
          emergency_contact: Json | null;
          medical_history: string[] | null;
          allergies: string[] | null;
          current_medications: string[] | null;
          insurance_provider: string | null;
          insurance_number: string | null;
          preferred_language: string;
          communication_preferences: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date_of_birth?: string | null;
          address?: string | null;
          emergency_contact?: Json | null;
          medical_history?: string[] | null;
          allergies?: string[] | null;
          current_medications?: string[] | null;
          insurance_provider?: string | null;
          insurance_number?: string | null;
          preferred_language?: string;
          communication_preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date_of_birth?: string | null;
          address?: string | null;
          emergency_contact?: Json | null;
          medical_history?: string[] | null;
          allergies?: string[] | null;
          current_medications?: string[] | null;
          insurance_provider?: string | null;
          insurance_number?: string | null;
          preferred_language?: string;
          communication_preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'clients_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      companies: {
        Row: {
          id: string;
          user_id: string;
          address: string | null;
          website: string | null;
          capacity: number;
          founded_year: number | null;
          description: string | null;
          services: string[] | null;
          logo_url: string | null;
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
          address?: string | null;
          website?: string | null;
          capacity?: number;
          founded_year?: number | null;
          description?: string | null;
          services?: string[] | null;
          logo_url?: string | null;
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
          address?: string | null;
          website?: string | null;
          capacity?: number;
          founded_year?: number | null;
          description?: string | null;
          services?: string[] | null;
          logo_url?: string | null;
          rating?: number;
          total_bookings?: number;
          monthly_revenue?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'companies_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      company_schedules: {
        Row: {
          id: string;
          company_id: string;
          day_of_week:
            | 'monday'
            | 'tuesday'
            | 'wednesday'
            | 'thursday'
            | 'friday'
            | 'saturday'
            | 'sunday';
          is_open: boolean;
          open_time: string | null;
          close_time: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          day_of_week:
            | 'monday'
            | 'tuesday'
            | 'wednesday'
            | 'thursday'
            | 'friday'
            | 'saturday'
            | 'sunday';
          is_open?: boolean;
          open_time?: string | null;
          close_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          day_of_week?:
            | 'monday'
            | 'tuesday'
            | 'wednesday'
            | 'thursday'
            | 'friday'
            | 'saturday'
            | 'sunday';
          is_open?: boolean;
          open_time?: string | null;
          close_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'company_schedules_company_id_fkey';
            columns: ['company_id'];
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          }
        ];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type:
            | 'booking'
            | 'reminder'
            | 'cancellation'
            | 'payment'
            | 'review'
            | 'system';
          is_read: boolean;
          related_booking_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type:
            | 'booking'
            | 'reminder'
            | 'cancellation'
            | 'payment'
            | 'review'
            | 'system';
          is_read?: boolean;
          related_booking_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?:
            | 'booking'
            | 'reminder'
            | 'cancellation'
            | 'payment'
            | 'review'
            | 'system';
          is_read?: boolean;
          related_booking_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notifications_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notifications_related_booking_id_fkey';
            columns: ['related_booking_id'];
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          }
        ];
      };
      professional_workplaces: {
        Row: {
          id: string;
          professional_id: string;
          workplace_id: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          professional_id: string;
          workplace_id: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          professional_id?: string;
          workplace_id?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'professional_workplaces_professional_id_fkey';
            columns: ['professional_id'];
            referencedRelation: 'professionals';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'professional_workplaces_workplace_id_fkey';
            columns: ['workplace_id'];
            referencedRelation: 'workplaces';
            referencedColumns: ['id'];
          }
        ];
      };
      professionals: {
        Row: {
          id: string;
          user_id: string;
          company_id: string | null;
          title: string | null;
          license_number: string | null;
          experience: number;
          education: string | null;
          specialties: string[] | null;
          biography: string | null;
          rating: number;
          total_bookings: number;
          monthly_revenue: number;
          is_active: boolean;
          member_since: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_id?: string | null;
          title?: string | null;
          license_number?: string | null;
          experience?: number;
          education?: string | null;
          specialties?: string[] | null;
          biography?: string | null;
          rating?: number;
          total_bookings?: number;
          monthly_revenue?: number;
          is_active?: boolean;
          member_since?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_id?: string | null;
          title?: string | null;
          license_number?: string | null;
          experience?: number;
          education?: string | null;
          specialties?: string[] | null;
          biography?: string | null;
          rating?: number;
          total_bookings?: number;
          monthly_revenue?: number;
          is_active?: boolean;
          member_since?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'professionals_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'professionals_company_id_fkey';
            columns: ['company_id'];
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          }
        ];
      };
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
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      reviews: {
        Row: {
          id: string;
          booking_id: string;
          client_id: string;
          professional_id: string;
          rating: number;
          comment: string | null;
          is_anonymous: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          client_id: string;
          professional_id: string;
          rating: number;
          comment?: string | null;
          is_anonymous?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          client_id?: string;
          professional_id?: string;
          rating?: number;
          comment?: string | null;
          is_anonymous?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_booking_id_fkey';
            columns: ['booking_id'];
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_client_id_fkey';
            columns: ['client_id'];
            referencedRelation: 'clients';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_professional_id_fkey';
            columns: ['professional_id'];
            referencedRelation: 'professionals';
            referencedColumns: ['id'];
          }
        ];
      };
      service_schedules: {
        Row: {
          id: string;
          service_id: string;
          day_of_week:
            | 'monday'
            | 'tuesday'
            | 'wednesday'
            | 'thursday'
            | 'friday'
            | 'saturday'
            | 'sunday';
          is_available: boolean;
          start_time: string | null;
          end_time: string | null;
          break_start: string | null;
          break_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          service_id: string;
          day_of_week:
            | 'monday'
            | 'tuesday'
            | 'wednesday'
            | 'thursday'
            | 'friday'
            | 'saturday'
            | 'sunday';
          is_available?: boolean;
          start_time?: string | null;
          end_time?: string | null;
          break_start?: string | null;
          break_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          service_id?: string;
          day_of_week?:
            | 'monday'
            | 'tuesday'
            | 'wednesday'
            | 'thursday'
            | 'friday'
            | 'saturday'
            | 'sunday';
          is_available?: boolean;
          start_time?: string | null;
          end_time?: string | null;
          break_start?: string | null;
          break_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'service_schedules_service_id_fkey';
            columns: ['service_id'];
            referencedRelation: 'services';
            referencedColumns: ['id'];
          }
        ];
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
          is_active: boolean;
          created_at: string;
          updated_at: string;
          schedule: Json;
          tags: string[] | null;
          requirements: string | null;
          preparation_time: number;
          cleanup_time: number;
          max_bookings_per_day: number;
          booking_window_days: number;
          image_url: string | null;
          color: string;
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
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          schedule?: Json;
          tags?: string[] | null;
          requirements?: string | null;
          preparation_time?: number;
          cleanup_time?: number;
          max_bookings_per_day?: number;
          booking_window_days?: number;
          image_url?: string | null;
          color?: string;
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
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          schedule?: Json;
          tags?: string[] | null;
          requirements?: string | null;
          preparation_time?: number;
          cleanup_time?: number;
          max_bookings_per_day?: number;
          booking_window_days?: number;
          image_url?: string | null;
          color?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'services_professional_id_fkey';
            columns: ['professional_id'];
            referencedRelation: 'professionals';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'services_workplace_id_fkey';
            columns: ['workplace_id'];
            referencedRelation: 'workplaces';
            referencedColumns: ['id'];
          }
        ];
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
          services: string[] | null;
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
          services?: string[] | null;
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
          services?: string[] | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'workplaces_company_id_fkey';
            columns: ['company_id'];
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      complete_clients: {
        Row: {
          user_id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          user_type: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url: string | null;
          profile_created_at: string;
          profile_updated_at: string;
          client_id: string | null;
          date_of_birth: string | null;
          address: string | null;
          emergency_contact: Json | null;
          medical_history: string[] | null;
          allergies: string[] | null;
          current_medications: string[] | null;
          insurance_provider: string | null;
          insurance_number: string | null;
          preferred_language: string | null;
          communication_preferences: Json | null;
          client_created_at: string | null;
          client_updated_at: string | null;
        };
        Insert: {
          user_id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          user_type?: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url?: string | null;
          profile_created_at?: string;
          profile_updated_at?: string;
          client_id?: string | null;
          date_of_birth?: string | null;
          address?: string | null;
          emergency_contact?: Json | null;
          medical_history?: string[] | null;
          allergies?: string[] | null;
          current_medications?: string[] | null;
          insurance_provider?: string | null;
          insurance_number?: string | null;
          preferred_language?: string | null;
          communication_preferences?: Json | null;
          client_created_at?: string | null;
          client_updated_at?: string | null;
        };
        Update: {
          user_id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          user_type?: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url?: string | null;
          profile_created_at?: string;
          profile_updated_at?: string;
          client_id?: string | null;
          date_of_birth?: string | null;
          address?: string | null;
          emergency_contact?: Json | null;
          medical_history?: string[] | null;
          allergies?: string[] | null;
          current_medications?: string[] | null;
          insurance_provider?: string | null;
          insurance_number?: string | null;
          preferred_language?: string | null;
          communication_preferences?: Json | null;
          client_created_at?: string | null;
          client_updated_at?: string | null;
        };
        Relationships: [];
      };
      complete_professionals: {
        Row: {
          user_id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          user_type: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url: string | null;
          profile_created_at: string;
          profile_updated_at: string;
          professional_id: string | null;
          company_id: string | null;
          title: string | null;
          license_number: string | null;
          experience: number | null;
          education: string | null;
          specialties: string[] | null;
          biography: string | null;
          rating: number | null;
          total_bookings: number | null;
          monthly_revenue: number | null;
          is_active: boolean | null;
          member_since: string | null;
          professional_created_at: string | null;
          professional_updated_at: string | null;
          company_name: string | null;
        };
        Insert: {
          user_id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          user_type?: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url?: string | null;
          profile_created_at?: string;
          profile_updated_at?: string;
          professional_id?: string | null;
          company_id?: string | null;
          title?: string | null;
          license_number?: string | null;
          experience?: number | null;
          education?: string | null;
          specialties?: string[] | null;
          biography?: string | null;
          rating?: number | null;
          total_bookings?: number | null;
          monthly_revenue?: number | null;
          is_active?: boolean | null;
          member_since?: string | null;
          professional_created_at?: string | null;
          professional_updated_at?: string | null;
          company_name?: string | null;
        };
        Update: {
          user_id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          user_type?: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url?: string | null;
          profile_created_at?: string;
          profile_updated_at?: string;
          professional_id?: string | null;
          company_id?: string | null;
          title?: string | null;
          license_number?: string | null;
          experience?: number | null;
          education?: string | null;
          specialties?: string[] | null;
          biography?: string | null;
          rating?: number | null;
          total_bookings?: number | null;
          monthly_revenue?: number | null;
          is_active?: boolean | null;
          member_since?: string | null;
          professional_created_at?: string | null;
          professional_updated_at?: string | null;
          company_name?: string | null;
        };
        Relationships: [];
      };
      complete_companies: {
        Row: {
          user_id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          user_type: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url: string | null;
          profile_created_at: string;
          profile_updated_at: string;
          company_id: string | null;
          address: string | null;
          website: string | null;
          capacity: number | null;
          founded_year: number | null;
          description: string | null;
          services: string[] | null;
          logo_url: string | null;
          rating: number | null;
          total_bookings: number | null;
          monthly_revenue: number | null;
          is_active: boolean | null;
          company_created_at: string | null;
          company_updated_at: string | null;
        };
        Insert: {
          user_id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          user_type?: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url?: string | null;
          profile_created_at?: string;
          profile_updated_at?: string;
          company_id?: string | null;
          address?: string | null;
          website?: string | null;
          capacity?: number | null;
          founded_year?: number | null;
          description?: string | null;
          services?: string[] | null;
          logo_url?: string | null;
          rating?: number | null;
          total_bookings?: number | null;
          monthly_revenue?: number | null;
          is_active?: boolean | null;
          company_created_at?: string | null;
          company_updated_at?: string | null;
        };
        Update: {
          user_id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          user_type?: 'Cliente' | 'Profesional' | 'Empresa';
          avatar_url?: string | null;
          profile_created_at?: string;
          profile_updated_at?: string;
          company_id?: string | null;
          address?: string | null;
          website?: string | null;
          capacity?: number | null;
          founded_year?: number | null;
          description?: string | null;
          services?: string[] | null;
          logo_url?: string | null;
          rating?: number | null;
          total_bookings?: number | null;
          monthly_revenue?: number | null;
          is_active?: boolean | null;
          company_created_at?: string | null;
          company_updated_at?: string | null;
        };
        Relationships: [];
      };
      complete_bookings: {
        Row: {
          booking_id: string;
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
          cancellation_reason: string | null;
          payment_status: 'pending' | 'paid' | 'refunded';
          payment_method: string | null;
          instructions: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
          client_name: string | null;
          client_email: string | null;
          client_phone: string | null;
          professional_name: string | null;
          professional_title: string | null;
          professional_specialties: string[] | null;
          service_name: string | null;
          service_description: string | null;
          service_category: string | null;
          service_image_url: string | null;
          service_color: string | null;
          workplace_name: string | null;
          workplace_address: string | null;
          workplace_phone: string | null;
          workplace_email: string | null;
          company_name: string | null;
        };
        Insert: {
          booking_id?: string;
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
          cancellation_reason?: string | null;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_method?: string | null;
          instructions?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          client_name?: string | null;
          client_email?: string | null;
          client_phone?: string | null;
          professional_name?: string | null;
          professional_title?: string | null;
          professional_specialties?: string[] | null;
          service_name?: string | null;
          service_description?: string | null;
          service_category?: string | null;
          service_image_url?: string | null;
          service_color?: string | null;
          workplace_name?: string | null;
          workplace_address?: string | null;
          workplace_phone?: string | null;
          workplace_email?: string | null;
          company_name?: string | null;
        };
        Update: {
          booking_id?: string;
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
          cancellation_reason?: string | null;
          payment_status?: 'pending' | 'paid' | 'refunded';
          payment_method?: string | null;
          instructions?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          client_name?: string | null;
          client_email?: string | null;
          client_phone?: string | null;
          professional_name?: string | null;
          professional_title?: string | null;
          professional_specialties?: string[] | null;
          service_name?: string | null;
          service_description?: string | null;
          service_category?: string | null;
          service_image_url?: string | null;
          service_color?: string | null;
          workplace_name?: string | null;
          workplace_address?: string | null;
          workplace_phone?: string | null;
          workplace_email?: string | null;
          company_name?: string | null;
        };
        Relationships: [];
      };
      complete_services: {
        Row: {
          service_id: string;
          professional_id: string;
          workplace_id: string;
          name: string;
          description: string | null;
          duration: number;
          price: number;
          category: string | null;
          is_active: boolean;
          schedule: Json;
          tags: string[] | null;
          requirements: string | null;
          preparation_time: number;
          cleanup_time: number;
          max_bookings_per_day: number;
          booking_window_days: number;
          image_url: string | null;
          color: string;
          created_at: string;
          updated_at: string;
          professional_name: string | null;
          professional_title: string | null;
          professional_specialties: string[] | null;
          professional_experience: number | null;
          professional_rating: number | null;
          workplace_name: string | null;
          workplace_address: string | null;
          workplace_phone: string | null;
          workplace_email: string | null;
          company_name: string | null;
        };
        Insert: {
          service_id?: string;
          professional_id?: string;
          workplace_id?: string;
          name?: string;
          description?: string | null;
          duration?: number;
          price?: number;
          category?: string | null;
          is_active?: boolean;
          schedule?: Json;
          tags?: string[] | null;
          requirements?: string | null;
          preparation_time?: number;
          cleanup_time?: number;
          max_bookings_per_day?: number;
          booking_window_days?: number;
          image_url?: string | null;
          color?: string;
          created_at?: string;
          updated_at?: string;
          professional_name?: string | null;
          professional_title?: string | null;
          professional_specialties?: string[] | null;
          professional_experience?: number | null;
          professional_rating?: number | null;
          workplace_name?: string | null;
          workplace_address?: string | null;
          workplace_phone?: string | null;
          workplace_email?: string | null;
          company_name?: string | null;
        };
        Update: {
          service_id?: string;
          professional_id?: string;
          workplace_id?: string;
          name?: string;
          description?: string | null;
          duration?: number;
          price?: number;
          category?: string | null;
          is_active?: boolean;
          schedule?: Json;
          tags?: string[] | null;
          requirements?: string | null;
          preparation_time?: number;
          cleanup_time?: number;
          max_bookings_per_day?: number;
          booking_window_days?: number;
          image_url?: string | null;
          color?: string;
          created_at?: string;
          updated_at?: string;
          professional_name?: string | null;
          professional_title?: string | null;
          professional_specialties?: string[] | null;
          professional_experience?: number | null;
          professional_rating?: number | null;
          workplace_name?: string | null;
          workplace_address?: string | null;
          workplace_phone?: string | null;
          workplace_email?: string | null;
          company_name?: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
