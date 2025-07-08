-- =====================================================
-- CREATE SERVICES VIEW WITH RELATED DATA
-- Vista que expone servicios con información de profesional y lugar
-- =====================================================

CREATE OR REPLACE VIEW public.services_with_details AS
SELECT 
    s.id,
    s.professional_id,
    s.workplace_id,
    s.name,
    s.description,
    s.duration,
    s.price,
    s.category,
    s.schedule,
    s.tags,
    s.requirements,
    s.preparation_time,
    s.cleanup_time,
    s.max_bookings_per_day,
    s.booking_window_days,
    s.image_url,
    s.color,
    s.is_active,
    s.created_at,
    s.updated_at,
    
    -- Professional details
    p.name as professional_name,
    p.title as professional_title,
    p.email as professional_email,
    p.phone as professional_phone,
    p.specialties as professional_specialties,
    p.rating as professional_rating,
    p.experience as professional_experience,
    p.avatar_url as professional_avatar,
    
    -- Workplace details
    w.name as workplace_name,
    w.address as workplace_address,
    w.description as workplace_description,
    w.phone as workplace_phone,
    w.email as workplace_email,
    
    -- Company details (through workplace)
    c.id as company_id,
    c.name as company_name
    
FROM public.services s
INNER JOIN public.professionals p ON s.professional_id = p.id
INNER JOIN public.workplaces w ON s.workplace_id = w.id
LEFT JOIN public.companies c ON w.company_id = c.id
WHERE s.is_active = true;

-- Grant permissions
GRANT SELECT ON public.services_with_details TO authenticated;

-- Add RLS policy for the view
DROP POLICY IF EXISTS "services_with_details_select_policy" ON public.services_with_details;
-- Note: Views inherit RLS from underlying tables

-- Create indexes for performance (if not already exists)
CREATE INDEX IF NOT EXISTS idx_services_active_professional ON public.services(professional_id, is_active);
CREATE INDEX IF NOT EXISTS idx_services_active_workplace ON public.services(workplace_id, is_active);

COMMENT ON VIEW public.services_with_details IS 'Vista que combina servicios con información de profesional, lugar de trabajo y empresa para consultas optimizadas';
