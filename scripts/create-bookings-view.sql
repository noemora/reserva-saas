-- =====================================================
-- CREATE VIEW: bookings_with_details
-- Vista para obtener bookings con información relacionada
-- =====================================================

CREATE OR REPLACE VIEW public.bookings_with_details WITH (security_invoker=on) AS
SELECT 
    b.id,
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
    b.instructions,
    b.description,
    b.cancellation_reason,
    b.payment_status,
    b.payment_method,
    b.created_at,
    b.updated_at,
    
    -- Información del servicio
    s.name as service_name,
    s.category as service_category,
    
    -- Información del profesional
    p.name as professional_name,
    p.title as professional_title,
    p.specialties as professional_specialty,
    p.phone as professional_phone,
    p.email as professional_email,
    
    -- Información del lugar de trabajo
    w.name as workplace_name,
    w.address as workplace_address,
    w.phone as workplace_phone,
    w.email as workplace_email,
    
    -- Información de la empresa
    c.name as company_name,
    
    -- Información del cliente
    cl.name as client_name,
    cl.email as client_email,
    cl.phone as client_phone,
    
    -- Campos calculados para la UI
    CONCAT('$', b.price::text) as formatted_price,
    CONCAT(b.duration::text, ' min') as formatted_duration,
    TO_CHAR(b.booking_date, 'YYYY-MM-DD') as formatted_date,
    TO_CHAR(b.booking_time, 'HH24:MI') as formatted_time,
    
    -- Rating desde reviews (si existe)
    r.rating,
    r.comment as review_comment

FROM public.bookings b
LEFT JOIN public.services s ON b.service_id = s.id
LEFT JOIN public.professionals p ON b.professional_id = p.id
LEFT JOIN public.workplaces w ON b.workplace_id = w.id
LEFT JOIN public.companies c ON b.company_id = c.id
LEFT JOIN public.clients cl ON b.client_id = cl.id
LEFT JOIN public.reviews r ON b.id = r.booking_id;

-- Grant permissions
GRANT SELECT ON public.bookings_with_details TO authenticated;
