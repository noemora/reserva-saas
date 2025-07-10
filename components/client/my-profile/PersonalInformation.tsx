// Personal information component following Single Responsibility Principle

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, Mail, MapPin } from 'lucide-react';

import type { ProfileDisplayProps } from './types';
import { ProfileDataService, isCompleteClient } from './utils';

export function PersonalInformation({
  profile,
  isEditing,
  formData,
  onInputChange,
}: Pick<
  ProfileDisplayProps,
  'profile' | 'isEditing' | 'formData' | 'onInputChange'
>) {
  const displayName = ProfileDataService.getDisplayName(profile);

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-blue-600" />
          Información Personal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre Completo
            </Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                className="border-gray-200 focus:border-blue-500"
              />
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">
                  {displayName || 'No especificado'}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Teléfono
            </Label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
                className="border-gray-200 focus:border-blue-500"
              />
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="font-medium">
                  {profile.phone || 'No especificado'}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{profile.email}</span>
            </div>
          </div>

          {isCompleteClient(profile) && profile.address && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Dirección
              </Label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{profile.address}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
