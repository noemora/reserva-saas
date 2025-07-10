import { Database } from '@/lib/database.types';

// ========================================
// BASE DATABASE TYPES (Raw from Supabase)
// ========================================

// Profile types
export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// Client types (normalized - no redundant profile fields)
export type ClientRow = Database['public']['Tables']['clients']['Row'];
export type ClientInsert = Database['public']['Tables']['clients']['Insert'];
export type ClientUpdate = Database['public']['Tables']['clients']['Update'];

// Professional types (normalized - no redundant profile fields)
export type ProfessionalRow =
  Database['public']['Tables']['professionals']['Row'];
export type ProfessionalInsert =
  Database['public']['Tables']['professionals']['Insert'];
export type ProfessionalUpdate =
  Database['public']['Tables']['professionals']['Update'];

// Company types (normalized - no redundant profile fields)
export type CompanyRow = Database['public']['Tables']['companies']['Row'];
export type CompanyInsert = Database['public']['Tables']['companies']['Insert'];
export type CompanyUpdate = Database['public']['Tables']['companies']['Update'];

// Service types
export type ServiceRow = Database['public']['Tables']['services']['Row'];
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type ServiceUpdate = Database['public']['Tables']['services']['Update'];

// Workplace types
export type WorkplaceRow = Database['public']['Tables']['workplaces']['Row'];
export type WorkplaceInsert =
  Database['public']['Tables']['workplaces']['Insert'];
export type WorkplaceUpdate =
  Database['public']['Tables']['workplaces']['Update'];

// Booking types
export type BookingRow = Database['public']['Tables']['bookings']['Row'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

// ========================================
// COMPLETE TYPES (From Views - Profile + Specific Data)
// ========================================

export type CompleteClient =
  Database['public']['Views']['complete_clients']['Row'];
export type CompleteProfessional =
  Database['public']['Views']['complete_professionals']['Row'];
export type CompleteCompany =
  Database['public']['Views']['complete_companies']['Row'];

// ========================================
// LEGACY ALIASES (for backward compatibility)
// ========================================

/** @deprecated Use ProfileRow instead */
export type Profile = ProfileRow;

/** @deprecated Use ClientRow instead */
export type Client = ClientRow;

/** @deprecated Use ProfessionalRow instead */
export type Professional = ProfessionalRow;

/** @deprecated Use CompanyRow instead */
export type Company = CompanyRow;

/** @deprecated Use ServiceRow instead */
export type Service = ServiceRow;

/** @deprecated Use WorkplaceRow instead */
export type Workplace = WorkplaceRow;

/** @deprecated Use BookingRow instead */
export type Booking = BookingRow;
