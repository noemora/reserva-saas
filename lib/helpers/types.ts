// Re-export database types from the centralized types directory
export type {
  // Complete types (from views)
  CompleteClient,
  CompleteProfessional,
  CompleteCompany,

  // Raw database types
  ProfileRow as Profile,
  ClientRow as Client,
  ProfessionalRow as Professional,
  CompanyRow as Company,

  // Insert types
  ProfileInsert,
  ClientInsert,
  ProfessionalInsert,
  CompanyInsert,

  // Update types
  ProfileUpdate,
  ClientUpdate,
  ProfessionalUpdate,
  CompanyUpdate,
} from '@/types/database';
