-- =====================================================
-- MIGRATE SERVICES TABLE
-- Agregar campos faltantes para alinear con la UI
-- =====================================================

-- Agregar campos faltantes a la tabla services
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS schedule JSONB DEFAULT '{}';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS requirements TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS preparation_time INTEGER DEFAULT 0; -- in minutes
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS cleanup_time INTEGER DEFAULT 0; -- in minutes
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS max_bookings_per_day INTEGER DEFAULT 20;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS booking_window_days INTEGER DEFAULT 30;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#3B82F6';

-- Crear índices para los nuevos campos
CREATE INDEX IF NOT EXISTS idx_services_tags ON public.services USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_services_schedule ON public.services USING GIN(schedule);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);

-- Migrar datos existentes de service_schedules a services.schedule si existen
-- (Solo ejecutar si la tabla service_schedules tiene datos)
DO $$
DECLARE
    service_record RECORD;
    schedule_json JSONB := '{}';
    day_schedule RECORD;
BEGIN
    -- Para cada servicio existente
    FOR service_record IN SELECT id FROM public.services LOOP
        schedule_json := '{}';
        
        -- Construir el objeto JSON de horarios
        FOR day_schedule IN 
            SELECT day_of_week, is_available, start_time, end_time, break_start, break_end
            FROM public.service_schedules 
            WHERE service_id = service_record.id
        LOOP
            schedule_json := schedule_json || jsonb_build_object(
                day_schedule.day_of_week,
                jsonb_build_object(
                    'isAvailable', day_schedule.is_available,
                    'startTime', COALESCE(day_schedule.start_time::text, ''),
                    'endTime', COALESCE(day_schedule.end_time::text, ''),
                    'breakStart', COALESCE(day_schedule.break_start::text, ''),
                    'breakEnd', COALESCE(day_schedule.break_end::text, '')
                )
            );
        END LOOP;
        
        -- Actualizar el servicio con el horario JSON
        UPDATE public.services 
        SET schedule = schedule_json 
        WHERE id = service_record.id;
    END LOOP;
END $$;

-- Comentar para mantener la tabla service_schedules por compatibilidad
-- pero la UI usará el campo schedule JSONB
-- DROP TABLE IF EXISTS public.service_schedules;

COMMENT ON COLUMN public.services.schedule IS 'Horarios de disponibilidad del servicio en formato JSON: {day: {isAvailable, startTime, endTime, breakStart, breakEnd}}';
COMMENT ON COLUMN public.services.tags IS 'Etiquetas o características del servicio para filtrado y búsqueda';
COMMENT ON COLUMN public.services.requirements IS 'Requisitos especiales o preparativos necesarios para el servicio';
COMMENT ON COLUMN public.services.preparation_time IS 'Tiempo de preparación previo requerido en minutos';
COMMENT ON COLUMN public.services.cleanup_time IS 'Tiempo de limpieza posterior requerido en minutos';
COMMENT ON COLUMN public.services.max_bookings_per_day IS 'Número máximo de reservas permitidas por día';
COMMENT ON COLUMN public.services.booking_window_days IS 'Días de anticipación máxima para hacer reservas';
COMMENT ON COLUMN public.services.image_url IS 'URL de la imagen representativa del servicio';
COMMENT ON COLUMN public.services.color IS 'Color hexadecimal para identificación visual en calendarios';
