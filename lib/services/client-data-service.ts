/**
 * Client Data Service - Handles real database operations for client data
 * Replaces mock data with actual Supabase queries
 */

import { getClientByUserId, updateClient } from '@/actions/client-actions';
import { getBookingsByClient } from '@/actions/booking-actions';
import { getAllServices } from '@/actions/service-actions';
import type { CompleteClient } from '@/types/database';
import type {
  ClientBooking,
  AvailableService,
  BookingHistory,
} from '@/types/client';

export class ClientDataService {
  /**
   * Get complete client profile by user ID
   */
  static async getClientProfile(
    userId: string
  ): Promise<CompleteClient | null> {
    try {
      console.log(
        '🔍 ClientDataService: Fetching client profile for user:',
        userId
      );
      const result = await getClientByUserId(userId);

      console.log('📊 ClientDataService: getClientByUserId result:', {
        success: result.success,
        hasData: !!result.data,
        error: result.error,
      });

      if (result.success && result.data) {
        console.log('✅ ClientDataService: Client profile found:', result.data);
        return result.data;
      } else {
        console.warn(
          '⚠️ ClientDataService: No client profile found or error occurred:',
          result.error
        );
        return null;
      }
    } catch (error) {
      console.error(
        '❌ ClientDataService: Error fetching client profile:',
        error
      );
      return null;
    }
  }

  /**
   * Get client bookings (upcoming and past)
   */
  static async getClientBookings(clientId: string): Promise<{
    upcoming: ClientBooking[];
    past: ClientBooking[];
  }> {
    try {
      const result = await getBookingsByClient(clientId);
      if (!result.success || !result.data) {
        return { upcoming: [], past: [] };
      }

      const now = new Date();
      const bookings = result.data.map((booking) => ({
        id: booking.id,
        date: booking.date,
        time: booking.time,
        service: booking.service_name || 'Servicio no especificado',
        professional:
          booking.professional_name || 'Profesional no especificado',
        clinic: booking.workplace_name || 'Clínica no especificada',
        status: booking.status as ClientBooking['status'],
        notes: booking.notes || undefined,
        price: booking.total_amount || 0,
        duration: booking.duration || 30,
      }));

      const upcoming = bookings.filter((booking) => {
        const bookingDate = new Date(`${booking.date}T${booking.time}`);
        return (
          bookingDate >= now &&
          booking.status !== 'cancelled' &&
          booking.status !== 'completed'
        );
      });

      const past = bookings.filter((booking) => {
        const bookingDate = new Date(`${booking.date}T${booking.time}`);
        return (
          bookingDate < now ||
          booking.status === 'cancelled' ||
          booking.status === 'completed'
        );
      });

      return { upcoming, past };
    } catch (error) {
      console.error('Error fetching client bookings:', error);
      return { upcoming: [], past: [] };
    }
  }

  /**
   * Get available services for booking
   */
  static async getAvailableServices(): Promise<AvailableService[]> {
    try {
      const result = await getAllServices();
      if (!result.success || !result.data) {
        return [];
      }

      // Transform basic service data to AvailableService format
      // Note: This is a simplified version. Real implementation would need
      // professional and location data from joins or separate queries
      return result.data.map((service) => ({
        id: service.id,
        name: service.name,
        description: service.description || '',
        category: service.category || 'General',
        duration: service.duration || 30,
        price: Number(service.price) || 0,
        professional: {
          id: 'temp-prof-id',
          name: 'Profesional Asignado',
          specialty: service.category || 'General',
          rating: 4.5,
        },
        location: {
          id: 'temp-location-id',
          name: 'Ubicación Principal',
          address: 'Dirección no especificada',
          phone: 'Teléfono no especificado',
        },
        available_slots: [],
        isAvailable: service.is_active,
        is_popular: false,
        tags: service.category ? [service.category] : [],
      }));
    } catch (error) {
      console.error('Error fetching available services:', error);
      return [];
    }
  }

  /**
   * Get client booking history statistics
   */
  static async getBookingHistory(clientId: string): Promise<BookingHistory> {
    try {
      // This would need a specific action or view in the database
      // For now, we'll calculate from existing bookings
      const { upcoming, past } = await this.getClientBookings(clientId);
      const allBookings = [...upcoming, ...past];

      const totalBookings = allBookings.length;
      const completedBookings = allBookings.filter(
        (b) => b.status === 'completed'
      ).length;
      const cancelledBookings = allBookings.filter(
        (b) => b.status === 'cancelled'
      ).length;
      const noShowBookings = 0; // Would need additional status types in database
      const totalSpent = allBookings
        .filter((b) => b.status === 'completed')
        .reduce((sum, b) => sum + Number(b.price || 0), 0);

      return {
        total_bookings: totalBookings,
        completed_bookings: completedBookings,
        cancelled_bookings: cancelledBookings,
        no_show_bookings: noShowBookings,
        total_spent: totalSpent,
        average_rating_given: 0, // Would need ratings table
      };
    } catch (error) {
      console.error('Error calculating booking history:', error);
      return {
        total_bookings: 0,
        completed_bookings: 0,
        cancelled_bookings: 0,
        no_show_bookings: 0,
        total_spent: 0,
        average_rating_given: 0,
      };
    }
  }

  /**
   * Update client profile
   */
  static async updateClientProfile(
    userId: string,
    updates: Partial<CompleteClient>
  ): Promise<boolean> {
    try {
      const result = await updateClient(userId, updates);
      return result.success;
    } catch (error) {
      console.error('Error updating client profile:', error);
      return false;
    }
  }
}
