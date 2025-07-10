'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { AuthGuard } from '@/components/auth/auth-guard';
import { ClientDashboard } from '@/components/client/client-dashboard';
import { ProfessionalDashboard } from '@/components/professional/professional-dashboard';
import { CompanyDashboard } from '@/components/company/company-dashboard';
import { ClinicSelection } from '@/components/professional/clinic-selection';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

function DashboardContent() {
  const { profile, signOut, isLoading } = useAuthStore();
  const [currentView, setCurrentView] = useState<
    | 'client-dashboard'
    | 'professional-dashboard'
    | 'company-dashboard'
    | 'clinic-selection'
  >(() => {
    if (!profile) return 'client-dashboard';

    switch (profile.user_type) {
      case 'Cliente':
        return 'client-dashboard';
      case 'Profesional':
        return 'clinic-selection';
      case 'Empresa':
        return 'company-dashboard';
      default:
        return 'client-dashboard';
    }
  });

  useEffect(() => {
    if (profile) {
      console.log(
        '📊 Dashboard cargado para:',
        profile.user_type,
        profile.full_name
      );
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            Error: No se pudo cargar el perfil
          </p>
          <Button onClick={signOut} variant="outline">
            Volver al login
          </Button>
        </div>
      </div>
    );
  }

  const handleClinicSelection = () => {
    setCurrentView('professional-dashboard');
  };

  switch (currentView) {
    case 'client-dashboard':
      return <ClientDashboard />;
    case 'clinic-selection':
      return <ClinicSelection onContinue={handleClinicSelection} />;
    case 'professional-dashboard':
      return <ProfessionalDashboard />;
    case 'company-dashboard':
      return <CompanyDashboard />;
    default:
      return <ClientDashboard />;
  }
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
