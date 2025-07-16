-- Script para agregar foreign keys después de la limpieza
-- Ejecuta este script SOLO después de confirmar que no quedan registros huérfanos

-- 1. Add foreign key for bookings.client_id
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_client_id_fkey 
FOREIGN KEY (client_id) REFERENCES public.clients(id);

-- 2. Add foreign key for bookings.professional_id
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_professional_id_fkey 
FOREIGN KEY (professional_id) REFERENCES public.professionals(id);

-- 3. Add foreign key for bookings.company_id
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.companies(id);

-- 4. Add foreign key for company_schedules.company_id
ALTER TABLE public.company_schedules 
ADD CONSTRAINT company_schedules_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.companies(id);

-- 5. Add foreign key for professional_workplaces.professional_id
ALTER TABLE public.professional_workplaces 
ADD CONSTRAINT professional_workplaces_professional_id_fkey 
FOREIGN KEY (professional_id) REFERENCES public.professionals(id);

-- 6. Add foreign key for professionals.company_id
ALTER TABLE public.professionals 
ADD CONSTRAINT professionals_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.companies(id);

-- 7. Add foreign key for reviews.client_id
ALTER TABLE public.reviews 
ADD CONSTRAINT reviews_client_id_fkey 
FOREIGN KEY (client_id) REFERENCES public.clients(id);

-- 8. Add foreign key for reviews.professional_id
ALTER TABLE public.reviews 
ADD CONSTRAINT reviews_professional_id_fkey 
FOREIGN KEY (professional_id) REFERENCES public.professionals(id);

-- 9. Add foreign key for services.professional_id
ALTER TABLE public.services 
ADD CONSTRAINT services_professional_id_fkey 
FOREIGN KEY (professional_id) REFERENCES public.professionals(id);

-- 10. Add foreign key for workplaces.company_id
ALTER TABLE public.workplaces 
ADD CONSTRAINT workplaces_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.companies(id);

-- Verificar que todas las foreign keys se agregaron correctamente
SELECT 
    tc.table_name, 
    tc.constraint_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE 
    tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
ORDER BY 
    tc.table_name, 
    tc.constraint_name;
