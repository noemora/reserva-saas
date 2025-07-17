-- Script para REVISAR registros huérfanos antes de eliminarlos
-- Ejecuta este script primero para ver exactamente qué datos se van a eliminar

-- 1. Mostrar bookings huérfanos
SELECT 'BOOKINGS with orphaned client_id:' as info;
SELECT b.* FROM public.bookings b
LEFT JOIN public.clients c ON b.client_id = c.id
WHERE c.id IS NULL;

SELECT 'BOOKINGS with orphaned professional_id:' as info;
SELECT b.* FROM public.bookings b
LEFT JOIN public.professionals p ON b.professional_id = p.id
WHERE p.id IS NULL;

SELECT 'BOOKINGS with orphaned company_id:' as info;
SELECT b.* FROM public.bookings b
LEFT JOIN public.companies c ON b.company_id = c.id
WHERE b.company_id IS NOT NULL AND c.id IS NULL;

-- 2. Mostrar company_schedules huérfanos
SELECT 'COMPANY_SCHEDULES with orphaned company_id:' as info;
SELECT cs.* FROM public.company_schedules cs
LEFT JOIN public.companies c ON cs.company_id = c.id
WHERE c.id IS NULL;

-- 3. Mostrar professional_workplaces huérfanos
SELECT 'PROFESSIONAL_WORKPLACES with orphaned professional_id:' as info;
SELECT pw.* FROM public.professional_workplaces pw
LEFT JOIN public.professionals p ON pw.professional_id = p.id
WHERE p.id IS NULL;

-- 4. Mostrar professionals huérfanos
SELECT 'PROFESSIONALS with orphaned company_id:' as info;
SELECT p.* FROM public.professionals p
LEFT JOIN public.companies c ON p.company_id = c.id
WHERE p.company_id IS NOT NULL AND c.id IS NULL;

-- 5. Mostrar reviews huérfanos
SELECT 'REVIEWS with orphaned client_id:' as info;
SELECT r.* FROM public.reviews r
LEFT JOIN public.clients c ON r.client_id = c.id
WHERE c.id IS NULL;

SELECT 'REVIEWS with orphaned professional_id:' as info;
SELECT r.* FROM public.reviews r
LEFT JOIN public.professionals p ON r.professional_id = p.id
WHERE p.id IS NULL;

-- 6. Mostrar services huérfanos
SELECT 'SERVICES with orphaned professional_id:' as info;
SELECT s.* FROM public.services s
LEFT JOIN public.professionals p ON s.professional_id = p.id
WHERE p.id IS NULL;

-- 7. Mostrar workplaces huérfanos
SELECT 'WORKPLACES with orphaned company_id:' as info;
SELECT w.* FROM public.workplaces w
LEFT JOIN public.companies c ON w.company_id = c.id
WHERE w.company_id IS NOT NULL AND c.id IS NULL;
