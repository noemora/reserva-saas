-- Script para actualizar la función trigger de registro de usuarios
-- Ejecutar esto en Supabase SQL Editor

-- Primero eliminar el trigger existente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Eliminar la función existente
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Crear la función actualizada que maneja mejor los metadatos
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id, 
        email, 
        full_name,
        phone,
        user_type,
        avatar_url,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.raw_user_meta_data->>'phone',
        COALESCE(NEW.raw_user_meta_data->>'user_type', 'Cliente'),
        NEW.raw_user_meta_data->>'avatar_url',
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recrear el trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Verificar que la tabla profiles tenga la estructura correcta
DO $$
BEGIN
    -- Verificar si la columna user_type tiene el constraint correcto
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname LIKE '%user_type%' 
        AND conrelid = 'public.profiles'::regclass::oid
    ) THEN
        ALTER TABLE public.profiles 
        ADD CONSTRAINT profiles_user_type_check 
        CHECK (user_type IN ('Cliente', 'Profesional', 'Empresa'));
    END IF;
END
$$;

-- Verificar la configuración RLS
SELECT 
    schemaname, 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- Mostrar las políticas existentes
SELECT 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual, 
    with_check 
FROM pg_policies 
WHERE tablename = 'profiles';
