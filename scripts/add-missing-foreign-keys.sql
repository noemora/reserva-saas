-- Script to add only the missing foreign key constraints
-- Based on the current state of your database

-- From your current foreign keys, these are missing:
-- 1. bookings_client_id_fkey
-- 2. bookings_professional_id_fkey  
-- 3. bookings_company_id_fkey
-- 4. company_schedules_company_id_fkey
-- 5. professional_workplaces_professional_id_fkey
-- 6. professionals_company_id_fkey
-- 7. reviews_client_id_fkey
-- 8. reviews_professional_id_fkey
-- 9. services_professional_id_fkey
-- 10. workplaces_company_id_fkey

-- Execute these one by one:

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
