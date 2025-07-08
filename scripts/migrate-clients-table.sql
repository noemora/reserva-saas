-- =====================================================
-- MIGRATION: Update clients table to match UI requirements
-- =====================================================

-- Add new columns to clients table
ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS medical_history TEXT[] DEFAULT ARRAY[]::TEXT[];

ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS allergies TEXT[] DEFAULT ARRAY[]::TEXT[];

ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS current_medications TEXT[] DEFAULT ARRAY[]::TEXT[];

ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS insurance_provider TEXT;

ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS insurance_number TEXT;

ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'Español';

ALTER TABLE public.clients 
ADD COLUMN IF NOT EXISTS communication_preferences JSONB DEFAULT '{"email": true, "sms": true, "phone": false}';

-- Update emergency_contact structure
-- First, add the new JSONB column
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS emergency_contact_new JSONB;

-- Migrate existing data (if any exists)
UPDATE public.clients 
SET emergency_contact_new = jsonb_build_object(
    'name', '',
    'phone', '',
    'relationship', ''
)
WHERE emergency_contact IS NOT NULL;

-- Drop old columns
ALTER TABLE public.clients DROP COLUMN IF EXISTS emergency_contact;
ALTER TABLE public.clients DROP COLUMN IF EXISTS emergency_phone;
ALTER TABLE public.clients DROP COLUMN IF EXISTS medical_notes;

-- Rename new column
ALTER TABLE public.clients RENAME COLUMN emergency_contact_new TO emergency_contact;

-- Update the trigger for the clients table (if not already exists)
DROP TRIGGER IF EXISTS handle_clients_updated_at ON public.clients;
CREATE TRIGGER handle_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Add comments for documentation
COMMENT ON COLUMN public.clients.emergency_contact IS 'JSON object containing emergency contact information: {name: string, phone: string, relationship: string}';
COMMENT ON COLUMN public.clients.medical_history IS 'Array of medical conditions/history';
COMMENT ON COLUMN public.clients.allergies IS 'Array of known allergies';
COMMENT ON COLUMN public.clients.current_medications IS 'Array of current medications';
COMMENT ON COLUMN public.clients.communication_preferences IS 'JSON object for communication preferences: {email: boolean, sms: boolean, phone: boolean}';
