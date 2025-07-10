'use server';

import { supabaseServer } from '@/lib/supabase-server';
import type { Database } from '@/lib/database.types';
import { revalidatePath } from 'next/cache';
import {
  getCompleteClient,
  updateClientData,
  type CompleteClient,
} from '@/lib/helpers';

type Client = Database['public']['Tables']['clients']['Row'];
type ClientInsert = Database['public']['Tables']['clients']['Insert'];
type ClientUpdate = Database['public']['Tables']['clients']['Update'];

export async function createClient(clientData: ClientInsert) {
  try {
    // Check if client already exists by email
    const { data: existingClient, error: checkError } = await supabaseServer
      .from('clients')
      .select('*')
      .eq('email', clientData.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.error('Error checking existing client:', checkError);
      return { success: false, error: checkError.message };
    }

    if (existingClient) {
      return { success: true, data: existingClient };
    }

    const { data, error } = await supabaseServer
      .from('clients')
      .insert(clientData)
      .select()
      .single();

    if (error) {
      console.error('Error creating client:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/client');
    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true, data };
  } catch (error) {
    console.error('Error creating client:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getClient(
  clientId: string
): Promise<{ success: boolean; data?: Client; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single();

    if (error) {
      console.error('Error getting client:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting client:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getClientByUserId(
  userId: string
): Promise<{ success: boolean; data?: CompleteClient; error?: string }> {
  try {
    const data = await getCompleteClient(supabaseServer, userId);

    if (!data) {
      return { success: false, error: 'Client not found' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting client by user:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getClientByEmail(
  email: string
): Promise<{ success: boolean; data?: Client; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from('clients')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error getting client by email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting client by email:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getAllClients(): Promise<{
  success: boolean;
  data?: CompleteClient[];
  error?: string;
}> {
  try {
    const { data, error } = await supabaseServer
      .from('complete_clients')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error getting clients:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as CompleteClient[] };
  } catch (error) {
    console.error('Error getting clients:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function updateClient(userId: string, updates: ClientUpdate) {
  try {
    const data = await updateClientData(supabaseServer, userId, updates);

    revalidatePath('/client');
    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true, data };
  } catch (error) {
    console.error('Error updating client:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function deleteClient(clientId: string) {
  try {
    const { error } = await supabaseServer
      .from('clients')
      .delete()
      .eq('id', clientId);

    if (error) {
      console.error('Error deleting client:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/client');
    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true };
  } catch (error) {
    console.error('Error deleting client:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function searchClients(
  searchTerm: string
): Promise<{ success: boolean; data?: CompleteClient[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from('complete_clients')
      .select('*')
      .or(
        `name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`
      )
      .order('name')
      .limit(10);

    if (error) {
      console.error('Error searching clients:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as CompleteClient[] };
  } catch (error) {
    console.error('Error searching clients:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}
