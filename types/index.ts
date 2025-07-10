// ========================================
// DATABASE TYPES (Raw Supabase types)
// ========================================
export type {
  // Profile types
  ProfileRow,
  ProfileInsert,
  ProfileUpdate,

  // Client types
  ClientRow,
  ClientInsert,
  ClientUpdate,

  // Professional types
  ProfessionalRow,
  ProfessionalInsert,
  ProfessionalUpdate,

  // Company types
  CompanyRow,
  CompanyInsert,
  CompanyUpdate,

  // Service types
  ServiceRow,
  ServiceInsert,
  ServiceUpdate,

  // Workplace types
  WorkplaceRow,
  WorkplaceInsert,
  WorkplaceUpdate,

  // Booking types
  BookingRow,
  BookingInsert as DatabaseBookingInsert,
  BookingUpdate as DatabaseBookingUpdate,

  // Complete types (views)
  CompleteClient,
  CompleteProfessional,
  CompleteCompany,

  // Legacy aliases (deprecated)
  Profile,
  Client,
  Professional,
  Company,
  Service,
  Workplace,
  Booking,
} from './database';

// ========================================
// DOMAIN-SPECIFIC TYPES
// ========================================

// Auth types
export * from './auth';

// Booking types (enhanced with UI features)
export type {
  BookingWithDetails,
  BookingLocation,
  BookingService,
  BookingProfessional,
  BookingStatus,
  ServiceSchedule,
} from './booking';

// Client types (enhanced with UI features)
export type {
  ClientProfile,
  ClientBooking,
  ClientBookingWithDetails,
  AvailableService,
  BookingHistory,
  ClientTab,
  ClientSlice,
} from './client';

// Company types (enhanced with UI features)
export type {
  CompanyProfessional,
  CompanyBooking,
  CompanyClient,
  CompanyStats,
  CompanyTab,
  CompanySlice,
} from './company';

// Professional types (enhanced with UI features)
export type {
  ProfessionalService,
  ProfessionalBooking,
  ProfessionalClient,
  ProfessionalLocation,
  Clinic,
  ProfessionalStats,
  ProfessionalTab,
  ProfessionalSlice,
  DashboardStats,
} from './professional';
