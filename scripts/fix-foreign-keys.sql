-- Script to add missing foreign key constraints to existing tables
-- Run this script in your Supabase SQL editor

-- First, let's check what foreign keys we need to add
DO $$
BEGIN
    -- Add missing foreign keys to bookings table (only if they don't exist)
    
    -- bookings_client_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'bookings_client_id_fkey' 
        AND table_name = 'bookings' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.bookings 
        ADD CONSTRAINT bookings_client_id_fkey 
        FOREIGN KEY (client_id) REFERENCES public.clients(id);
        RAISE NOTICE 'Added bookings_client_id_fkey';
    ELSE
        RAISE NOTICE 'bookings_client_id_fkey already exists';
    END IF;

    -- bookings_professional_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'bookings_professional_id_fkey' 
        AND table_name = 'bookings' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.bookings 
        ADD CONSTRAINT bookings_professional_id_fkey 
        FOREIGN KEY (professional_id) REFERENCES public.professionals(id);
        RAISE NOTICE 'Added bookings_professional_id_fkey';
    ELSE
        RAISE NOTICE 'bookings_professional_id_fkey already exists';
    END IF;

    -- bookings_company_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'bookings_company_id_fkey' 
        AND table_name = 'bookings' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.bookings 
        ADD CONSTRAINT bookings_company_id_fkey 
        FOREIGN KEY (company_id) REFERENCES public.companies(id);
        RAISE NOTICE 'Added bookings_company_id_fkey';
    ELSE
        RAISE NOTICE 'bookings_company_id_fkey already exists';
    END IF;

    -- company_schedules_company_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'company_schedules_company_id_fkey' 
        AND table_name = 'company_schedules' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.company_schedules 
        ADD CONSTRAINT company_schedules_company_id_fkey 
        FOREIGN KEY (company_id) REFERENCES public.companies(id);
        RAISE NOTICE 'Added company_schedules_company_id_fkey';
    ELSE
        RAISE NOTICE 'company_schedules_company_id_fkey already exists';
    END IF;

    -- professional_workplaces_professional_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'professional_workplaces_professional_id_fkey' 
        AND table_name = 'professional_workplaces' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.professional_workplaces 
        ADD CONSTRAINT professional_workplaces_professional_id_fkey 
        FOREIGN KEY (professional_id) REFERENCES public.professionals(id);
        RAISE NOTICE 'Added professional_workplaces_professional_id_fkey';
    ELSE
        RAISE NOTICE 'professional_workplaces_professional_id_fkey already exists';
    END IF;

    -- professionals_company_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'professionals_company_id_fkey' 
        AND table_name = 'professionals' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.professionals 
        ADD CONSTRAINT professionals_company_id_fkey 
        FOREIGN KEY (company_id) REFERENCES public.companies(id);
        RAISE NOTICE 'Added professionals_company_id_fkey';
    ELSE
        RAISE NOTICE 'professionals_company_id_fkey already exists';
    END IF;

    -- reviews_client_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'reviews_client_id_fkey' 
        AND table_name = 'reviews' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.reviews 
        ADD CONSTRAINT reviews_client_id_fkey 
        FOREIGN KEY (client_id) REFERENCES public.clients(id);
        RAISE NOTICE 'Added reviews_client_id_fkey';
    ELSE
        RAISE NOTICE 'reviews_client_id_fkey already exists';
    END IF;

    -- reviews_professional_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'reviews_professional_id_fkey' 
        AND table_name = 'reviews' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.reviews 
        ADD CONSTRAINT reviews_professional_id_fkey 
        FOREIGN KEY (professional_id) REFERENCES public.professionals(id);
        RAISE NOTICE 'Added reviews_professional_id_fkey';
    ELSE
        RAISE NOTICE 'reviews_professional_id_fkey already exists';
    END IF;

    -- services_professional_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'services_professional_id_fkey' 
        AND table_name = 'services' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.services 
        ADD CONSTRAINT services_professional_id_fkey 
        FOREIGN KEY (professional_id) REFERENCES public.professionals(id);
        RAISE NOTICE 'Added services_professional_id_fkey';
    ELSE
        RAISE NOTICE 'services_professional_id_fkey already exists';
    END IF;

    -- workplaces_company_id_fkey
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'workplaces_company_id_fkey' 
        AND table_name = 'workplaces' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.workplaces 
        ADD CONSTRAINT workplaces_company_id_fkey 
        FOREIGN KEY (company_id) REFERENCES public.companies(id);
        RAISE NOTICE 'Added workplaces_company_id_fkey';
    ELSE
        RAISE NOTICE 'workplaces_company_id_fkey already exists';
    END IF;

END $$;

-- Verify all foreign keys are in place
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
