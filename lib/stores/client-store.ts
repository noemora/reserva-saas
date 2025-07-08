import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '@/types/auth';
import type {
  ClientProfile,
  ClientBooking,
  AvailableService,
  BookingHistory,
} from '@/types/client';
import {
  getMockClientProfile,
  getMockUpcomingBookings,
  getMockPastBookings,
  getMockAvailableServices,
  getMockBookingHistory,
} from '@/lib/mock-data/client-data';

export type ClientTab = 'dashboard' | 'bookings' | 'history' | 'profile';

interface ClientState {
  // Current state
  activeTab: ClientTab;

  // Data
  profile: ClientProfile | null;
  upcomingBookings: ClientBooking[];
  pastBookings: ClientBooking[];
  availableServices: AvailableService[];
  bookingHistory: BookingHistory;

  // UI state
  isBookingModalOpen: boolean;
  selectedService: AvailableService | null;

  // Actions
  setActiveTab: (tab: ClientTab) => void;
  setProfile: (profile: ClientProfile | null) => void;

  // Booking actions
  addBooking: (booking: ClientBooking) => void;
  updateBookingStatus: (id: string, status: ClientBooking['status']) => void;
  cancelBooking: (id: string) => void;

  // Service actions
  setSelectedService: (service: AvailableService | null) => void;
  setBookingModalOpen: (open: boolean) => void;

  // Load data
  loadData: () => void;
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
      addBooking: (booking) =>
        set((s) => ({ upcomingBookings: [booking, ...s.upcomingBookings] })),

      updateBookingStatus: (id, status) =>
        set((s) => ({
          upcomingBookings: s.upcomingBookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        })),

      cancelBooking: (id) =>
        set((s) => ({
          upcomingBookings: s.upcomingBookings.filter((b) => b.id !== id),
          pastBookings: [
            ...s.pastBookings,
            {
              ...s.upcomingBookings.find((b) => b.id === id)!,
              status: 'cancelled',
            },
          ],
        })),

      // Service actions
      setSelectedService: (service) => set({ selectedService: service }),
      setBookingModalOpen: (open) => set({ isBookingModalOpen: open }),

      // Load data
      loadData: () => {
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
