-- =====================================================
-- MIGRATION: Update bookings table to match UI requirements
-- =====================================================

-- Add new columns to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS instructions TEXT;

ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.bookings.instructions IS 'Special instructions for the booking (e.g., "Bring previous studies", "Wear comfortable clothes")';
COMMENT ON COLUMN public.bookings.description IS 'Description of the service/reason for visit';

-- Update indexes if needed
CREATE INDEX IF NOT EXISTS idx_bookings_instructions ON public.bookings(instructions) WHERE instructions IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_description ON public.bookings(description) WHERE description IS NOT NULL;
