-- Script para limpiar registros huérfanos antes de agregar foreign keys
-- IMPORTANTE: Este script eliminará datos que no tienen referencias válidas
-- Ejecuta este script paso a paso y verifica cada resultado

-- 1. Limpiar registros huérfanos en bookings
-- Eliminar bookings con client_id que no existe (2 registros)
DELETE FROM public.bookings 
WHERE client_id NOT IN (SELECT id FROM public.clients);

-- Eliminar bookings con professional_id que no existe (1 registro)
DELETE FROM public.bookings 
WHERE professional_id NOT IN (SELECT id FROM public.professionals);

-- Eliminar bookings con company_id que no existe (1 registro)
DELETE FROM public.bookings 
WHERE company_id IS NOT NULL 
AND company_id NOT IN (SELECT id FROM public.companies);

-- 2. Limpiar registros huérfanos en company_schedules
-- Eliminar company_schedules con company_id que no existe (7 registros)
DELETE FROM public.company_schedules 
WHERE company_id NOT IN (SELECT id FROM public.companies);

-- 3. Limpiar registros huérfanos en professional_workplaces
-- Eliminar professional_workplaces con professional_id que no existe (1 registro)
DELETE FROM public.professional_workplaces 
WHERE professional_id NOT IN (SELECT id FROM public.professionals);

-- 4. Limpiar registros huérfanos en professionals
-- Eliminar professionals con company_id que no existe (1 registro)
DELETE FROM public.professionals 
WHERE company_id IS NOT NULL 
AND company_id NOT IN (SELECT id FROM public.companies);

-- 5. Limpiar registros huérfanos en reviews
-- Eliminar reviews con client_id que no existe (1 registro)
DELETE FROM public.reviews 
WHERE client_id NOT IN (SELECT id FROM public.clients);

-- Eliminar reviews con professional_id que no existe (1 registro)
DELETE FROM public.reviews 
WHERE professional_id NOT IN (SELECT id FROM public.professionals);

-- 6. Limpiar registros huérfanos en services
-- Eliminar services con professional_id que no existe (2 registros)
DELETE FROM public.services 
WHERE professional_id NOT IN (SELECT id FROM public.professionals);

-- 7. Limpiar registros huérfanos en workplaces
-- Eliminar workplaces con company_id que no existe (1 registro)
DELETE FROM public.workplaces 
WHERE company_id IS NOT NULL 
AND company_id NOT IN (SELECT id FROM public.companies);

-- Verificar que no quedan registros huérfanos
SELECT 'Verification after cleanup' as status;

-- Verificar bookings
SELECT 'Orphaned client_id in bookings' as issue, count(*) as count
FROM public.bookings b
LEFT JOIN public.clients c ON b.client_id = c.id
WHERE c.id IS NULL;

SELECT 'Orphaned professional_id in bookings' as issue, count(*) as count
FROM public.bookings b
LEFT JOIN public.professionals p ON b.professional_id = p.id
WHERE p.id IS NULL;

SELECT 'Orphaned company_id in bookings' as issue, count(*) as count
FROM public.bookings b
LEFT JOIN public.companies c ON b.company_id = c.id
WHERE b.company_id IS NOT NULL AND c.id IS NULL;

-- Verificar company_schedules
SELECT 'Orphaned company_id in company_schedules' as issue, count(*) as count
FROM public.company_schedules cs
LEFT JOIN public.companies c ON cs.company_id = c.id
WHERE c.id IS NULL;

-- Verificar professional_workplaces
SELECT 'Orphaned professional_id in professional_workplaces' as issue, count(*) as count
FROM public.professional_workplaces pw
LEFT JOIN public.professionals p ON pw.professional_id = p.id
WHERE p.id IS NULL;

-- Verificar professionals
SELECT 'Orphaned company_id in professionals' as issue, count(*) as count
FROM public.professionals p
LEFT JOIN public.companies c ON p.company_id = c.id
WHERE p.company_id IS NOT NULL AND c.id IS NULL;

-- Verificar reviews
SELECT 'Orphaned client_id in reviews' as issue, count(*) as count
FROM public.reviews r
LEFT JOIN public.clients c ON r.client_id = c.id
WHERE c.id IS NULL;

SELECT 'Orphaned professional_id in reviews' as issue, count(*) as count
FROM public.reviews r
LEFT JOIN public.professionals p ON r.professional_id = p.id
WHERE p.id IS NULL;

-- Verificar services
SELECT 'Orphaned professional_id in services' as issue, count(*) as count
FROM public.services s
LEFT JOIN public.professionals p ON s.professional_id = p.id
WHERE p.id IS NULL;

-- Verificar workplaces
SELECT 'Orphaned company_id in workplaces' as issue, count(*) as count
FROM public.workplaces w
LEFT JOIN public.companies c ON w.company_id = c.id
WHERE w.company_id IS NOT NULL AND c.id IS NULL;
