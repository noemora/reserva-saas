/**
 * Hook for loading client data from database or mock data as fallback
 * Integrates with authentication to automatically load user data
 */

import { useEffect } from 'react';
import { useClientStore } from '@/lib/stores/client-store';
import { useAuthStore } from '@/lib/stores/auth-store';

export function useClientData() {
  const { profile: authProfile } = useAuthStore();
  const {
    profile,
    upcomingBookings,
    pastBookings,
    availableServices,
    bookingHistory,
    loadData,
    loadDataSync,
  } = useClientStore();

  // Auto-load data when auth profile is available
  useEffect(() => {
    console.log('🔍 useClientData: Auth profile check', {
      authProfile: authProfile
        ? { id: authProfile.id, email: authProfile.email }
        : null,
      hasId: !!authProfile?.id,
    });

    if (authProfile?.id) {
      console.log(
        '✅ useClientData: Loading real data for user:',
        authProfile.id
      );
      // Try to load real data first
      loadData(authProfile.id).catch((error) => {
        console.warn('Failed to load real data, using mock data', error);
        // Fallback to mock data if real data fails
        loadDataSync();
      });
    } else {
      console.log('⚠️ useClientData: No auth profile ID, using mock data');
      // No auth profile, use mock data for demo
      loadDataSync();
    }
  }, [authProfile, loadData, loadDataSync]);

  return {
    profile,
    upcomingBookings,
    pastBookings,
    availableServices,
    bookingHistory,
    isLoading: !profile, // Simple loading state
    refetch: () => {
      if (authProfile?.id) {
        return loadData(authProfile.id);
      } else {
        loadDataSync();
        return Promise.resolve();
      }
    },
  };
}

export default useClientData;
