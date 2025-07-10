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
 */
export async function getCompleteClient(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<CompleteClient | null> {
  const { data, error } = await supabase
    .from('complete_clients')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching complete client:', error);
    return null;
  }

  return data as CompleteClient;
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
) {
  const { data, error } = await supabase
    .from('clients')
    .update(clientData)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating client data: ${error.message}`);
  }

  return data;
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
