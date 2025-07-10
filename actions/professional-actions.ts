'use server';

import { supabaseServer } from '@/lib/supabase-server';
import type { Database } from '@/lib/database.types';
import { revalidatePath } from 'next/cache';
import {
  getCompleteProfessional,
  updateProfessionalData,
  type CompleteProfessional,
} from '@/lib/helpers';

type Professional = Database['public']['Tables']['professionals']['Row'];
type ProfessionalInsert =
  Database['public']['Tables']['professionals']['Insert'];
type ProfessionalUpdate =
  Database['public']['Tables']['professionals']['Update'];

export async function createProfessional(professionalData: ProfessionalInsert) {
  try {
    const { data, error } = await supabaseServer
      .from('professionals')
      .insert(professionalData)
      .select()
      .single();

    if (error) {
      console.error('Error creating professional:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true, data };
  } catch (error) {
    console.error('Error creating professional:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getProfessional(
  professionalId: string
): Promise<{ success: boolean; data?: Professional; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from('professionals')
      .select('*')
      .eq('id', professionalId)
      .single();

    if (error) {
      console.error('Error getting professional:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting professional:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getProfessionalByUserId(
  userId: string
): Promise<{ success: boolean; data?: CompleteProfessional; error?: string }> {
  try {
    const data = await getCompleteProfessional(supabaseServer, userId);

    if (!data) {
      return { success: false, error: 'Professional not found' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting professional by user:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getProfessionalsByCompany(companyId: string): Promise<{
  success: boolean;
  data?: CompleteProfessional[];
  error?: string;
}> {
  try {
    const { data, error } = await supabaseServer
      .from('complete_professionals')
      .select('*')
      .eq('company_id', companyId)
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error getting professionals by company:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as CompleteProfessional[] };
  } catch (error) {
    console.error('Error getting professionals by company:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getAllProfessionals(): Promise<{
  success: boolean;
  data?: CompleteProfessional[];
  error?: string;
}> {
  try {
    const { data, error } = await supabaseServer
      .from('complete_professionals')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error getting professionals:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as CompleteProfessional[] };
  } catch (error) {
    console.error('Error getting professionals:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function updateProfessional(
  userId: string,
  updates: ProfessionalUpdate
) {
  try {
    const data = await updateProfessionalData(supabaseServer, userId, updates);

    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true, data };
  } catch (error) {
    console.error('Error updating professional:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function deleteProfessional(professionalId: string) {
  try {
    const { error } = await supabaseServer
      .from('professionals')
      .delete()
      .eq('id', professionalId);

    if (error) {
      console.error('Error deleting professional:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true };
  } catch (error) {
    console.error('Error deleting professional:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function toggleProfessionalStatus(
  professionalId: string,
  isActive: boolean
) {
  try {
    const { data, error } = await supabaseServer
      .from('professionals')
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', professionalId)
      .select()
      .single();

    if (error) {
      console.error('Error toggling professional status:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true, data };
  } catch (error) {
    console.error('Error toggling professional status:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getProfessionalStats(professionalId: string) {
  try {
    // Get professional bookings for stats
    const { data: bookings, error: bookingsError } = await supabaseServer
      .from('bookings')
      .select('*')
      .eq('professional_id', professionalId);

    if (bookingsError) {
      console.error('Error getting professional bookings:', bookingsError);
      return { success: false, error: bookingsError.message };
    }

    const today = new Date().toISOString().split('T')[0];
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const weekStart = thisWeek.toISOString().split('T')[0];

    const todayBookings = bookings?.filter((b) => b.date === today) || [];
    const pendingBookings =
      bookings?.filter((b) => b.status === 'pending') || [];
    const weeklyBookings = bookings?.filter((b) => b.date >= weekStart) || [];
    const completedBookings =
      bookings?.filter((b) => b.status === 'completed') || [];

    const monthlyRevenue = completedBookings.reduce(
      (sum, booking) => sum + booking.price,
      0
    );

    const stats = {
      todayBookings: todayBookings.length,
      pendingBookings: pendingBookings.length,
      weeklyBookings: weeklyBookings.length,
      monthlyRevenue,
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Error getting professional stats:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}
