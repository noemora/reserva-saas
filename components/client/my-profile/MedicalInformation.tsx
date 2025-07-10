'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Heart, AlertTriangle, Pill } from 'lucide-react';
import type { CompleteClient, ProfileRow } from '@/types/database';
import { isCompleteClient } from './utils';

interface MedicalInformationProps {
  profile: CompleteClient | ProfileRow | null;
}

export function MedicalInformation({ profile }: MedicalInformationProps) {
  const hasMedicalHistory =
    isCompleteClient(profile) &&
    profile.medical_history &&
    profile.medical_history.length > 0;

  const hasAllergies =
    isCompleteClient(profile) &&
    profile.allergies &&
    profile.allergies.length > 0;

  const hasMedications =
    isCompleteClient(profile) &&
    profile.current_medications &&
    profile.current_medications.length > 0;

  const hasAnyMedicalInfo = hasMedicalHistory || hasAllergies || hasMedications;

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-red-600" />
          Información Médica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {hasMedicalHistory && isCompleteClient(profile) && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Historial Médico
            </Label>
            <div className="flex flex-wrap gap-2">
              {profile.medical_history!.map(
                (condition: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {condition}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}

        {hasAllergies && isCompleteClient(profile) && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Alergias
            </Label>
            <div className="flex flex-wrap gap-2">
              {profile.allergies!.map((allergy: string, index: number) => (
                <Badge
                  key={index}
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {hasMedications && isCompleteClient(profile) && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Medicamentos Actuales
            </Label>
            <div className="flex flex-wrap gap-2">
              {profile.current_medications!.map(
                (medication: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <Pill className="h-3 w-3 mr-1" />
                    {medication}
                  </Badge>
                )
              )}
            </div>
          </div>
        )}

        {!hasAnyMedicalInfo && (
          <div className="text-center py-8">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              No hay información médica registrada
            </p>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent">
              Agregar Información
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
