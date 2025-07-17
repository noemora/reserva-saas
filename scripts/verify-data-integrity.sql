-- Script to verify data integrity before adding foreign keys
-- Run this script first to check for any potential issues

-- 1. Check for orphaned records in bookings table
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

-- 2. Check for orphaned records in company_schedules table
SELECT 'Orphaned company_id in company_schedules' as issue, count(*) as count
FROM public.company_schedules cs
LEFT JOIN public.companies c ON cs.company_id = c.id
WHERE c.id IS NULL;

-- 3. Check for orphaned records in professional_workplaces table
SELECT 'Orphaned professional_id in professional_workplaces' as issue, count(*) as count
FROM public.professional_workplaces pw
LEFT JOIN public.professionals p ON pw.professional_id = p.id
WHERE p.id IS NULL;

-- 4. Check for orphaned records in professionals table
SELECT 'Orphaned company_id in professionals' as issue, count(*) as count
FROM public.professionals p
LEFT JOIN public.companies c ON p.company_id = c.id
WHERE p.company_id IS NOT NULL AND c.id IS NULL;

-- 5. Check for orphaned records in reviews table
SELECT 'Orphaned client_id in reviews' as issue, count(*) as count
FROM public.reviews r
LEFT JOIN public.clients c ON r.client_id = c.id
WHERE c.id IS NULL;

SELECT 'Orphaned professional_id in reviews' as issue, count(*) as count
FROM public.reviews r
LEFT JOIN public.professionals p ON r.professional_id = p.id
WHERE p.id IS NULL;

-- 6. Check for orphaned records in services table
SELECT 'Orphaned professional_id in services' as issue, count(*) as count
FROM public.services s
LEFT JOIN public.professionals p ON s.professional_id = p.id
WHERE p.id IS NULL;

-- 7. Check for orphaned records in workplaces table
SELECT 'Orphaned company_id in workplaces' as issue, count(*) as count
FROM public.workplaces w
LEFT JOIN public.companies c ON w.company_id = c.id
WHERE w.company_id IS NOT NULL AND c.id IS NULL;

-- Show a summary of all tables and their record counts
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
