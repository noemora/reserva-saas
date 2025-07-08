'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, History, User, Home } from 'lucide-react';
import { useClientStore } from '@/lib/stores/client-store';

const navigationItems = [
  {
    id: 'dashboard' as const,
    label: 'Dashboard',
    icon: Home,
  },
  {
    id: 'bookings' as const,
    label: 'Mis Reservas',
    icon: Calendar,
  },
  {
    id: 'history' as const,
    label: 'Historial',
    icon: History,
  },
  {
    id: 'profile' as const,
    label: 'Perfil',
    icon: User,
  },
];

export function ClientNavigation() {
  const { activeTab, setActiveTab } = useClientStore();

  return (
    <nav className="w-64 bg-white border-r min-h-screen p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start gap-2',
                activeTab === item.id &&
                  'bg-blue-600 text-white hover:bg-blue-700'
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
