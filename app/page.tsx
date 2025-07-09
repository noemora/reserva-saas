'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import { ClientDashboard } from '@/components/client/client-dashboard';
import { ProfessionalDashboard } from '@/components/professional/professional-dashboard';
import { CompanyDashboard } from '@/components/company/company-dashboard';
import { ClinicSelection } from '@/components/professional/clinic-selection';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function AuthenticatedApp() {
  const { profile, session, isLoading } = useAuthStore();
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
      switch (profile.user_type) {
        case 'Cliente':
          setCurrentView('client-dashboard');
          break;
        case 'Profesional':
          setCurrentView('clinic-selection');
          break;
        case 'Empresa':
          setCurrentView('company-dashboard');
          break;
        default:
          setCurrentView('client-dashboard');
      }
    }
  }, [profile]);

  // Mostrar loading mientras se carga el perfil
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay sesión, mostrar formularios de auth
  if (!session) {
    return <AuthForms />;
  }

  // Si no hay perfil, mostrar error
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Error: No se pudo cargar el perfil</p>
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

function AuthForms() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {showRegister ? (
        <div>
          <RegisterForm />
          <div className="fixed bottom-4 right-4">
            <Button variant="outline" onClick={() => setShowRegister(false)}>
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <LoginForm />
          <div className="fixed bottom-4 right-4">
            <Button variant="outline" onClick={() => setShowRegister(true)}>
              ¿No tienes cuenta? Regístrate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { session } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/dashboard');
    }
  }, [session, router]);

  // Si hay sesión, mostrar la app autenticada
  if (session) {
    return <AuthenticatedApp />;
  }

  // Si no hay sesión, mostrar página de bienvenida
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Bienvenido al sistema de reservas</h1>
      <AuthForms />
    </main>
  );
}
