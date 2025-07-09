-- Script para configurar Supabase para desarrollo
-- Ejecutar en Supabase SQL Editor para facilitar el testing

-- 1. Ver la configuración actual de validación de email
SELECT name, setting 
FROM pg_settings 
WHERE name LIKE '%email%';

-- 2. Crear una función helper para testing que permite emails de prueba
CREATE OR REPLACE FUNCTION public.is_test_environment()
RETURNS boolean AS $$
BEGIN
    -- Cambia esto a false en producción
    RETURN true;
END;
$$ LANGUAGE plpgsql;

-- 3. Crear función para validar emails en desarrollo
CREATE OR REPLACE FUNCTION public.validate_test_email(email_input text)
RETURNS boolean AS $$
BEGIN
    -- En ambiente de prueba, permitir emails @example.com, @test.local, etc.
    IF public.is_test_environment() THEN
        RETURN (
            email_input ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
            OR email_input LIKE '%@example.com'
            OR email_input LIKE '%@test.local'
            OR email_input LIKE '%@localhost'
        );
    ELSE
        -- En producción, usar validación estricta
        RETURN email_input ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 4. Verificar que los usuarios de prueba no existan ya
SELECT email, created_at 
FROM auth.users 
WHERE email IN (
    'cliente.demo@example.com',
    'profesional.demo@example.com', 
    'empresa.demo@example.com'
);

-- 5. Si existen, mostrar sus IDs para poder eliminarlos si es necesario
-- (Descomenta las siguientes líneas si necesitas limpiar datos de prueba)

/*
-- Eliminar usuarios de prueba existentes (CUIDADO: Solo en desarrollo)
DELETE FROM auth.users 
WHERE email IN (
    'cliente.demo@example.com',
    'profesional.demo@example.com', 
    'empresa.demo@example.com'
);
*/

-- 6. Verificar configuración de confirmación de email
SELECT 
    raw_app_meta_data,
    email_confirmed_at,
    confirmation_sent_at
FROM auth.users 
WHERE email LIKE '%example.com'
LIMIT 5;
