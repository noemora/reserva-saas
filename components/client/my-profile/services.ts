// Profile management service following Dependency Inversion Principle (DIP)

import type { CompleteClient, ProfileRow } from '@/types/database';
import type { ProfileFormData } from './types';

// Abstract interface for profile operations (DIP)
export interface IProfileService {
  updateClientProfile(
    profile: CompleteClient,
    formData: ProfileFormData
  ): Promise<void>;
  updateAuthProfile(formData: ProfileFormData): Promise<void>;
}

// Concrete implementation of profile service
export class ProfileService implements IProfileService {
  constructor(
    private setProfile: (profile: CompleteClient | null) => void,
    private updateProfile: (data: Partial<ProfileRow>) => Promise<void>
  ) {}

  async updateClientProfile(
    profile: CompleteClient,
    formData: ProfileFormData
  ): Promise<void> {
    await this.setProfile({
      ...profile,
      full_name: formData.name,
      avatar_url: formData.avatar_url,
    });
  }

  async updateAuthProfile(formData: ProfileFormData): Promise<void> {
    const updateData = {
      avatar_url: formData.avatar_url,
      full_name: formData.name,
    };

    await this.updateProfile(updateData);
  }
}

// Profile state management following Single Responsibility Principle
export class ProfileStateManager {
  constructor(
    private profileService: IProfileService,
    private onStateChange: (isEditing: boolean) => void
  ) {}

  async handleSave(
    profile: CompleteClient | ProfileRow | null,
    formData: ProfileFormData,
    isCompleteClient: (
      prof: CompleteClient | ProfileRow | null
    ) => prof is CompleteClient
  ): Promise<void> {
    if (!profile) return;

    try {
      // Update client profile if it's a CompleteClient
      if (isCompleteClient(profile)) {
        await this.profileService.updateClientProfile(profile, formData);
      }

      // Always update auth profile
      await this.profileService.updateAuthProfile(formData);

      this.onStateChange(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  handleCancel(): void {
    this.onStateChange(false);
  }

  handleEdit(): void {
    this.onStateChange(true);
  }
}
