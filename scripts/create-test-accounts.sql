-- Script para crear cuentas de prueba
-- IMPORTANTE: Primero debes crear estas cuentas en Supabase Auth Dashboard
-- o usar el registro normal, luego ejecutar este script para completar los perfiles

-- Insertar perfiles de prueba (reemplaza los UUIDs con los reales de auth.users)
-- Estos son ejemplos, necesitas los UUIDs reales después del registro

INSERT INTO public.profiles (id, email, full_name, phone, user_type, created_at, updated_at)
VALUES 
  -- Reemplaza estos UUIDs con los reales después de crear las cuentas
  ('00000000-0000-0000-0000-000000000001', 'doctor@clinica.com', 'Dr. Juan Pérez', '+1234567890', 'Profesional', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'maria@email.com', 'María García', '+0987654321', 'Cliente', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'admin@clinicacentro.com', 'Admin Clínica Centro', '+1122334455', 'Empresa', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  user_type = EXCLUDED.user_type,
  updated_at = NOW();
