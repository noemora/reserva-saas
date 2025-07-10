// Profile header component following Single Responsibility Principle

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Edit3, Save, X, Calendar, Camera } from 'lucide-react';

import type { ProfileHeaderProps } from './types';
import {
  ProfileDataService,
  AgeCalculatorService,
  isCompleteClient,
} from './utils';

export function ProfileHeader({
  profile,
  formData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: ProfileHeaderProps) {
  const displayName = ProfileDataService.getDisplayName(profile);
  const initials = ProfileDataService.getInitials(displayName);

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src={profile.avatar_url || formData.avatar_url} />
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white shadow-md"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
            <p className="text-gray-600 mt-1">{profile.email}</p>
            <div className="flex items-center gap-4 mt-3">
              <Badge variant="secondary" className="bg-white/50">
                <User className="w-3 h-3 mr-1" />
                Cliente
              </Badge>
              {isCompleteClient(profile) && profile.date_of_birth && (
                <Badge variant="outline" className="bg-white/50">
                  <Calendar className="w-3 h-3 mr-1" />
                  {AgeCalculatorService.calculateAge(
                    profile.date_of_birth
                  )}{' '}
                  años
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={onSave}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </>
            ) : (
              <Button
                onClick={onEdit}
                variant="outline"
                className="bg-white/50"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
