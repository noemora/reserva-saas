-- Script to create views and indexes needed for the UI
-- Run this script after fixing the foreign keys

-- Drop existing views first to avoid conflicts
DROP VIEW IF EXISTS public.complete_clients CASCADE;
DROP VIEW IF EXISTS public.complete_professionals CASCADE;
DROP VIEW IF EXISTS public.complete_companies CASCADE;
DROP VIEW IF EXISTS public.complete_bookings CASCADE;
DROP VIEW IF EXISTS public.complete_services CASCADE;

-- Create view for complete client data (profile + client info)
CREATE VIEW public.complete_clients AS
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.phone,
    p.user_type,
    p.avatar_url,
    p.created_at as profile_created_at,
    p.updated_at as profile_updated_at,
    c.id as client_id,
    c.date_of_birth,
    c.address,
    c.emergency_contact,
    c.medical_history,
    c.allergies,
    c.current_medications,
    c.insurance_provider,
    c.insurance_number,
    c.preferred_language,
    c.communication_preferences,
    c.created_at as client_created_at,
    c.updated_at as client_updated_at
FROM public.profiles p
LEFT JOIN public.clients c ON p.id = c.user_id
WHERE p.user_type = 'Cliente';

-- Create view for complete professional data (profile + professional info)
CREATE VIEW public.complete_professionals AS
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.phone,
    p.user_type,
    p.avatar_url,
    p.created_at as profile_created_at,
    p.updated_at as profile_updated_at,
    pr.id as professional_id,
    pr.company_id,
    pr.title,
    pr.license_number,
    pr.experience,
    pr.education,
    pr.specialties,
    pr.biography,
    pr.rating,
    pr.total_bookings,
    pr.monthly_revenue,
    pr.is_active,
    pr.member_since,
    pr.created_at as professional_created_at,
    pr.updated_at as professional_updated_at,
    c.full_name as company_name
FROM public.profiles p
LEFT JOIN public.professionals pr ON p.id = pr.user_id
LEFT JOIN public.companies comp ON pr.company_id = comp.id
LEFT JOIN public.profiles c ON comp.user_id = c.id
WHERE p.user_type = 'Profesional';

-- Create view for complete company data (profile + company info)
CREATE VIEW public.complete_companies AS
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.phone,
    p.user_type,
    p.avatar_url,
    p.created_at as profile_created_at,
    p.updated_at as profile_updated_at,
    comp.id as company_id,
    comp.address,
    comp.website,
    comp.capacity,
    comp.founded_year,
    comp.description,
    comp.services,
    comp.logo_url,
    comp.rating,
    comp.total_bookings,
    comp.monthly_revenue,
    comp.is_active,
    comp.created_at as company_created_at,
    comp.updated_at as company_updated_at
FROM public.profiles p
LEFT JOIN public.companies comp ON p.id = comp.user_id
WHERE p.user_type = 'Empresa';

-- Create view for complete booking data with related information
CREATE VIEW public.complete_bookings AS
SELECT 
    b.id as booking_id,
    b.client_id,
    b.professional_id,
    b.service_id,
    b.workplace_id,
    b.company_id,
    b.booking_date,
    b.booking_time,
    b.duration,
    b.price,
    b.status,
    b.notes,
    b.cancellation_reason,
    b.payment_status,
    b.payment_method,
    b.instructions,
    b.description,
    b.created_at,
    b.updated_at,
    -- Client info
    client_profile.full_name as client_name,
    client_profile.email as client_email,
    client_profile.phone as client_phone,
    -- Professional info
    prof_profile.full_name as professional_name,
    prof.title as professional_title,
    prof.specialties as professional_specialties,
    -- Service info
    s.name as service_name,
    s.description as service_description,
    s.category as service_category,
    s.image_url as service_image_url,
    s.color as service_color,
    -- Workplace info
    w.name as workplace_name,
    w.address as workplace_address,
    w.phone as workplace_phone,
    w.email as workplace_email,
    -- Company info
    comp_profile.full_name as company_name
FROM public.bookings b
LEFT JOIN public.clients c ON b.client_id = c.id
LEFT JOIN public.profiles client_profile ON c.user_id = client_profile.id
LEFT JOIN public.professionals prof ON b.professional_id = prof.id
LEFT JOIN public.profiles prof_profile ON prof.user_id = prof_profile.id
LEFT JOIN public.services s ON b.service_id = s.id
LEFT JOIN public.workplaces w ON b.workplace_id = w.id
LEFT JOIN public.companies comp ON b.company_id = comp.id
LEFT JOIN public.profiles comp_profile ON comp.user_id = comp_profile.id;

-- Create view for services with related information
CREATE VIEW public.complete_services AS
SELECT 
    s.id as service_id,
    s.professional_id,
    s.workplace_id,
    s.name,
    s.description,
    s.duration,
    s.price,
    s.category,
    s.is_active,
    s.schedule,
    s.tags,
    s.requirements,
    s.preparation_time,
    s.cleanup_time,
    s.max_bookings_per_day,
    s.booking_window_days,
    s.image_url,
    s.color,
    s.created_at,
    s.updated_at,
    -- Professional info
    prof_profile.full_name as professional_name,
    prof.title as professional_title,
    prof.specialties as professional_specialties,
    prof.experience as professional_experience,
    prof.rating as professional_rating,
    -- Workplace info
    w.name as workplace_name,
    w.address as workplace_address,
    w.phone as workplace_phone,
    w.email as workplace_email,
    -- Company info
    comp_profile.full_name as company_name
FROM public.services s
LEFT JOIN public.professionals prof ON s.professional_id = prof.id
LEFT JOIN public.profiles prof_profile ON prof.user_id = prof_profile.id
LEFT JOIN public.workplaces w ON s.workplace_id = w.id
LEFT JOIN public.companies comp ON w.company_id = comp.id
LEFT JOIN public.profiles comp_profile ON comp.user_id = comp_profile.id;

-- Create useful indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON public.bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_professional_id ON public.bookings(professional_id);
CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON public.bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_workplace_id ON public.bookings(workplace_id);
CREATE INDEX IF NOT EXISTS idx_bookings_company_id ON public.bookings(company_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON public.bookings(booking_date, booking_time);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

CREATE INDEX IF NOT EXISTS idx_services_professional_id ON public.services(professional_id);
CREATE INDEX IF NOT EXISTS idx_services_workplace_id ON public.services(workplace_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);

CREATE INDEX IF NOT EXISTS idx_professionals_company_id ON public.professionals(company_id);
CREATE INDEX IF NOT EXISTS idx_professionals_active ON public.professionals(is_active);

CREATE INDEX IF NOT EXISTS idx_workplaces_company_id ON public.workplaces(company_id);
CREATE INDEX IF NOT EXISTS idx_workplaces_active ON public.workplaces(is_active);

CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Grant permissions to views
GRANT SELECT ON public.complete_clients TO authenticated;
GRANT SELECT ON public.complete_professionals TO authenticated;
GRANT SELECT ON public.complete_companies TO authenticated;
GRANT SELECT ON public.complete_bookings TO authenticated;
GRANT SELECT ON public.complete_services TO authenticated;
