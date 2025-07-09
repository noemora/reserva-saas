'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';

/**
 * Hook para inicializar el store de autenticación.
 * Se debe usar en el nivel superior de la aplicación.
 */
export function useAuthInitialization() {
  const { initialize, isLoading, initialized } = useAuthStore();

  useEffect(() => {
    // Evitar múltiples inicializaciones
    if (initialized) {
      return;
    }

    console.log('🔄 Inicializando autenticación...');

    // Forzar la inicialización en caso de estado inconsistente
    if (initialized && isLoading) {
      console.log('🔧 Estado inconsistente detectado, reiniciando...');
      useAuthStore.setState({ initialized: false, isLoading: true });
    }

    initialize();
  }, [initialize, initialized, isLoading]);

  return { isLoading };
}
