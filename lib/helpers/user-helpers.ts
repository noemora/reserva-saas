import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
import { CompleteClient, CompleteProfessional, CompleteCompany } from './types';
import { getCompleteClient } from './client-helpers';
import { getCompleteProfessional } from './professional-helpers';
import { getCompleteCompany } from './company-helpers';
import { getProfile } from './profile-helpers';

/**
 * Get complete user data based on user type
 */
export async function getCompleteUser(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<CompleteClient | CompleteProfessional | CompleteCompany | null> {
  // First get the profile to determine user type
  const profile = await getProfile(supabase, userId);

  if (!profile) {
    console.error('Profile not found for user:', userId);
    return null;
  }

  // Fetch complete data based on user type
  switch (profile.user_type) {
    case 'Cliente':
      return await getCompleteClient(supabase, userId);
    case 'Profesional':
      return await getCompleteProfessional(supabase, userId);
    case 'Empresa':
      return await getCompleteCompany(supabase, userId);
    default:
      console.error('Unknown user type:', profile.user_type);
      return null;
  }
}

/**
 * Check if a user exists in the system
 */
export async function userExists(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<boolean> {
  const profile = await getProfile(supabase, userId);
  return profile !== null;
}

/**
 * Get user type by user ID
 */
export async function getUserType(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<string | null> {
  const profile = await getProfile(supabase, userId);
  return profile?.user_type || null;
}
