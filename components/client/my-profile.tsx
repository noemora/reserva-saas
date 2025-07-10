'use client';

import { useState } from 'react';
import { useClientStore } from '@/lib/stores/client-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useClientData } from '@/hooks/use-client-data';
import type { CompleteClient, ProfileRow } from '@/types/database';
import {
  ProfileHeader,
  PersonalInformation,
  EmergencyContact,
  MedicalInformation,
  InsuranceInformation,
  Preferences,
  LoadingState,
  type EditFormData,
  createFormData,
  validateFormData,
  ProfileService,
  ProfileStateManager,
  isCompleteClient,
} from './my-profile/index';

export default function MyProfile() {
  const { setProfile } = useClientStore();
  const { profile: authProfile, updateProfile } = useAuthStore();
  const { profile: clientProfile, isLoading } = useClientData();
  const [isEditing, setIsEditing] = useState(false);

  // Use client profile (from database) if available, otherwise auth profile
  const profile: CompleteClient | ProfileRow | null =
    clientProfile || authProfile;

  const [formData, setFormData] = useState<EditFormData>(
    createFormData(profile)
  );

  const profileService = new ProfileService(setProfile, updateProfile);
  const stateManager = new ProfileStateManager(profileService, setIsEditing);

  const handleInputChange = (field: keyof EditFormData, value: string) => {
    setFormData((prev: EditFormData) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!profile) return;

    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      console.error('Validation errors:', validationErrors);
      return;
    }

    try {
      await stateManager.handleSave(profile, formData, isCompleteClient);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData(createFormData(profile));
    stateManager.handleCancel();
  };

  if (!profile || isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-gray-600 mt-2">
            Gestiona tu información personal y preferencias
          </p>
        </div>
      </div>

      {/* Profile Header Card */}
      <ProfileHeader
        profile={profile}
        formData={formData}
        isEditing={isEditing}
        onEdit={() => stateManager.handleEdit()}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <PersonalInformation
          profile={profile}
          formData={formData}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />

        {/* Emergency Contact */}
        <EmergencyContact profile={profile} />
      </div>

      {/* Medical Information */}
      <MedicalInformation profile={profile} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Insurance Information */}
        <InsuranceInformation profile={profile} />

        {/* Preferences */}
        <Preferences profile={profile} />
      </div>
    </div>
  );
}

export { MyProfile };
