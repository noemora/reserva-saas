'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider para manejar la autenticación y estado global del usuario.
 * Inicializa el store de autenticación una sola vez al montar.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { initialize, isLoading, initialized } = useAuthStore();

  // Inicializar el store de autenticación
  useEffect(() => {
    console.log('🔄 AuthProvider: Iniciando inicialización...');

    // Forzar la inicialización en caso de estado inconsistente
    if (initialized && isLoading) {
      console.log(
        '🔧 AuthProvider: Estado inconsistente detectado, reiniciando...'
      );
      // Resetear el estado y forzar inicialización
      useAuthStore.setState({ initialized: false, isLoading: true });
    }

    initialize();
  }, []);

  // Mostrar loading mientras se inicializa
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        suppressHydrationWarning
      >
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
