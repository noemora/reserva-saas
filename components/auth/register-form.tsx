'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { toast } from 'sonner';
import {
  formatAuthError,
  validateEmail,
  validatePassword,
  validatePhone,
  validateFullName,
  sanitizeUserData,
} from '@/lib/auth-utils';

export function RegisterForm() {
  const router = useRouter();
  const { signUp, loading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    userType: '' as 'Cliente' | 'Profesional' | 'Empresa' | '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones mejoradas
    if (
      !formData.email ||
      !formData.password ||
      !formData.fullName ||
      !formData.userType
    ) {
      setError('Por favor, completa todos los campos obligatorios');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Por favor, ingresa un email válido');
      return;
    }

    if (!validateFullName(formData.fullName)) {
      setError('El nombre debe tener al menos 2 caracteres');
      return;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      setError('Por favor, ingresa un número de teléfono válido');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message || 'Contraseña inválida');
      return;
    }

    // Sanitizar datos antes de enviar
    const sanitizedData = sanitizeUserData({
      email: formData.email,
      fullName: formData.fullName,
      phone: formData.phone,
    });

    const { error } = await signUp(sanitizedData.email, formData.password, {
      full_name: sanitizedData.fullName,
      phone: sanitizedData.phone || '',
      user_type: formData.userType,
      avatar_url: null,
    });

    if (error) {
      const errorMessage = formatAuthError(
        error.message || 'Error al crear la cuenta'
      );
      setError(errorMessage);
      toast.error(errorMessage);
    } else {
      toast.success('¡Cuenta creada exitosamente!');
      router.push('/auth/login');
    }
  };

  const handleQuickRegister = async (
    type: 'Cliente' | 'Profesional' | 'Empresa'
  ) => {
    const quickData = {
      Cliente: {
        email: 'cliente.demo@example.com',
        password: '123456',
        fullName: 'Cliente de Prueba',
        phone: '+1234567890',
        userType: 'Cliente' as const,
      },
      Profesional: {
        email: 'profesional.demo@example.com',
        password: '123456',
        fullName: 'Dr. Profesional de Prueba',
        phone: '+1234567891',
        userType: 'Profesional' as const,
      },
      Empresa: {
        email: 'empresa.demo@example.com',
        password: '123456',
        fullName: 'Empresa de Prueba',
        phone: '+1234567892',
        userType: 'Empresa' as const,
      },
    };

    const data = quickData[type];

    const { error } = await signUp(data.email, data.password, {
      full_name: data.fullName,
      phone: data.phone,
      user_type: data.userType,
      avatar_url: null,
    });

    if (error) {
      const errorMessage = formatAuthError(
        error.message || 'Error al crear la cuenta'
      );
      setError(errorMessage);
      toast.error(errorMessage);
    } else {
      toast.success(`¡Cuenta de ${type} creada exitosamente!`);
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Crear Cuenta
          </CardTitle>
          <CardDescription className="text-center">
            Completa los datos para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuario *</Label>
              <Select
                value={formData.userType}
                onValueChange={(value: 'Cliente' | 'Profesional' | 'Empresa') =>
                  setFormData({ ...formData, userType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cliente">Cliente</SelectItem>
                  <SelectItem value="Profesional">Profesional</SelectItem>
                  <SelectItem value="Empresa">Empresa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña *</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Crear Cuenta
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Crear cuenta rápida
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              onClick={() => handleQuickRegister('Cliente')}
              disabled={loading}
              className="w-full"
            >
              Crear cuenta de Cliente
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickRegister('Profesional')}
              disabled={loading}
              className="w-full"
            >
              Crear cuenta de Profesional
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickRegister('Empresa')}
              disabled={loading}
              className="w-full"
            >
              Crear cuenta de Empresa
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm text-gray-600 w-full">
            ¿Ya tienes cuenta?{' '}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => router.push('/auth/login')}
            >
              Inicia sesión aquí
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
