'use server';

import { supabaseServer } from '@/lib/supabase-server';
import type { Database } from '@/lib/database.types';
import { revalidatePath } from 'next/cache';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export async function createBooking(bookingData: BookingInsert) {
  try {
    // Check for conflicts before creating
    const { data: existingBookings, error: checkError } = await supabaseServer
      .from('bookings')
      .select('*')
      .eq('professional_id', bookingData.professional_id)
      .eq('booking_date', bookingData.booking_date)
      .eq('booking_time', bookingData.booking_time)
      .in('status', ['pending', 'confirmed']);

    if (checkError) {
      console.error('Error checking booking conflicts:', checkError);
      return { success: false, error: checkError.message };
    }

    if (existingBookings && existingBookings.length > 0) {
      return { success: false, error: 'Ya existe una cita en ese horario' };
    }

    const { data, error } = await supabaseServer
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/client');
    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true, data };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getBooking(
  bookingId: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from('bookings')
      .select(
        `
        *,
        clients(
          id,
          user_id,
          profiles!user_id(full_name, email, phone)
        ),
        professionals(
          id,
          user_id,
          title,
          profiles!user_id(full_name, email, phone)
        ),
        services(name, description),
        workplaces(name, address)
      `
      )
      .eq('id', bookingId)
      .single();

    if (error) {
      console.error('Error getting booking:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting booking:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getBookingsByClient(
  clientId: string
): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from('bookings')
      .select(
        `
        *,
        professionals(
          id,
          user_id,
          title,
          profiles!user_id(full_name, email, phone)
        ),
        services(name, description),
        workplaces(name, address)
      `
      )
      .eq('client_id', clientId)
      .order('booking_date', { ascending: false });

    if (error) {
      console.error('Error getting bookings by client:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting bookings by client:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getBookingsByProfessional(
  professionalId: string
): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from('bookings')
      .select(
        `
        *,
        clients(
          id,
          user_id,
          profiles!user_id(full_name, email, phone)
        ),
        services(name, description),
        workplaces(name, address)
      `
      )
      .eq('professional_id', professionalId)
      .order('booking_date', { ascending: false });

    if (error) {
      console.error('Error getting bookings by professional:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting bookings by professional:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getBookingsByCompany(
  companyId: string
): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const { data, error } = await supabaseServer
      .from('bookings')
      .select(
        `
        *,
        clients(
          id,
          user_id,
          profiles!user_id(full_name, email, phone)
        ),
        professionals!inner(
          id,
          user_id,
          title,
          company_id,
          profiles!user_id(full_name, email, phone)
        ),
        services(name, description),
        workplaces(name, address)
      `
      )
      .eq('professionals.company_id', companyId)
      .order('booking_date', { ascending: false });

    if (error) {
      console.error('Error getting bookings by company:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting bookings by company:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function updateBooking(bookingId: string, updates: BookingUpdate) {
  try {
    const { data, error } = await supabaseServer
      .from('bookings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/client');
    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true, data };
  } catch (error) {
    console.error('Error updating booking:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
) {
  try {
    const { data, error } = await supabaseServer
      .from('bookings')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking status:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/client');
    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true, data };
  } catch (error) {
    console.error('Error updating booking status:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function deleteBooking(bookingId: string) {
  try {
    const { error } = await supabaseServer
      .from('bookings')
      .delete()
      .eq('id', bookingId);

    if (error) {
      console.error('Error deleting booking:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/client');
    revalidatePath('/professional');
    revalidatePath('/company');
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}

export async function getBookingsByDateRange(
  startDate: string,
  endDate: string,
  professionalId?: string
) {
  try {
    let query = supabaseServer
      .from('bookings')
      .select(
        `
        *,
        clients(
          id,
          user_id,
          profiles!user_id(full_name, email, phone)
        ),
        services(name, description),
        workplaces(name, address)
      `
      )
      .gte('booking_date', startDate)
      .lte('booking_date', endDate);

    if (professionalId) {
      query = query.eq('professional_id', professionalId);
    }

    const { data, error } = await query
      .order('booking_date')
      .order('booking_time');

    if (error) {
      console.error('Error getting bookings by date range:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error getting bookings by date range:', error);
    return { success: false, error: 'Error interno del servidor' };
  }
}
