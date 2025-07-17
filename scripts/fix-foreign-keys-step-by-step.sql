-- Script to add missing foreign key constraints to existing tables
-- Run this script in your Supabase SQL editor
-- This script checks for existing constraints before adding new ones

-- First, check what foreign keys currently exist
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

-- Add missing foreign keys to bookings table
-- bookings_client_id_fkey
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_client_id_fkey 
FOREIGN KEY (client_id) REFERENCES public.clients(id);

-- bookings_professional_id_fkey
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_professional_id_fkey 
FOREIGN KEY (professional_id) REFERENCES public.professionals(id);

-- bookings_company_id_fkey
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.companies(id);

-- Add missing foreign key to company_schedules table
ALTER TABLE public.company_schedules 
ADD CONSTRAINT company_schedules_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.companies(id);

-- Add missing foreign key to professional_workplaces table
ALTER TABLE public.professional_workplaces 
ADD CONSTRAINT professional_workplaces_professional_id_fkey 
FOREIGN KEY (professional_id) REFERENCES public.professionals(id);

-- Add missing foreign key to professionals table
ALTER TABLE public.professionals 
ADD CONSTRAINT professionals_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.companies(id);

-- Add missing foreign keys to reviews table
ALTER TABLE public.reviews 
ADD CONSTRAINT reviews_client_id_fkey 
FOREIGN KEY (client_id) REFERENCES public.clients(id);

ALTER TABLE public.reviews 
ADD CONSTRAINT reviews_professional_id_fkey 
FOREIGN KEY (professional_id) REFERENCES public.professionals(id);

-- Add missing foreign key to services table
ALTER TABLE public.services 
ADD CONSTRAINT services_professional_id_fkey 
FOREIGN KEY (professional_id) REFERENCES public.professionals(id);

-- Add missing foreign key to workplaces table
ALTER TABLE public.workplaces 
ADD CONSTRAINT workplaces_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.companies(id);

-- Verify all foreign keys are in place after adding them
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
