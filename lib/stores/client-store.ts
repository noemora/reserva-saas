/**
 * Client Store - Manages client application state
 * Follows SOLID principles and provides comprehensive client data management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CompleteClient } from '@/types/database';
import type {
  ClientBooking,
  AvailableService,
  BookingHistory,
} from '@/types/client';
import { ClientDataService } from '@/lib/services/client-data-service';
// Keep mock data as fallback
import {
  getMockClientProfile,
  getMockUpcomingBookings,
  getMockPastBookings,
  getMockAvailableServices,
  getMockBookingHistory,
} from '@/lib/mock-data/client-data';

export type ClientTab = 'dashboard' | 'bookings' | 'history' | 'profile';

// Constants for better maintainability
export const CLIENT_TABS = {
  DASHBOARD: 'dashboard' as const,
  BOOKINGS: 'bookings' as const,
  HISTORY: 'history' as const,
  PROFILE: 'profile' as const,
} as const;

export const BOOKING_STATUSES = {
  CONFIRMED: 'confirmed' as const,
  PENDING: 'pending' as const,
  CANCELLED: 'cancelled' as const,
  COMPLETED: 'completed' as const,
} as const;

/**
 * Client state interface with segregated responsibilities
 */

interface ClientState {
  // Current state
  activeTab: ClientTab;

  // Data
  profile: CompleteClient | null;
  upcomingBookings: ClientBooking[];
  pastBookings: ClientBooking[];
  availableServices: AvailableService[];
  bookingHistory: BookingHistory;

  // UI state
  isBookingModalOpen: boolean;
  selectedService: AvailableService | null;

  // Actions
  setActiveTab: (tab: ClientTab) => void;
  setProfile: (profile: CompleteClient | null) => void;

  // Booking actions
  addBooking: (booking: ClientBooking) => void;
  updateBookingStatus: (id: string, status: ClientBooking['status']) => void;
  cancelBooking: (id: string) => void;

  // Additional booking utilities
  getBookingById: (id: string) => ClientBooking | undefined;
  getTodaysBookings: () => ClientBooking[];
  getUpcomingBookings: () => ClientBooking[];
  validateBooking: (booking: Partial<ClientBooking>) => {
    isValid: boolean;
    errors: string[];
  };

  // Service actions
  setSelectedService: (service: AvailableService | null) => void;
  setBookingModalOpen: (open: boolean) => void;

  // Data refresh
  refreshData: () => void;
  clearAllData: () => void;

  // Load data (with real database integration)
  loadData: (userId?: string) => Promise<void>;
  loadDataSync: () => void; // Fallback for mock data
}

export const useClientStore = create<ClientState>()(
  persist(
    (set, get) => ({
      // Initial state
      activeTab: 'dashboard',

      // Initial data
      profile: null,
      upcomingBookings: [],
      pastBookings: [],
      availableServices: [],
      bookingHistory: {
        total_bookings: 0,
        completed_bookings: 0,
        cancelled_bookings: 0,
        no_show_bookings: 0,
        total_spent: 0,
        average_rating_given: 0,
      },

      // UI state
      isBookingModalOpen: false,
      selectedService: null,

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      setProfile: (profile) => set({ profile }),

      // Booking actions
      addBooking: (booking) => {
        const validation = get().validateBooking(booking);
        if (!validation.isValid) {
          console.warn('Booking validation failed:', validation.errors);
          return; // Don't add invalid booking
        }
        set((s) => ({ upcomingBookings: [booking, ...s.upcomingBookings] }));
      },

      updateBookingStatus: (id, status) =>
        set((s) => {
          const bookingIndex = s.upcomingBookings.findIndex((b) => b.id === id);
          if (bookingIndex === -1) return s; // Booking not found

          const updatedBooking = {
            ...s.upcomingBookings[bookingIndex],
            status,
          };

          // If status is completed or cancelled, move to past bookings
          if (status === 'completed' || status === 'cancelled') {
            return {
              upcomingBookings: s.upcomingBookings.filter((b) => b.id !== id),
              pastBookings: [updatedBooking, ...s.pastBookings],
            };
          }

          // Otherwise, just update the status in upcoming bookings
          return {
            upcomingBookings: s.upcomingBookings.map((b) =>
              b.id === id ? updatedBooking : b
            ),
          };
        }),

      cancelBooking: (id) =>
        set((s) => {
          const bookingToCancel = s.upcomingBookings.find((b) => b.id === id);
          if (!bookingToCancel) return s; // No booking found, no changes

          return {
            upcomingBookings: s.upcomingBookings.filter((b) => b.id !== id),
            pastBookings: [
              ...s.pastBookings,
              {
                ...bookingToCancel,
                status: 'cancelled' as const,
              },
            ],
          };
        }),

      // Service actions
      setSelectedService: (service) => set({ selectedService: service }),
      setBookingModalOpen: (open) => set({ isBookingModalOpen: open }),

      // Additional booking utilities
      getBookingById: (id: string) => {
        const state = get();
        return [...state.upcomingBookings, ...state.pastBookings].find(
          (b: ClientBooking) => b.id === id
        );
      },

      getTodaysBookings: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        return state.upcomingBookings.filter(
          (b: ClientBooking) => b.date === today
        );
      },

      getUpcomingBookings: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        return state.upcomingBookings.filter(
          (b: ClientBooking) => b.date >= today
        );
      },

      validateBooking: (booking: Partial<ClientBooking>) => {
        const errors: string[] = [];

        if (!booking.id) errors.push('ID de reserva es requerido');
        if (!booking.date) errors.push('Fecha es requerida');
        if (!booking.professional) errors.push('Profesional es requerido');
        if (!booking.clinic) errors.push('Clínica es requerida');
        if (!booking.status) errors.push('Estado es requerido');

        // Validate date format and future date
        if (booking.date) {
          const bookingDate = new Date(booking.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (isNaN(bookingDate.getTime())) {
            errors.push('Formato de fecha inválido');
          } else if (bookingDate < today) {
            errors.push('La fecha no puede ser en el pasado');
          }
        }

        return {
          isValid: errors.length === 0,
          errors,
        };
      },

      // Data refresh using mock data (fallback)
      refreshData: () => {
        set({
          profile: getMockClientProfile(),
          upcomingBookings: getMockUpcomingBookings(),
          pastBookings: getMockPastBookings(),
          availableServices: getMockAvailableServices(),
          bookingHistory: getMockBookingHistory(),
        });
      },

      clearAllData: () => {
        set({
          profile: null,
          upcomingBookings: [],
          pastBookings: [],
          availableServices: [],
          bookingHistory: {
            total_bookings: 0,
            completed_bookings: 0,
            cancelled_bookings: 0,
            no_show_bookings: 0,
            total_spent: 0,
            average_rating_given: 0,
          },
        });
      },

      // Load data from database
      loadData: async (userId?: string) => {
        if (!userId) {
          console.warn('⚠️ ClientStore: No userId provided, using mock data');
          get().loadDataSync();
          return;
        }

        console.log('🔄 ClientStore: Loading data for userId:', userId);

        try {
          // Load profile
          console.log('👤 ClientStore: Loading profile...');
          const profile = await ClientDataService.getClientProfile(userId);

          // Load bookings
          console.log('📅 ClientStore: Loading bookings...');
          const { upcoming, past } = await ClientDataService.getClientBookings(
            userId
          );

          // Load services
          console.log('🔧 ClientStore: Loading services...');
          const availableServices =
            await ClientDataService.getAvailableServices();

          // Load booking history
          console.log('📊 ClientStore: Loading booking history...');
          const bookingHistory = await ClientDataService.getBookingHistory(
            userId
          );

          console.log('✅ ClientStore: All data loaded successfully', {
            hasProfile: !!profile,
            upcomingCount: upcoming.length,
            pastCount: past.length,
            servicesCount: availableServices.length,
          });

          set({
            profile,
            upcomingBookings: upcoming,
            pastBookings: past,
            availableServices,
            bookingHistory,
          });
        } catch (error) {
          console.error('❌ ClientStore: Error loading client data:', error);
          // Fallback to mock data on error
          console.log('🔄 ClientStore: Falling back to mock data');
          get().loadDataSync();
        }
      },

      // Load mock data (synchronous fallback)
      loadDataSync: () => {
        set({
          profile: getMockClientProfile(),
          upcomingBookings: getMockUpcomingBookings(),
          pastBookings: getMockPastBookings(),
          availableServices: getMockAvailableServices(),
          bookingHistory: getMockBookingHistory(),
        });
      },
    }),
    {
      name: 'client-storage',
      partialize: (state) => ({
        profile: state.profile,
        upcomingBookings: state.upcomingBookings,
        pastBookings: state.pastBookings,
      }),
    }
  )
);
