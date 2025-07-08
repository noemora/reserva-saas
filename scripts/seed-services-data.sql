-- =====================================================
-- SEED DATA FOR SERVICES WITH NEW STRUCTURE
-- Datos de ejemplo para servicios con la nueva estructura
-- =====================================================

-- Insertar servicios de ejemplo con horarios y campos nuevos
-- Nota: Asume que ya existen professionals y workplaces con IDs específicos

INSERT INTO public.services (
    id,
    professional_id,
    workplace_id,
    name,
    description,
    duration,
    price,
    category,
    schedule,
    tags,
    requirements,
    preparation_time,
    cleanup_time,
    max_bookings_per_day,
    booking_window_days,
    image_url,
    color,
    is_active
) VALUES
-- Servicio 1: Consulta Médica General
(
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440101', -- professional_id (cambiar por ID real)
    '550e8400-e29b-41d4-a716-446655440201', -- workplace_id (cambiar por ID real)
    'Consulta Médica General',
    'Consulta médica integral con revisión completa del estado de salud del paciente',
    30,
    150.00,
    'Medicina General',
    '{
        "monday": {"isAvailable": true, "startTime": "08:00", "endTime": "17:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "tuesday": {"isAvailable": true, "startTime": "08:00", "endTime": "17:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "wednesday": {"isAvailable": true, "startTime": "08:00", "endTime": "17:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "thursday": {"isAvailable": true, "startTime": "08:00", "endTime": "17:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "friday": {"isAvailable": true, "startTime": "08:00", "endTime": "17:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "saturday": {"isAvailable": true, "startTime": "08:00", "endTime": "12:00", "breakStart": "", "breakEnd": ""},
        "sunday": {"isAvailable": false, "startTime": "", "endTime": "", "breakStart": "", "breakEnd": ""}
    }',
    ARRAY['consulta', 'medicina general', 'diagnóstico', 'prevención'],
    'Traer carnet de obra social o prepaga. Ayuno de 8 horas si requiere análisis de sangre.',
    5,
    5,
    12,
    30,
    '/images/services/consulta-general.jpg',
    '#3B82F6',
    true
),
-- Servicio 2: Chequeo Médico Completo
(
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440101', -- mismo professional
    '550e8400-e29b-41d4-a716-446655440201', -- mismo workplace
    'Chequeo Médico Completo',
    'Evaluación médica exhaustiva con análisis de laboratorio y estudios complementarios incluidos',
    60,
    300.00,
    'Medicina General',
    '{
        "monday": {"isAvailable": true, "startTime": "09:00", "endTime": "16:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "tuesday": {"isAvailable": true, "startTime": "09:00", "endTime": "16:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "wednesday": {"isAvailable": false, "startTime": "", "endTime": "", "breakStart": "", "breakEnd": ""},
        "thursday": {"isAvailable": true, "startTime": "09:00", "endTime": "16:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "friday": {"isAvailable": true, "startTime": "09:00", "endTime": "16:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "saturday": {"isAvailable": false, "startTime": "", "endTime": "", "breakStart": "", "breakEnd": ""},
        "sunday": {"isAvailable": false, "startTime": "", "endTime": "", "breakStart": "", "breakEnd": ""}
    }',
    ARRAY['chequeo', 'examen completo', 'laboratorio', 'prevención', 'análisis'],
    'Ayuno de 12 horas. Traer estudios previos si los tiene. Ropa cómoda.',
    10,
    10,
    6,
    45,
    '/images/services/chequeo-completo.jpg',
    '#10B981',
    true
),
-- Servicio 3: Terapia Física
(
    '550e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440102', -- different professional
    '550e8400-e29b-41d4-a716-446655440202', -- different workplace
    'Terapia Física',
    'Sesión de fisioterapia para rehabilitación, recuperación de lesiones y mejora del movimiento',
    60,
    200.00,
    'Fisioterapia',
    '{
        "monday": {"isAvailable": true, "startTime": "07:00", "endTime": "18:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "tuesday": {"isAvailable": true, "startTime": "07:00", "endTime": "18:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "wednesday": {"isAvailable": true, "startTime": "07:00", "endTime": "18:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "thursday": {"isAvailable": true, "startTime": "07:00", "endTime": "18:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "friday": {"isAvailable": true, "startTime": "07:00", "endTime": "18:00", "breakStart": "12:00", "breakEnd": "13:00"},
        "saturday": {"isAvailable": true, "startTime": "08:00", "endTime": "14:00", "breakStart": "", "breakEnd": ""},
        "sunday": {"isAvailable": false, "startTime": "", "endTime": "", "breakStart": "", "breakEnd": ""}
    }',
    ARRAY['fisioterapia', 'rehabilitación', 'terapia física', 'lesiones', 'movilidad'],
    'Traer ropa deportiva cómoda y toalla. Comunicar cualquier dolor o molestia antes de comenzar.',
    10,
    15,
    8,
    21,
    '/images/services/terapia-fisica.jpg',
    '#F59E0B',
    true
),
-- Servicio 4: Consulta Nutricional
(
    '550e8400-e29b-41d4-a716-446655440004',
    '550e8400-e29b-41d4-a716-446655440103', -- different professional (nutricionista)
    '550e8400-e29b-41d4-a716-446655440201', -- workplace 1
    'Consulta Nutricional',
    'Evaluación nutricional completa con plan alimentario personalizado y seguimiento',
    45,
    140.00,
    'Nutrición',
    '{
        "monday": {"isAvailable": true, "startTime": "14:00", "endTime": "18:00", "breakStart": "", "breakEnd": ""},
        "tuesday": {"isAvailable": true, "startTime": "14:00", "endTime": "18:00", "breakStart": "", "breakEnd": ""},
        "wednesday": {"isAvailable": true, "startTime": "14:00", "endTime": "18:00", "breakStart": "", "breakEnd": ""},
        "thursday": {"isAvailable": true, "startTime": "14:00", "endTime": "18:00", "breakStart": "", "breakEnd": ""},
        "friday": {"isAvailable": true, "startTime": "14:00", "endTime": "18:00", "breakStart": "", "breakEnd": ""},
        "saturday": {"isAvailable": true, "startTime": "09:00", "endTime": "13:00", "breakStart": "", "breakEnd": ""},
        "sunday": {"isAvailable": false, "startTime": "", "endTime": "", "breakStart": "", "breakEnd": ""}
    }',
    ARRAY['nutrición', 'alimentación', 'dieta', 'peso', 'salud nutricional'],
    'Traer estudios de laboratorio recientes si los tiene. Registro de comidas de 3 días.',
    5,
    5,
    10,
    30,
    '/images/services/consulta-nutricional.jpg',
    '#8B5CF6',
    true
),
-- Servicio 5: Consulta Dermatológica
(
    '550e8400-e29b-41d4-a716-446655440005',
    '550e8400-e29b-41d4-a716-446655440104', -- dermatólogo
    '550e8400-e29b-41d4-a716-446655440203', -- workplace 3
    'Consulta Dermatológica',
    'Evaluación especializada de problemas de la piel, diagnóstico y tratamiento dermatológico',
    30,
    180.00,
    'Dermatología',
    '{
        "monday": {"isAvailable": true, "startTime": "09:00", "endTime": "16:00", "breakStart": "13:00", "breakEnd": "14:00"},
        "tuesday": {"isAvailable": true, "startTime": "09:00", "endTime": "16:00", "breakStart": "13:00", "breakEnd": "14:00"},
        "wednesday": {"isAvailable": true, "startTime": "09:00", "endTime": "16:00", "breakStart": "13:00", "breakEnd": "14:00"},
        "thursday": {"isAvailable": true, "startTime": "09:00", "endTime": "16:00", "breakStart": "13:00", "breakEnd": "14:00"},
        "friday": {"isAvailable": true, "startTime": "09:00", "endTime": "16:00", "breakStart": "13:00", "breakEnd": "14:00"},
        "saturday": {"isAvailable": false, "startTime": "", "endTime": "", "breakStart": "", "breakEnd": ""},
        "sunday": {"isAvailable": false, "startTime": "", "endTime": "", "breakStart": "", "breakEnd": ""}
    }',
    ARRAY['dermatología', 'piel', 'lunares', 'acné', 'diagnóstico dermatológico'],
    'Evitar cremas o maquillaje en la zona a examinar. Traer lista de medicamentos actuales.',
    5,
    5,
    15,
    60,
    '/images/services/consulta-dermatologica.jpg',
    '#EF4444',
    true
);

-- Comentarios sobre el seed data
COMMENT ON TABLE public.services IS 'Tabla de servicios con campos enriquecidos para gestión completa';

-- Verificar que los datos se insertaron correctamente
-- SELECT name, category, tags, schedule FROM public.services WHERE id IN ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002');
