import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
import {
  CompleteProfessional,
  Professional,
  ProfessionalInsert,
  ProfessionalUpdate,
  ProfileInsert,
} from './types';
import { createProfile } from './profile-helpers';

/**
 * Get complete professional data (profile + professional-specific data)
 */
export async function getCompleteProfessional(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<CompleteProfessional | null> {
  const { data, error } = await supabase
    .from('complete_professionals')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching complete professional:', error);
    return null;
  }

  return data as CompleteProfessional;
}

/**
 * Get professional-specific data only
 */
export async function getProfessionalData(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Professional | null> {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching professional data:', error);
    return null;
  }

  return data;
}

/**
 * Create a new professional with profile
 */
export async function createProfessionalWithProfile(
  supabase: SupabaseClient<Database>,
  profileData: ProfileInsert,
  professionalData: Omit<ProfessionalInsert, 'user_id'>
) {
  const profile = await createProfile(supabase, profileData);

  const { data: professional, error: professionalError } = await supabase
    .from('professionals')
    .insert({ ...professionalData, user_id: profile.id })
    .select()
    .single();

  if (professionalError) {
    // Rollback profile creation
    await supabase.from('profiles').delete().eq('id', profile.id);
    throw new Error(
      `Error creating professional: ${professionalError.message}`
    );
  }

  return { profile, professional };
}

/**
 * Update professional-specific data
 */
export async function updateProfessionalData(
  supabase: SupabaseClient<Database>,
  userId: string,
  professionalData: ProfessionalUpdate
) {
  const { data, error } = await supabase
    .from('professionals')
    .update(professionalData)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating professional data: ${error.message}`);
  }

  return data;
}

/**
 * Delete a professional and their profile
 */
export async function deleteProfessional(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<void> {
  // First delete professional data
  const { error: professionalError } = await supabase
    .from('professionals')
    .delete()
    .eq('user_id', userId);

  if (professionalError) {
    throw new Error(
      `Error deleting professional data: ${professionalError.message}`
    );
  }

  // Then delete profile
  const { error: profileError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (profileError) {
    throw new Error(`Error deleting profile: ${profileError.message}`);
  }
}
