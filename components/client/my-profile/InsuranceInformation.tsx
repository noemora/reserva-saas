'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, User } from 'lucide-react';
import type { CompleteClient, ProfileRow } from '@/types/database';
import { isCompleteClient } from './utils';

interface InsuranceInformationProps {
  profile: CompleteClient | ProfileRow | null;
}

export function InsuranceInformation({ profile }: InsuranceInformationProps) {
  const hasInsuranceInfo =
    isCompleteClient(profile) && profile.insurance_provider;

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-green-600" />
          Información del Seguro
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasInsuranceInfo && isCompleteClient(profile) ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Shield className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-green-600 uppercase tracking-wide">
                  Proveedor
                </p>
                <p className="font-medium text-gray-900">
                  {profile.insurance_provider}
                </p>
              </div>
            </div>
            {profile.insurance_number && (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <User className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xs text-green-600 uppercase tracking-wide">
                    Número de Póliza
                  </p>
                  <p className="font-medium text-gray-900">
                    {profile.insurance_number}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              No hay información de seguro registrada
            </p>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent">
              Agregar Seguro
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
