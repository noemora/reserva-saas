// Utilidades para el manejo de autenticación y errores
import type { AuthError } from '@supabase/supabase-js';

export function formatAuthError(error: AuthError | string): string {
  if (typeof error === 'string') {
    return error;
  }

  // Mapear errores comunes de Supabase a mensajes en español
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': 'Email o contraseña incorrectos',
    'Email not confirmed':
      'Por favor confirma tu email antes de iniciar sesión',
    'User already registered': 'Este email ya está registrado',
    'Password should be at least 6 characters':
      'La contraseña debe tener al menos 6 caracteres',
    'Signup disabled': 'El registro está temporalmente deshabilitado',
    'Invalid email': 'El formato del email no es válido',
    'Email rate limit exceeded':
      'Demasiados intentos. Espera un momento antes de intentar nuevamente',
    'Database error saving new user':
      'Error al guardar el usuario en la base de datos',
    'User not found': 'Usuario no encontrado',
    'Email address is invalid':
      'La dirección de email no es válida. Usa un dominio real como @gmail.com',
    'only characters allowed':
      'Solo se permiten ciertos caracteres en el email',
    'must be a valid email': 'Debe ser un email válido',
  };

  return errorMessages[error.message] || error.message || 'Error desconocido';
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isBasicValid = emailRegex.test(email);

  // En desarrollo, permitir dominios de prueba adicionales
  if (process.env.NODE_ENV === 'development') {
    const developmentDomains = [
      '@example.com',
      '@test.local',
      '@localhost',
      '@dev.local',
    ];

    const isDevelopmentEmail = developmentDomains.some((domain) =>
      email.toLowerCase().endsWith(domain)
    );

    return isBasicValid || isDevelopmentEmail;
  }

  return isBasicValid;
}

export function validatePassword(password: string): {
  isValid: boolean;
  message?: string;
} {
  if (password.length < 6) {
    return {
      isValid: false,
      message: 'La contraseña debe tener al menos 6 caracteres',
    };
  }
  if (password.length > 72) {
    return {
      isValid: false,
      message: 'La contraseña no puede tener más de 72 caracteres',
    };
  }
  return { isValid: true };
}

export function validatePhone(phone: string): boolean {
  // Validación básica para números de teléfono internacionales
  const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;
  return !phone || phoneRegex.test(phone);
}

export function validateFullName(fullName: string): boolean {
  return fullName.trim().length >= 2;
}

export function sanitizeUserData(data: {
  email: string;
  fullName: string;
  phone?: string;
}) {
  return {
    email: data.email.trim().toLowerCase(),
    fullName: data.fullName.trim(),
    phone: data.phone?.trim() || null,
  };
}
