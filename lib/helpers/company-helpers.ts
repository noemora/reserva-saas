import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
import {
  CompleteCompany,
  Company,
  CompanyInsert,
  CompanyUpdate,
  ProfileInsert,
} from './types';
import { createProfile } from './profile-helpers';

/**
 * Get complete company data (profile + company-specific data)
 */
export async function getCompleteCompany(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<CompleteCompany | null> {
  const { data, error } = await supabase
    .from('complete_companies')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching complete company:', error);
    return null;
  }

  return data as CompleteCompany;
}

/**
 * Get company-specific data only
 */
export async function getCompanyData(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Company | null> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching company data:', error);
    return null;
  }

  return data;
}

/**
 * Create a new company with profile
 */
export async function createCompanyWithProfile(
  supabase: SupabaseClient<Database>,
  profileData: ProfileInsert,
  companyData: Omit<CompanyInsert, 'user_id'>
) {
  const profile = await createProfile(supabase, profileData);

  const { data: company, error: companyError } = await supabase
    .from('companies')
    .insert({ ...companyData, user_id: profile.id })
    .select()
    .single();

  if (companyError) {
    // Rollback profile creation
    await supabase.from('profiles').delete().eq('id', profile.id);
    throw new Error(`Error creating company: ${companyError.message}`);
  }

  return { profile, company };
}

/**
 * Update company-specific data
 */
export async function updateCompanyData(
  supabase: SupabaseClient<Database>,
  userId: string,
  companyData: CompanyUpdate
) {
  const { data, error } = await supabase
    .from('companies')
    .update(companyData)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating company data: ${error.message}`);
  }

  return data;
}

/**
 * Delete a company and their profile
 */
export async function deleteCompany(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<void> {
  // First delete company data
  const { error: companyError } = await supabase
    .from('companies')
    .delete()
    .eq('user_id', userId);

  if (companyError) {
    throw new Error(`Error deleting company data: ${companyError.message}`);
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
