-- Script de verificación para las actions corregidas
-- Ejecuta estos queries para verificar que las actions funcionan correctamente

-- 1. Verificar que las vistas complete_* funcionan correctamente
SELECT 'Testing complete_clients view' as test;
SELECT user_id, full_name, email, client_id FROM public.complete_clients LIMIT 5;

SELECT 'Testing complete_professionals view' as test;
SELECT user_id, full_name, email, professional_id, company_name FROM public.complete_professionals LIMIT 5;

SELECT 'Testing complete_companies view' as test;
SELECT user_id, full_name, email, company_id FROM public.complete_companies LIMIT 5;

SELECT 'Testing complete_services view' as test;
SELECT service_id, name, professional_name, workplace_name FROM public.complete_services LIMIT 5;

SELECT 'Testing complete_bookings view' as test;
SELECT booking_id, client_name, professional_name, service_name, booking_date, booking_time FROM public.complete_bookings LIMIT 5;

-- 2. Verificar que las consultas de las actions funcionan correctamente
SELECT 'Testing booking queries with proper joins' as test;
SELECT 
  b.*,
  c.id as client_id,
  cp.full_name as client_name,
  cp.email as client_email,
  cp.phone as client_phone,
  p.id as professional_id,
  pp.full_name as professional_name,
  p.title as professional_title,
  s.name as service_name,
  w.name as workplace_name
FROM public.bookings b
LEFT JOIN public.clients c ON b.client_id = c.id
LEFT JOIN public.profiles cp ON c.user_id = cp.id
LEFT JOIN public.professionals p ON b.professional_id = p.id
LEFT JOIN public.profiles pp ON p.user_id = pp.id
LEFT JOIN public.services s ON b.service_id = s.id
LEFT JOIN public.workplaces w ON b.workplace_id = w.id
LIMIT 5;

-- 3. Verificar que las foreign keys funcionan correctamente
SELECT 'Testing foreign key constraints' as test;
SELECT 
  COUNT(*) as total_bookings,
  COUNT(DISTINCT b.client_id) as distinct_clients,
  COUNT(DISTINCT b.professional_id) as distinct_professionals,
  COUNT(DISTINCT b.service_id) as distinct_services,
  COUNT(DISTINCT b.workplace_id) as distinct_workplaces
FROM public.bookings b;

-- 4. Verificar que los campos de fecha están correctos
SELECT 'Testing date fields' as test;
SELECT 
  booking_date,
  booking_time,
  created_at,
  updated_at
FROM public.bookings 
LIMIT 3;

-- 5. Verificar que los servicios tienen las relaciones correctas
SELECT 'Testing service relationships' as test;
SELECT 
  s.name as service_name,
  p.title as professional_title,
  pp.full_name as professional_name,
  w.name as workplace_name
FROM public.services s
LEFT JOIN public.professionals p ON s.professional_id = p.id
LEFT JOIN public.profiles pp ON p.user_id = pp.id
LEFT JOIN public.workplaces w ON s.workplace_id = w.id
LIMIT 5;
