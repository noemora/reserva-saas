-- =====================================================
-- REFACTOR: REMOVE REDUNDANCY BETWEEN PROFILES AND SPECIFIC TABLES
-- =====================================================

-- This script removes redundant fields from clients, professionals, and companies tables
-- keeping profiles as the single source of truth for basic user information

-- =====================================================
-- 1. BACKUP DATA (Create temporary tables with current data)
-- =====================================================

-- Create backup tables
CREATE TABLE IF NOT EXISTS backup_clients AS SELECT * FROM public.clients;
CREATE TABLE IF NOT EXISTS backup_professionals AS SELECT * FROM public.professionals;
CREATE TABLE IF NOT EXISTS backup_companies AS SELECT * FROM public.companies;

-- =====================================================
-- 2. IDENTIFY AND HANDLE DUPLICATE USER_IDs
-- =====================================================

-- Create temporary tables to identify which records to keep (keeping the first one for each user_id)
CREATE TEMP TABLE clients_to_keep AS
SELECT DISTINCT ON (user_id) id
FROM backup_clients
WHERE user_id IS NOT NULL
ORDER BY user_id, created_at;

-- Add temporary tables for professionals and companies to handle duplicates
CREATE TEMP TABLE professionals_to_keep AS
SELECT DISTINCT ON (user_id) id
FROM backup_professionals
WHERE user_id IS NOT NULL
ORDER BY user_id, created_at;

CREATE TEMP TABLE companies_to_keep AS
SELECT DISTINCT ON (user_id) id
FROM backup_companies
WHERE user_id IS NOT NULL
ORDER BY user_id, created_at;

-- =====================================================
-- 3. DROP AND RECREATE CLIENTS TABLE (Remove redundant fields)
-- =====================================================

-- Drop existing foreign key constraints and indexes
DROP TABLE IF EXISTS public.clients CASCADE;

-- Recreate clients table with only specific fields
CREATE TABLE public.clients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    -- Remove: name, email, phone (these are in profiles)
    date_of_birth DATE,
    address TEXT,
    emergency_contact JSONB, -- {name: string, phone: string, relationship: string}
    medical_history TEXT[] DEFAULT '{}',
    allergies TEXT[] DEFAULT '{}',
    current_medications TEXT[] DEFAULT '{}',
    insurance_provider TEXT,
    insurance_number TEXT,
    preferred_language TEXT DEFAULT 'Español',
    communication_preferences JSONB DEFAULT '{"email": true, "sms": true, "phone": false}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 4. DROP AND RECREATE PROFESSIONALS TABLE (Remove redundant fields)
-- =====================================================

-- Drop existing table
DROP TABLE IF EXISTS public.professionals CASCADE;

-- Recreate professionals table with only specific fields
CREATE TABLE public.professionals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
    -- Remove: name, email, phone, avatar_url (these are in profiles)
    title TEXT,
    license_number TEXT,
    experience INTEGER DEFAULT 0,
    education TEXT,
    specialties TEXT[] DEFAULT '{}',
    biography TEXT,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_bookings INTEGER DEFAULT 0,
    monthly_revenue DECIMAL(10,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    member_since TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 5. DROP AND RECREATE COMPANIES TABLE (Remove redundant fields)
-- =====================================================

-- Drop existing table
DROP TABLE IF EXISTS public.companies CASCADE;

-- Recreate companies table with only specific fields
CREATE TABLE public.companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    -- Remove: name, email, phone (these are in profiles)
    address TEXT,
    website TEXT,
    capacity INTEGER DEFAULT 0,
    founded_year INTEGER,
    description TEXT,
    services TEXT[] DEFAULT '{}',
    logo_url TEXT, -- Keep this as it's different from avatar_url in profiles
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_bookings INTEGER DEFAULT 0,
    monthly_revenue DECIMAL(10,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 6. RECREATE DEPENDENT TABLES
-- =====================================================

-- Recreate workplaces table (depends on companies)
CREATE TABLE IF NOT EXISTS public.workplaces (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    phone TEXT,
    email TEXT,
    services TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Recreate professional_workplaces table
CREATE TABLE IF NOT EXISTS public.professional_workplaces (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE NOT NULL,
    workplace_id UUID REFERENCES public.workplaces(id) ON DELETE CASCADE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(professional_id, workplace_id)
);

-- Recreate services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE NOT NULL,
    workplace_id UUID REFERENCES public.workplaces(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- in minutes
    price DECIMAL(10,2) NOT NULL,
    category TEXT,
    schedule JSONB DEFAULT '{}', -- Service availability schedule
    tags TEXT[] DEFAULT '{}', -- Service tags for filtering
    requirements TEXT, -- Special requirements or preparations needed
    preparation_time INTEGER DEFAULT 0, -- Preparation time in minutes
    cleanup_time INTEGER DEFAULT 0, -- Cleanup time in minutes
    max_bookings_per_day INTEGER DEFAULT 20, -- Maximum bookings allowed per day
    booking_window_days INTEGER DEFAULT 30, -- Days in advance for booking
    image_url TEXT, -- Service image URL
    color TEXT DEFAULT '#3B82F6', -- Color for visual identification
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Recreate bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
    professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE NOT NULL,
    workplace_id UUID REFERENCES public.workplaces(id) ON DELETE CASCADE NOT NULL,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    price DECIMAL(10,2) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')) DEFAULT 'pending',
    notes TEXT,
    instructions TEXT, -- Special instructions for the booking
    description TEXT, -- Description of the service/reason for visit
    cancellation_reason TEXT,
    payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending',
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 7. MIGRATE DATA FROM BACKUP TABLES
-- =====================================================

-- Migrate clients data (only non-redundant fields and only one record per user_id)
INSERT INTO public.clients (
    id, user_id, date_of_birth, address, emergency_contact, 
    medical_history, allergies, current_medications, insurance_provider, 
    insurance_number, preferred_language, communication_preferences, 
    created_at, updated_at
)
SELECT 
    bc.id, bc.user_id, bc.date_of_birth, bc.address, bc.emergency_contact,
    bc.medical_history, bc.allergies, bc.current_medications, bc.insurance_provider,
    bc.insurance_number, bc.preferred_language, bc.communication_preferences,
    bc.created_at, bc.updated_at
FROM backup_clients bc
JOIN clients_to_keep ctk ON bc.id = ctk.id
WHERE bc.user_id IS NOT NULL;

-- Migrate professionals data (only non-redundant fields and only one record per user_id)
INSERT INTO public.professionals (
    id, user_id, company_id, title, license_number, experience, 
    education, specialties, biography, rating, total_bookings, 
    monthly_revenue, is_active, member_since, created_at, updated_at
)
SELECT 
    bp.id, bp.user_id, bp.company_id, bp.title, bp.license_number, bp.experience,
    bp.education, bp.specialties, bp.biography, bp.rating, bp.total_bookings,
    bp.monthly_revenue, bp.is_active, bp.member_since, bp.created_at, bp.updated_at
FROM backup_professionals bp
JOIN professionals_to_keep ptk ON bp.id = ptk.id
WHERE bp.user_id IS NOT NULL;

-- Migrate companies data (only non-redundant fields and only one record per user_id)
INSERT INTO public.companies (
    id, user_id, address, website, capacity, founded_year, 
    description, services, logo_url, rating, total_bookings, 
    monthly_revenue, is_active, created_at, updated_at
)
SELECT 
    bc.id, bc.user_id, bc.address, bc.website, bc.capacity, bc.founded_year,
    bc.description, bc.services, bc.logo_url, bc.rating, bc.total_bookings,
    bc.monthly_revenue, bc.is_active, bc.created_at, bc.updated_at
FROM backup_companies bc
JOIN companies_to_keep ctk ON bc.id = ctk.id
WHERE bc.user_id IS NOT NULL;

-- =====================================================
-- 8. ENABLE ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on new tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for clients
CREATE POLICY "Users can view own client data" ON public.clients
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own client data" ON public.clients
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own client data" ON public.clients
    FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for professionals
CREATE POLICY "Users can view own professional data" ON public.professionals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own professional data" ON public.professionals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own professional data" ON public.professionals
    FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for companies
CREATE POLICY "Users can view own company data" ON public.companies
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own company data" ON public.companies
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own company data" ON public.companies
    FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- 9. CREATE UPDATED_AT TRIGGERS
-- =====================================================

-- Triggers for updated_at fields
CREATE TRIGGER on_clients_updated
    BEFORE UPDATE ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_professionals_updated
    BEFORE UPDATE ON public.professionals
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_companies_updated
    BEFORE UPDATE ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 10. CLEAN UP BACKUP TABLES (Uncomment when confident)
-- =====================================================

-- DROP TABLE IF EXISTS backup_clients;
-- DROP TABLE IF EXISTS backup_professionals;
-- DROP TABLE IF EXISTS backup_companies;
-- DROP TABLE IF EXISTS clients_to_keep;
-- DROP TABLE IF EXISTS professionals_to_keep;
-- DROP TABLE IF EXISTS companies_to_keep;

-- =====================================================
-- 11. CREATE VIEWS FOR EASY DATA ACCESS
-- =====================================================

-- View for complete client information
CREATE OR REPLACE VIEW public.complete_clients AS
SELECT 
    c.id,
    c.user_id,
    p.full_name as name,
    p.email,
    p.phone,
    p.avatar_url,
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
    c.created_at,
    c.updated_at
FROM public.clients c
JOIN public.profiles p ON c.user_id = p.id;

-- View for complete professional information
CREATE OR REPLACE VIEW public.complete_professionals AS
SELECT 
    pr.id,
    pr.user_id,
    pr.company_id,
    p.full_name as name,
    p.email,
    p.phone,
    p.avatar_url,
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
    pr.created_at,
    pr.updated_at
FROM public.professionals pr
JOIN public.profiles p ON pr.user_id = p.id;

-- View for complete company information
CREATE OR REPLACE VIEW public.complete_companies AS
SELECT 
    c.id,
    c.user_id,
    p.full_name as name,
    p.email,
    p.phone,
    p.avatar_url,
    c.address,
    c.website,
    c.capacity,
    c.founded_year,
    c.description,
    c.services,
    c.logo_url,
    c.rating,
    c.total_bookings,
    c.monthly_revenue,
    c.is_active,
    c.created_at,
    c.updated_at
FROM public.companies c
JOIN public.profiles p ON c.user_id = p.id;