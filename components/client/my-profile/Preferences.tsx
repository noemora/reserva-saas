'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Globe, Bell, Mail, Phone } from 'lucide-react';
import type { CompleteClient, ProfileRow } from '@/types/database';
import { isCompleteClient } from './utils';

interface PreferencesProps {
  profile: CompleteClient | ProfileRow | null;
}

export function Preferences({ profile }: PreferencesProps) {
  const hasLanguagePreference =
    isCompleteClient(profile) && profile.preferred_language;

  const hasCommunicationPreferences =
    isCompleteClient(profile) && profile.communication_preferences;

  const hasAnyPreferences =
    hasLanguagePreference || hasCommunicationPreferences;

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="h-5 w-5 text-purple-600" />
          Preferencias
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {hasLanguagePreference && isCompleteClient(profile) && (
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Globe className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-xs text-purple-600 uppercase tracking-wide">
                Idioma Preferido
              </p>
              <p className="font-medium text-gray-900">
                {profile.preferred_language}
              </p>
            </div>
          </div>
        )}

        {hasCommunicationPreferences &&
          isCompleteClient(profile) &&
          profile.communication_preferences && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-purple-600" />
                Preferencias de Comunicación
              </Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">
                      Notificaciones por Email
                    </span>
                  </div>
                  <Switch checked={profile.communication_preferences.email} />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">
                      Notificaciones por SMS
                    </span>
                  </div>
                  <Switch checked={profile.communication_preferences.sms} />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">
                      Llamadas Telefónicas
                    </span>
                  </div>
                  <Switch checked={profile.communication_preferences.phone} />
                </div>
              </div>
            </div>
          )}

        {!hasAnyPreferences && (
          <div className="text-center py-8">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No hay preferencias configuradas</p>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent">
              Configurar Preferencias
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
