// Types for the MyProfile component following Interface Segregation Principle (ISP)

import type { CompleteClient, ProfileRow } from '@/types/database';

// Segregated interfaces for different concerns
export interface ProfileFormData {
  name: string;
  phone: string;
  email: string;
  avatar_url: string;
}

// Alias for compatibility
export type EditFormData = ProfileFormData;

export interface ProfileDisplayProps {
  profile: CompleteClient | ProfileRow;
  isEditing: boolean;
  formData: ProfileFormData;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (field: keyof ProfileFormData, value: string) => void;
}

export interface MedicalInfoProps {
  profile: CompleteClient | ProfileRow;
}

export interface EmergencyContactProps {
  profile: CompleteClient | ProfileRow;
}

export interface InsuranceInfoProps {
  profile: CompleteClient | ProfileRow;
}

export interface PreferencesProps {
  profile: CompleteClient | ProfileRow;
}

export interface ProfileHeaderProps {
  profile: CompleteClient | ProfileRow;
  formData: ProfileFormData;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}
