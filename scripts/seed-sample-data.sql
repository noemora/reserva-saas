-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Note: This script assumes you have created test users through Supabase Auth
-- You'll need to replace the UUIDs with actual user IDs from your auth.users table

-- =====================================================
-- SAMPLE COMPANIES
-- =====================================================
INSERT INTO public.companies (
    user_id, name, email, phone, address, website, capacity, founded_year, description, services
) VALUES 
(
    'e042bda2-0b90-48ef-a365-420ed575f41e', -- Replace with actual company user ID
    'Centro Médico Salud Total',
    'info@saludtotal.com',
    '+1234567890',
    'Av. Principal 123, Ciudad',
    'https://saludtotal.com',
    50,
    2015,
    'Centro médico especializado en atención integral de salud',
    ARRAY['Medicina General', 'Cardiología', 'Dermatología', 'Psicología']
),
(
    'e042bda2-0b90-48ef-a365-420ed575f41e', -- Replace with actual company user ID
    'Clínica Dental Sonrisa',
    'contacto@clinicasonrisa.com',
    '+1234567891',
    'Calle Secundaria 456, Ciudad',
    'https://clinicasonrisa.com',
    25,
    2018,
    'Clínica dental especializada en tratamientos estéticos y preventivos',
    ARRAY['Odontología General', 'Ortodoncia', 'Implantes', 'Estética Dental']
);

-- =====================================================
-- SAMPLE COMPANY SCHEDULES
-- =====================================================
INSERT INTO public.company_schedules (company_id, day_of_week, is_open, open_time, close_time) VALUES
-- Centro Médico Salud Total
('257a7834-8feb-45b5-99b7-f015c790241d', 'monday', true, '08:00', '18:00'),
('257a7834-8feb-45b5-99b7-f015c790241d', 'tuesday', true, '08:00', '18:00'),
('257a7834-8feb-45b5-99b7-f015c790241d', 'wednesday', true, '08:00', '18:00'),
('257a7834-8feb-45b5-99b7-f015c790241d', 'thursday', true, '08:00', '18:00'),
('257a7834-8feb-45b5-99b7-f015c790241d', 'friday', true, '08:00', '18:00'),
('257a7834-8feb-45b5-99b7-f015c790241d', 'saturday', true, '09:00', '14:00'),
('257a7834-8feb-45b5-99b7-f015c790241d', 'sunday', false, null, null),
-- Clínica Dental Sonrisa
('ace07de5-758e-4eaf-abfe-af1152eae010', 'monday', true, '09:00', '19:00'),
('ace07de5-758e-4eaf-abfe-af1152eae010', 'tuesday', true, '09:00', '19:00'),
('ace07de5-758e-4eaf-abfe-af1152eae010', 'wednesday', true, '09:00', '19:00'),
('ace07de5-758e-4eaf-abfe-af1152eae010', 'thursday', true, '09:00', '19:00'),
('ace07de5-758e-4eaf-abfe-af1152eae010', 'friday', true, '09:00', '19:00'),
('ace07de5-758e-4eaf-abfe-af1152eae010', 'saturday', false, null, null),
('ace07de5-758e-4eaf-abfe-af1152eae010', 'sunday', false, null, null);

-- =====================================================
-- SAMPLE WORKPLACES
-- =====================================================
INSERT INTO public.workplaces (
    company_id, name, address, description, phone, email, services
) VALUES
(
    '257a7834-8feb-45b5-99b7-f015c790241d',
    'Sede Principal',
    'Av. Principal 123, Ciudad',
    'Sede principal del centro médico con todas las especialidades',
    '+1234567890',
    'principal@saludtotal.com',
    ARRAY['Medicina General', 'Cardiología', 'Dermatología']
),
(
    '257a7834-8feb-45b5-99b7-f015c790241d',
    'Sede Norte',
    'Av. Norte 789, Ciudad',
    'Sede norte especializada en psicología y medicina general',
    '+1234567892',
    'norte@saludtotal.com',
    ARRAY['Medicina General', 'Psicología']
),
(
    'ace07de5-758e-4eaf-abfe-af1152eae010',
    'Clínica Principal',
    'Calle Secundaria 456, Ciudad',
    'Clínica principal con todos los servicios dentales',
    '+1234567891',
    'contacto@clinicasonrisa.com',
    ARRAY['Odontología General', 'Ortodoncia', 'Implantes', 'Estética Dental']
);

-- =====================================================
-- SAMPLE PROFESSIONALS
-- =====================================================
INSERT INTO public.professionals (
    user_id, company_id, name, title, email, phone, license_number, experience, education, specialties, biography, rating
) VALUES
(
    '2a6f055c-29de-492f-b09f-88de82992e5f', -- Replace with actual professional user ID
    '257a7834-8feb-45b5-99b7-f015c790241d',
    'Dr. Juan Pérez',
    'Médico Cardiólogo',
    'juan.perez@saludtotal.com',
    '+1234567893',
    'MED-12345',
    15,
    'Universidad Nacional - Medicina, Especialización en Cardiología',
    ARRAY['Cardiología', 'Medicina Interna'],
    'Especialista en cardiología con más de 15 años de experiencia en el diagnóstico y tratamiento de enfermedades cardiovasculares.',
    4.8
),
(
    '2a6f055c-29de-492f-b09f-88de82992e5f', -- Replace with actual professional user ID
    'ace07de5-758e-4eaf-abfe-af1152eae010',
    'Dra. María González',
    'Odontóloga General',
    'maria.gonzalez@clinicasonrisa.com',
    '+1234567894',
    'ODO-67890',
    10,
    'Universidad Central - Odontología',
    ARRAY['Odontología General', 'Estética Dental'],
    'Odontóloga especializada en tratamientos estéticos y preventivos con enfoque en la satisfacción del paciente.',
    4.9
);

-- =====================================================
-- SAMPLE PROFESSIONAL WORKPLACES
-- =====================================================
INSERT INTO public.professional_workplaces (professional_id, workplace_id) VALUES
('754bd528-cd94-43e1-bcb5-9afae8b0fce8', 'db80ad48-498c-4957-b2f6-f722ffb774be'), --5 wp
('d4f078f7-5d38-42d0-a4bd-301e42abbdf8', 'f0afe5cd-e703-4f5f-9a80-428ec7bfe73c'); --7 wp

-- =====================================================
-- SAMPLE SERVICES
-- =====================================================
INSERT INTO public.services (
    professional_id, workplace_id, name, description, duration, price, category
) VALUES
(
    '754bd528-cd94-43e1-bcb5-9afae8b0fce8',
    'db80ad48-498c-4957-b2f6-f722ffb774be',
    'Consulta Cardiológica',
    'Evaluación completa del sistema cardiovascular',
    60,
    150.00,
    'Cardiología'
),
(
    '754bd528-cd94-43e1-bcb5-9afae8b0fce8',
    'db80ad48-498c-4957-b2f6-f722ffb774be',
    'Electrocardiograma',
    'Estudio de la actividad eléctrica del corazón',
    30,
    80.00,
    'Cardiología'
),
(
    'd4f078f7-5d38-42d0-a4bd-301e42abbdf8',
    'f0afe5cd-e703-4f5f-9a80-428ec7bfe73c',
    'Limpieza Dental',
    'Limpieza profunda y revisión dental completa',
    45,
    100.00,
    'Odontología General'
),
(
    'd4f078f7-5d38-42d0-a4bd-301e42abbdf8',
    'f0afe5cd-e703-4f5f-9a80-428ec7bfe73c',
    'Blanqueamiento Dental',
    'Tratamiento estético para blanquear los dientes',
    90,
    300.00,
    'Estética Dental'
);

-- =====================================================
-- SAMPLE SERVICE SCHEDULES
-- =====================================================
INSERT INTO public.service_schedules (service_id, day_of_week, is_available, start_time, end_time) VALUES
-- Consulta Cardiológica
('a09e0193-5de2-4b8c-b256-b494798d97d2', 'monday', true, '09:00', '17:00'),
('a09e0193-5de2-4b8c-b256-b494798d97d2', 'tuesday', true, '09:00', '17:00'),
('a09e0193-5de2-4b8c-b256-b494798d97d2', 'wednesday', true, '09:00', '17:00'),
('a09e0193-5de2-4b8c-b256-b494798d97d2', 'thursday', true, '09:00', '17:00'),
('a09e0193-5de2-4b8c-b256-b494798d97d2', 'friday', true, '09:00', '17:00'),
('a09e0193-5de2-4b8c-b256-b494798d97d2', 'saturday', false, null, null),
('a09e0193-5de2-4b8c-b256-b494798d97d2', 'sunday', false, null, null),
-- Electrocardiograma
('37ea8149-12a7-4188-9f37-86d7af718334', 'monday', true, '08:00', '18:00'),
('37ea8149-12a7-4188-9f37-86d7af718334', 'tuesday', true, '08:00', '18:00'),
('37ea8149-12a7-4188-9f37-86d7af718334', 'wednesday', true, '08:00', '18:00'),
('37ea8149-12a7-4188-9f37-86d7af718334', 'thursday', true, '08:00', '18:00'),
('37ea8149-12a7-4188-9f37-86d7af718334', 'friday', true, '08:00', '18:00'),
('37ea8149-12a7-4188-9f37-86d7af718334', 'saturday', true, '09:00', '14:00'),
('37ea8149-12a7-4188-9f37-86d7af718334', 'sunday', false, null, null),
-- Limpieza Dental
('8122623b-35d6-4efb-9b4c-d278f25511e6', 'monday', true, '10:00', '18:00'),
('8122623b-35d6-4efb-9b4c-d278f25511e6', 'tuesday', true, '10:00', '18:00'),
('8122623b-35d6-4efb-9b4c-d278f25511e6', 'wednesday', true, '10:00', '18:00'),
('8122623b-35d6-4efb-9b4c-d278f25511e6', 'thursday', true, '10:00', '18:00'),
('8122623b-35d6-4efb-9b4c-d278f25511e6', 'friday', true, '10:00', '18:00'),
('8122623b-35d6-4efb-9b4c-d278f25511e6', 'saturday', false, null, null),
('8122623b-35d6-4efb-9b4c-d278f25511e6', 'sunday', false, null, null),
-- Blanqueamiento Dental
('bd33a6a4-a805-41e7-85bf-aad94c0bc164', 'monday', true, '14:00', '17:00'),
('bd33a6a4-a805-41e7-85bf-aad94c0bc164', 'tuesday', true, '14:00', '17:00'),
('bd33a6a4-a805-41e7-85bf-aad94c0bc164', 'wednesday', true, '14:00', '17:00'),
('bd33a6a4-a805-41e7-85bf-aad94c0bc164', 'thursday', true, '14:00', '17:00'),
('bd33a6a4-a805-41e7-85bf-aad94c0bc164', 'friday', true, '14:00', '17:00'),
('bd33a6a4-a805-41e7-85bf-aad94c0bc164', 'saturday', false, null, null),
('bd33a6a4-a805-41e7-85bf-aad94c0bc164', 'sunday', false, null, null);

-- =====================================================
-- SAMPLE CLIENTS
-- =====================================================
INSERT INTO public.clients (
    user_id, name, email, phone, date_of_birth, address
) VALUES
(
    '0c92c0d7-4f35-4dd6-85a9-6b4a9fbcc2e3', -- Replace with actual client user ID
    'Ana Rodríguez',
    'ana.rodriguez@email.com',
    '+1234567895',
    '1985-03-15',
    'Calle Cliente 123, Ciudad'
),
(
    '0c92c0d7-4f35-4dd6-85a9-6b4a9fbcc2e3', -- Replace with actual client user ID
    'Carlos López',
    'carlos.lopez@email.com',
    '+1234567896',
    '1990-07-22',
    'Av. Cliente 456, Ciudad'
);

-- =====================================================
-- SAMPLE BOOKINGS
-- =====================================================
INSERT INTO public.bookings (
    client_id, professional_id, service_id, workplace_id, company_id, 
    booking_date, booking_time, duration, price, status, notes
) VALUES
(
    'dca7a837-7491-4c70-9f09-7bce0ccfb5a3',
    '754bd528-cd94-43e1-bcb5-9afae8b0fce8',
    'a09e0193-5de2-4b8c-b256-b494798d97d2',
    'db80ad48-498c-4957-b2f6-f722ffb774be',
    '257a7834-8feb-45b5-99b7-f015c790241d',
    CURRENT_DATE + INTERVAL '3 days',
    '10:00',
    60,
    150.00,
    'confirmed',
    'Primera consulta cardiológica'
),
(
    '7f3990c2-140c-4d96-ae6b-34a9445fb995',
    'd4f078f7-5d38-42d0-a4bd-301e42abbdf8',
    '8122623b-35d6-4efb-9b4c-d278f25511e6',
    'f0afe5cd-e703-4f5f-9a80-428ec7bfe73c',
    'ace07de5-758e-4eaf-abfe-af1152eae010',
    CURRENT_DATE + INTERVAL '5 days',
    '14:00',
    45,
    100.00,
    'pending',
    'Limpieza dental de rutina'
);

-- =====================================================
-- SAMPLE REVIEWS
-- =====================================================
INSERT INTO public.reviews (
    booking_id, client_id, professional_id, rating, comment
) VALUES
(
    '2ce5107f-1711-4165-89fc-3a33602aaedd',
    'dca7a837-7491-4c70-9f09-7bce0ccfb5a3',
    '754bd528-cd94-43e1-bcb5-9afae8b0fce8',
    5,
    'Excelente atención del Dr. Pérez. Muy profesional y explicó todo detalladamente.'
);

-- Update booking status to completed for the reviewed booking
UPDATE public.bookings 
SET status = 'completed' 
WHERE id = '2ce5107f-1711-4165-89fc-3a33602aaedd';
