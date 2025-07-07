-- =====================================================
-- UTILITY FUNCTIONS AND TRIGGERS
-- =====================================================

-- =====================================================
-- FUNCTION TO UPDATE PROFESSIONAL RATINGS
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_professional_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.professionals
    SET rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM public.reviews
        WHERE professional_id = NEW.professional_id
    )
    WHERE id = NEW.professional_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_professional_rating_trigger ON public.reviews;

-- Create trigger to update professional rating when review is added/updated
CREATE TRIGGER update_professional_rating_trigger
    AFTER INSERT OR UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.update_professional_rating();

-- =====================================================
-- FUNCTION TO UPDATE BOOKING COUNTS
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_booking_counts()
RETURNS TRIGGER AS $$
BEGIN
    -- Update professional booking count
    IF TG_OP = 'INSERT' THEN
        UPDATE public.professionals
        SET total_bookings = total_bookings + 1
        WHERE id = NEW.professional_id;
        
        UPDATE public.companies
        SET total_bookings = total_bookings + 1
        WHERE id = NEW.company_id;
        
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.professionals
        SET total_bookings = GREATEST(total_bookings - 1, 0)
        WHERE id = OLD.professional_id;
        
        UPDATE public.companies
        SET total_bookings = GREATEST(total_bookings - 1, 0)
        WHERE id = OLD.company_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_booking_counts_trigger ON public.bookings;

-- Create trigger to update booking counts
CREATE TRIGGER update_booking_counts_trigger
    AFTER INSERT OR DELETE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_booking_counts();

-- =====================================================
-- FUNCTION TO CREATE CLIENT PROFILE AUTOMATICALLY
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_client_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create client profile if user_type is 'Cliente'
    IF NEW.user_type = 'Cliente' THEN
        INSERT INTO public.clients (user_id, name, email, phone)
        VALUES (
            NEW.id,
            COALESCE(NEW.full_name, 'Usuario'),
            NEW.email,
            NEW.phone
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_client_profile_created ON public.profiles;

-- Create trigger to create client profile automatically
CREATE TRIGGER on_client_profile_created
    AFTER INSERT ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_client_user();

-- =====================================================
-- FUNCTION TO PREVENT DOUBLE BOOKING
-- =====================================================
CREATE OR REPLACE FUNCTION public.prevent_double_booking()
RETURNS TRIGGER AS $$
DECLARE
    booking_end_time TIME;
    existing_booking_count INTEGER;
BEGIN
    -- Calculate end time of the new booking
    booking_end_time := NEW.booking_time + (NEW.duration || ' minutes')::INTERVAL;
    
    -- Check for overlapping bookings for the same professional on the same date
    SELECT COUNT(*)
    INTO existing_booking_count
    FROM public.bookings
    WHERE professional_id = NEW.professional_id
      AND booking_date = NEW.booking_date
      AND status NOT IN ('cancelled', 'no_show')
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
      AND (
          -- New booking starts during existing booking
          (NEW.booking_time >= booking_time AND NEW.booking_time < booking_time + (duration || ' minutes')::INTERVAL)
          OR
          -- New booking ends during existing booking
          (booking_end_time > booking_time AND booking_end_time <= booking_time + (duration || ' minutes')::INTERVAL)
          OR
          -- New booking completely contains existing booking
          (NEW.booking_time <= booking_time AND booking_end_time >= booking_time + (duration || ' minutes')::INTERVAL)
      );
    
    IF existing_booking_count > 0 THEN
        RAISE EXCEPTION 'El profesional ya tiene una cita programada en este horario';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS prevent_double_booking_trigger ON public.bookings;

-- Create trigger to prevent double booking
CREATE TRIGGER prevent_double_booking_trigger
    BEFORE INSERT OR UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_double_booking();

-- =====================================================
-- FUNCTION TO CREATE NOTIFICATION
-- =====================================================
CREATE OR REPLACE FUNCTION public.create_notification(
    p_user_id UUID,
    p_title TEXT,
    p_message TEXT,
    p_type TEXT,
    p_booking_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO public.notifications (user_id, title, message, type, related_booking_id)
    VALUES (p_user_id, p_title, p_message, p_type, p_booking_id)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- FUNCTION TO SEND BOOKING NOTIFICATIONS
-- =====================================================
CREATE OR REPLACE FUNCTION public.send_booking_notifications()
RETURNS TRIGGER AS $$
DECLARE
    client_user_id UUID;
    professional_user_id UUID;
    client_name TEXT;
    professional_name TEXT;
    service_name TEXT;
BEGIN
    -- Get related data
    SELECT c.user_id, c.name INTO client_user_id, client_name
    FROM public.clients c WHERE c.id = NEW.client_id;
    
    SELECT p.user_id, p.name INTO professional_user_id, professional_name
    FROM public.professionals p WHERE p.id = NEW.professional_id;
    
    SELECT s.name INTO service_name
    FROM public.services s WHERE s.id = NEW.service_id;
    
    IF TG_OP = 'INSERT' THEN
        -- Notify client about new booking
        PERFORM public.create_notification(
            client_user_id,
            'Reserva Creada',
            'Tu reserva para ' || service_name || ' con ' || professional_name || ' ha sido creada.',
            'booking',
            NEW.id
        );
        
        -- Notify professional about new booking
        PERFORM public.create_notification(
            professional_user_id,
            'Nueva Reserva',
            'Tienes una nueva reserva de ' || client_name || ' para ' || service_name || '.',
            'booking',
            NEW.id
        );
        
    ELSIF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
        -- Notify about status changes
        IF NEW.status = 'confirmed' THEN
            PERFORM public.create_notification(
                client_user_id,
                'Reserva Confirmada',
                'Tu reserva para ' || service_name || ' ha sido confirmada.',
                'booking',
                NEW.id
            );
        ELSIF NEW.status = 'cancelled' THEN
            PERFORM public.create_notification(
                client_user_id,
                'Reserva Cancelada',
                'Tu reserva para ' || service_name || ' ha sido cancelada.',
                'cancellation',
                NEW.id
            );
            
            PERFORM public.create_notification(
                professional_user_id,
                'Reserva Cancelada',
                'La reserva de ' || client_name || ' para ' || service_name || ' ha sido cancelada.',
                'cancellation',
                NEW.id
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS send_booking_notifications_trigger ON public.bookings;

-- Create trigger to send booking notifications
CREATE TRIGGER send_booking_notifications_trigger
    AFTER INSERT OR UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.send_booking_notifications();
