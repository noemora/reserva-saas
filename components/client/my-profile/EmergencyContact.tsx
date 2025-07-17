'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, User, Phone, Heart } from 'lucide-react';
import type { CompleteClient, ProfileRow } from '@/types/database';
import { isCompleteClient, isValidEmergencyContact } from './utils';

interface EmergencyContactProps {
  profile: CompleteClient | ProfileRow | null;
}

export function EmergencyContact({ profile }: EmergencyContactProps) {
  const hasEmergencyContact =
    isCompleteClient(profile) &&
    profile.emergency_contact &&
    isValidEmergencyContact(profile.emergency_contact);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Contacto de Emergencia
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasEmergencyContact &&
        isCompleteClient(profile) &&
        isValidEmergencyContact(profile.emergency_contact) ? (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <User className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-xs text-amber-600 uppercase tracking-wide">
                    Nombre
                  </p>
                  <p className="font-medium text-gray-900">
                    {profile.emergency_contact.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <Phone className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-xs text-amber-600 uppercase tracking-wide">
                    Teléfono
                  </p>
                  <p className="font-medium text-gray-900">
                    {profile.emergency_contact.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <Heart className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-xs text-amber-600 uppercase tracking-wide">
                    Relación
                  </p>
                  <p className="font-medium text-gray-900">
                    {profile.emergency_contact.relationship}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              No hay contacto de emergencia configurado
            </p>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent">
              Agregar Contacto
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
