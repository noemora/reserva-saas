import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
import { Profile, ProfileInsert, ProfileUpdate } from './types';

/**
 * Get profile by user ID
 */
export async function getProfile(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

/**
 * Update profile data
 */
export async function updateProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
  profileData: ProfileUpdate
) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating profile: ${error.message}`);
  }

  return data;
}

/**
 * Create a new profile
 */
export async function createProfile(
  supabase: SupabaseClient<Database>,
  profileData: ProfileInsert
): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating profile: ${error.message}`);
  }

  return data;
}

/**
 * Delete a profile
 */
export async function deleteProfile(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<void> {
  const { error } = await supabase.from('profiles').delete().eq('id', userId);

  if (error) {
    throw new Error(`Error deleting profile: ${error.message}`);
  }
}
