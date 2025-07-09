-- Script de prueba para el circuito de registro
-- Este script se puede ejecutar en Supabase SQL Editor para verificar que todo funciona

-- 1. Verificar que la tabla profiles existe y tiene la estructura correcta
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 2. Verificar que RLS está habilitado
SELECT 
    schemaname, 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- 3. Verificar las políticas RLS
SELECT 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- 4. Verificar que la función trigger existe
SELECT 
    routine_name, 
    routine_type, 
    routine_definition
FROM information_schema.routines
WHERE routine_name = 'handle_new_user';

-- 5. Verificar que el trigger existe
SELECT 
    trigger_name, 
    event_manipulation, 
    event_object_table, 
    action_timing, 
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 6. Verificar datos existentes en profiles (opcional)
SELECT COUNT(*) as total_profiles FROM public.profiles;

-- 7. Verificar tipos de usuario únicos
SELECT 
    user_type, 
    COUNT(*) as count 
FROM public.profiles 
GROUP BY user_type;

-- Nota: Para probar el registro completo:
-- 1. Ejecutar este script para verificar la configuración
-- 2. Usar la aplicación web para registrar un nuevo usuario
-- 3. Verificar que se crea correctamente en auth.users y public.profiles
-- 4. Verificar que todos los campos de metadata se guardan correctamente
