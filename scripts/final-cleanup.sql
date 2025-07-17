-- Script para limpiar el último registro huérfano
-- Solo queda 1 registro huérfano en professional_workplaces

-- Eliminar el último registro huérfano en professional_workplaces
DELETE FROM public.professional_workplaces 
WHERE professional_id NOT IN (SELECT id FROM public.professionals);

-- Verificar que ya no quedan registros huérfanos
SELECT 'Verification after final cleanup' as status;

SELECT 'Orphaned professional_id in professional_workplaces' as issue, count(*) as count
FROM public.professional_workplaces pw
LEFT JOIN public.professionals p ON pw.professional_id = p.id
WHERE p.id IS NULL;

-- Verificar conteo final de todas las tablas
SELECT 'clients' as table_name, count(*) as total_records FROM public.clients
UNION ALL
SELECT 'professionals' as table_name, count(*) as total_records FROM public.professionals
UNION ALL
SELECT 'companies' as table_name, count(*) as total_records FROM public.companies
UNION ALL
SELECT 'bookings' as table_name, count(*) as total_records FROM public.bookings
UNION ALL
SELECT 'services' as table_name, count(*) as total_records FROM public.services
UNION ALL
SELECT 'workplaces' as table_name, count(*) as total_records FROM public.workplaces
UNION ALL
SELECT 'reviews' as table_name, count(*) as total_records FROM public.reviews
UNION ALL
SELECT 'company_schedules' as table_name, count(*) as total_records FROM public.company_schedules
UNION ALL
SELECT 'professional_workplaces' as table_name, count(*) as total_records FROM public.professional_workplaces
ORDER BY table_name;
