'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LoadingState() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mi Perfil</CardTitle>
          <p className="text-gray-600">Cargando información del perfil...</p>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
