'use client';

import { useAuthInitialization } from '@/hooks/use-auth-initialization';

interface AuthInitializerProps {
  children: React.ReactNode;
}

/**
 * Componente para manejar la inicialización del store de autenticación.
 * Reemplaza el AuthProvider basado en Context.
 */
export function AuthInitializer({ children }: AuthInitializerProps) {
  const { isLoading } = useAuthInitialization();

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
