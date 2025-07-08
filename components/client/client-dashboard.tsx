'use client';

import { useEffect } from 'react';
import { ClientHeader } from './client-header';
import { ClientNavigation } from './client-navigation';
import { ClientDashboardView } from './dashboard/client-dashboard-view';
import { MyBookings } from './my-bookings';
import { BookingHistory } from './booking-history';
import MyProfile from './my-profile';
import { useClientStore } from '@/lib/stores/client-store';
import { useAuthStore } from '@/lib/stores/auth-store';

export function ClientDashboard() {
  const { profile } = useAuthStore();
  const {
    upcomingBookings,
    availableServices,
    bookingHistory,
    activeTab,
    setActiveTab,
    addBooking,
    updateBookingStatus,
    cancelBooking,
    loadData,
  } = useClientStore();

  // Load mock data on mount
  useEffect(() => {
    if (upcomingBookings.length === 0) {
      loadData();
    }
  }, [upcomingBookings.length, loadData]);

  return (
    <div className="flex min-h-screen flex-col">
      <ClientHeader />
      <div className="flex flex-1">
        <ClientNavigation />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {activeTab === 'dashboard' && <ClientDashboardView />}
          {activeTab === 'bookings' && <MyBookings user={profile} />}
          {activeTab === 'history' && <BookingHistory user={profile} />}
          {activeTab === 'profile' && <MyProfile />}
        </main>
      </div>
    </div>
  );
}
