// Business logic utilities following Single Responsibility Principle (SRP)

import type { CompleteClient, ProfileRow } from '@/types/database';
import type { ProfileFormData } from './types';

// Type guard utility - Single responsibility: type checking
export const isCompleteClient = (
  prof: CompleteClient | ProfileRow | null
): prof is CompleteClient => {
  return prof !== null && 'date_of_birth' in prof;
};

// Profile data utilities - Single responsibility: data transformation
export class ProfileDataService {
  static getDisplayName(profile: CompleteClient | ProfileRow): string {
    return isCompleteClient(profile)
      ? profile.name
      : profile.full_name || 'Usuario';
  }

  static getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  static createFormData(
    profile: CompleteClient | ProfileRow | null
  ): ProfileFormData {
    if (!profile) {
      return {
        name: '',
        phone: '',
        email: '',
        avatar_url: '',
      };
    }

    return {
      name: isCompleteClient(profile) ? profile.name : profile.full_name || '',
      phone: profile.phone || '',
      email: profile.email || '',
      avatar_url: profile.avatar_url || '',
    };
  }

  static createResetFormData(
    clientProfile: CompleteClient | null,
    authProfile: ProfileRow | null
  ): ProfileFormData {
    return {
      name:
        clientProfile && isCompleteClient(clientProfile)
          ? clientProfile.name
          : authProfile?.full_name || '',
      phone: clientProfile?.phone || authProfile?.phone || '',
      email: clientProfile?.email || authProfile?.email || '',
      avatar_url: clientProfile?.avatar_url || '',
    };
  }
}

// Age calculation utility - Single responsibility: age calculation
export class AgeCalculatorService {
  static calculateAge(dateOfBirth: string): number {
    return new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  }
}

// Validation utilities - Single responsibility: validation
export class ProfileValidationService {
  static validateFormData(formData: ProfileFormData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push('El nombre es requerido');
    }

    if (!formData.email.trim()) {
      errors.push('El email es requerido');
    } else if (!this.isValidEmail(formData.email)) {
      errors.push('El email no tiene un formato válido');
    }

    if (formData.phone && !this.isValidPhone(formData.phone)) {
      errors.push('El teléfono no tiene un formato válido');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }
}

// Convenience functions for compatibility
export const createFormData = (
  profile: CompleteClient | ProfileRow | null
): ProfileFormData => {
  return ProfileDataService.createFormData(profile);
};

export const validateFormData = (formData: ProfileFormData): string[] => {
  const result = ProfileValidationService.validateFormData(formData);
  return result.errors;
};
