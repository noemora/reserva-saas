'use client';

import { ClientHeader } from './client-header';
import { ClientNavigation } from './client-navigation';
import { ClientDashboardView } from './dashboard/client-dashboard-view';
import { MyBookings } from './my-bookings';
import { BookingHistory } from './booking-history';
import MyProfile from './my-profile';
import { useClientStore } from '@/lib/stores/client-store';
import { useClientData } from '@/hooks/use-client-data';

export function ClientDashboard() {
  const { activeTab } = useClientStore();

  // Use the hook to automatically load client data with proper userId
  useClientData();

  return (
    <div className="flex min-h-screen flex-col">
      <ClientHeader />
      <div className="flex flex-1">
        <ClientNavigation />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {activeTab === 'dashboard' && <ClientDashboardView />}
          {activeTab === 'bookings' && <MyBookings />}
          {activeTab === 'history' && <BookingHistory />}
          {activeTab === 'profile' && <MyProfile />}
        </main>
      </div>
    </div>
  );
}
