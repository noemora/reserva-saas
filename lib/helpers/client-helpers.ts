import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
import {
  CompleteClient,
  Client,
  ClientInsert,
  ClientUpdate,
  ProfileInsert,
} from './types';
import { createProfile } from './profile-helpers';

/**
 * Get complete client data (profile + client-specific data)
 * Auto-creates client record if user exists in profiles but not in clients
 */
export async function getCompleteClient(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<CompleteClient | null> {
  try {
    console.log('🔍 client-helpers: getCompleteClient for userId:', userId);

    const { data, error } = await supabase
      .from('complete_clients')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error(
        '❌ client-helpers: Error fetching complete client:',
        error
      );

      // If client doesn't exist, try to create one from the profile
      if (error.code === 'PGRST116') {
        // No rows found
        console.log(
          '📝 client-helpers: Client not found, attempting to create from profile...'
        );
        return await createClientFromProfile(supabase, userId);
      }

      return null;
    }

    console.log('✅ client-helpers: Complete client found:', data);
    return data as CompleteClient;
  } catch (error) {
    console.error('❌ client-helpers: Exception in getCompleteClient:', error);
    return null;
  }
}

/**
 * Create a client record from an existing profile
 * This is used when a user exists in profiles but doesn't have a client record
 */
async function createClientFromProfile(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<CompleteClient | null> {
  try {
    console.log(
      '👤 client-helpers: Creating client from profile for userId:',
      userId
    );

    // First, get the profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      console.error('❌ client-helpers: Profile not found:', profileError);
      return null;
    }

    // Create a basic client record
    const { data: newClient, error: clientError } = await supabase
      .from('clients')
      .insert({
        user_id: userId,
        date_of_birth: null,
        address: null,
        emergency_contact: null,
        medical_history: null,
        allergies: null,
        current_medications: null,
        insurance_provider: null,
        insurance_number: null,
        preferred_language: 'es',
        communication_preferences: {
          email: true,
          sms: false,
          phone: false,
        },
      })
      .select()
      .single();

    if (clientError) {
      console.error('❌ client-helpers: Error creating client:', clientError);
      return null;
    }

    console.log('✅ client-helpers: Client created successfully:', newClient);

    // Now fetch the complete client view
    return await getCompleteClient(supabase, userId);
  } catch (error) {
    console.error(
      '❌ client-helpers: Exception creating client from profile:',
      error
    );
    return null;
  }
}

/**
 * Get client-specific data only
 */
export async function getClientData(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching client data:', error);
    return null;
  }

  return data;
}

/**
 * Create a new client with profile
 */
export async function createClientWithProfile(
  supabase: SupabaseClient<Database>,
  profileData: ProfileInsert,
  clientData: Omit<ClientInsert, 'user_id'>
) {
  const profile = await createProfile(supabase, profileData);

  const { data: client, error: clientError } = await supabase
    .from('clients')
    .insert({ ...clientData, user_id: profile.id })
    .select()
    .single();

  if (clientError) {
    // Rollback profile creation
    await supabase.from('profiles').delete().eq('id', profile.id);
    throw new Error(`Error creating client: ${clientError.message}`);
  }

  return { profile, client };
}

/**
 * Update client-specific data
 */
export async function updateClientData(
  supabase: SupabaseClient<Database>,
  userId: string,
  clientData: ClientUpdate
): Promise<CompleteClient | null> {
  try {
    console.log('📝 client-helpers: Updating client data for userId:', userId);

    const { error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('❌ client-helpers: Error updating client:', error);
      return null;
    }

    console.log('✅ client-helpers: Client updated successfully');

    // Return the complete client view
    return await getCompleteClient(supabase, userId);
  } catch (error) {
    console.error('❌ client-helpers: Exception updating client:', error);
    return null;
  }
}

/**
 * Delete a client and their profile
 */
export async function deleteClient(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<void> {
  // First delete client data
  const { error: clientError } = await supabase
    .from('clients')
    .delete()
    .eq('user_id', userId);

  if (clientError) {
    throw new Error(`Error deleting client data: ${clientError.message}`);
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
