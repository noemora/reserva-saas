-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- =====================================================
-- COMPANIES POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Companies can view own data" ON public.companies;
DROP POLICY IF EXISTS "Companies can insert own data" ON public.companies;
DROP POLICY IF EXISTS "Companies can update own data" ON public.companies;
DROP POLICY IF EXISTS "Public can view active companies" ON public.companies;

CREATE POLICY "Companies can view own data" ON public.companies
    FOR SELECT USING (auth.uid() = companies.user_id);

CREATE POLICY "Companies can insert own data" ON public.companies
    FOR INSERT WITH CHECK (auth.uid() = companies.user_id);

CREATE POLICY "Companies can update own data" ON public.companies
    FOR UPDATE USING (auth.uid() = companies.user_id);

CREATE POLICY "Public can view active companies" ON public.companies
    FOR SELECT USING (companies.is_active = true);

-- =====================================================
-- COMPANY SCHEDULES POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Companies can manage own schedules" ON public.company_schedules;
DROP POLICY IF EXISTS "Public can view company schedules" ON public.company_schedules;

CREATE POLICY "Companies can manage own schedules" ON public.company_schedules
    FOR ALL USING (
        company_id IN (
            SELECT companies.id FROM public.companies WHERE companies.user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view company schedules" ON public.company_schedules
    FOR SELECT USING (
        company_id IN (
            SELECT companies.id FROM public.companies WHERE companies.is_active = true
        )
    );

-- =====================================================
-- PROFESSIONALS POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Professionals can view own data" ON public.professionals;
DROP POLICY IF EXISTS "Professionals can insert own data" ON public.professionals;
DROP POLICY IF EXISTS "Professionals can update own data" ON public.professionals;
DROP POLICY IF EXISTS "Companies can view their professionals" ON public.professionals;
DROP POLICY IF EXISTS "Public can view active professionals" ON public.professionals;

CREATE POLICY "Professionals can view own data" ON public.professionals
    FOR SELECT USING (auth.uid() = professionals.user_id);

CREATE POLICY "Professionals can insert own data" ON public.professionals
    FOR INSERT WITH CHECK (auth.uid() = professionals.user_id);

CREATE POLICY "Professionals can update own data" ON public.professionals
    FOR UPDATE USING (auth.uid() = professionals.user_id);

CREATE POLICY "Companies can view their professionals" ON public.professionals
    FOR SELECT USING (
        company_id IN (
            SELECT companies.id FROM public.companies WHERE companies.user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view active professionals" ON public.professionals
    FOR SELECT USING (professionals.is_active = true);

-- =====================================================
-- WORKPLACES POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Companies can manage own workplaces" ON public.workplaces;
DROP POLICY IF EXISTS "Professionals can view their workplaces" ON public.workplaces;
DROP POLICY IF EXISTS "Public can view active workplaces" ON public.workplaces;

CREATE POLICY "Companies can manage own workplaces" ON public.workplaces
    FOR ALL USING (
        company_id IN (
            SELECT companies.id FROM public.companies WHERE companies.user_id = auth.uid()
        )
    );

CREATE POLICY "Professionals can view their workplaces" ON public.workplaces
    FOR SELECT USING (
        workplaces.id IN (
            SELECT workplace_id FROM public.professional_workplaces pw
            JOIN public.professionals p ON pw.professional_id = p.id
            WHERE p.user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view active workplaces" ON public.workplaces
    FOR SELECT USING (workplaces.is_active = true);

-- =====================================================
-- PROFESSIONAL WORKPLACES POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Professionals can manage own workplace relations" ON public.professional_workplaces;
DROP POLICY IF EXISTS "Companies can manage their workplace relations" ON public.professional_workplaces;

CREATE POLICY "Professionals can manage own workplace relations" ON public.professional_workplaces
    FOR ALL USING (
        professional_id IN (
            SELECT professionals.id FROM public.professionals WHERE professionals.user_id = auth.uid()
        )
    );

CREATE POLICY "Companies can manage their workplace relations" ON public.professional_workplaces
    FOR ALL USING (
        workplace_id IN (
            SELECT w.id FROM public.workplaces w
            JOIN public.companies c ON w.company_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

-- =====================================================
-- SERVICES POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Professionals can manage own services" ON public.services;
DROP POLICY IF EXISTS "Companies can view their services" ON public.services;
DROP POLICY IF EXISTS "Public can view active services" ON public.services;

CREATE POLICY "Professionals can manage own services" ON public.services
    FOR ALL USING (
        professional_id IN (
            SELECT professionals.id FROM public.professionals WHERE professionals.user_id = auth.uid()
        )
    );

CREATE POLICY "Companies can view their services" ON public.services
    FOR SELECT USING (
        workplace_id IN (
            SELECT w.id FROM public.workplaces w
            JOIN public.companies c ON w.company_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view active services" ON public.services
    FOR SELECT USING (services.is_active = true);

-- =====================================================
-- SERVICE SCHEDULES POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Professionals can manage own service schedules" ON public.service_schedules;
DROP POLICY IF EXISTS "Public can view service schedules" ON public.service_schedules;

CREATE POLICY "Professionals can manage own service schedules" ON public.service_schedules
    FOR ALL USING (
        service_id IN (
            SELECT s.id FROM public.services s
            JOIN public.professionals p ON s.professional_id = p.id
            WHERE p.user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view service schedules" ON public.service_schedules
    FOR SELECT USING (
        service_id IN (
            SELECT services.id FROM public.services WHERE services.is_active = true
        )
    );

-- =====================================================
-- CLIENTS POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Clients can view own data" ON public.clients;
DROP POLICY IF EXISTS "Clients can insert own data" ON public.clients;
DROP POLICY IF EXISTS "Clients can update own data" ON public.clients;
DROP POLICY IF EXISTS "Professionals can view their clients" ON public.clients;
DROP POLICY IF EXISTS "Companies can view their clients" ON public.clients;

CREATE POLICY "Clients can view own data" ON public.clients
    FOR SELECT USING (auth.uid() = clients.user_id);

CREATE POLICY "Clients can insert own data" ON public.clients
    FOR INSERT WITH CHECK (auth.uid() = clients.user_id);

CREATE POLICY "Clients can update own data" ON public.clients
    FOR UPDATE USING (auth.uid() = clients.user_id);

CREATE POLICY "Professionals can view their clients" ON public.clients
    FOR SELECT USING (
        clients.id IN (
            SELECT DISTINCT client_id FROM public.bookings b
            JOIN public.professionals p ON b.professional_id = p.id
            WHERE p.user_id = auth.uid()
        )
    );

CREATE POLICY "Companies can view their clients" ON public.clients
    FOR SELECT USING (
        clients.id IN (
            SELECT DISTINCT client_id FROM public.bookings b
            WHERE b.company_id IN (
                SELECT companies.id FROM public.companies WHERE companies.user_id = auth.uid()
            )
        )
    );

-- =====================================================
-- BOOKINGS POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Clients can view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Clients can insert own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Clients can update own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Professionals can view their bookings" ON public.bookings;
DROP POLICY IF EXISTS "Professionals can update their bookings" ON public.bookings;
DROP POLICY IF EXISTS "Companies can view their bookings" ON public.bookings;
DROP POLICY IF EXISTS "Companies can update their bookings" ON public.bookings;

CREATE POLICY "Clients can view own bookings" ON public.bookings
    FOR SELECT USING (
        client_id IN (
            SELECT clients.id FROM public.clients WHERE clients.user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can insert own bookings" ON public.bookings
    FOR INSERT WITH CHECK (
        client_id IN (
            SELECT clients.id FROM public.clients WHERE clients.user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can update own bookings" ON public.bookings
    FOR UPDATE USING (
        client_id IN (
            SELECT clients.id FROM public.clients WHERE clients.user_id = auth.uid()
        )
    );

CREATE POLICY "Professionals can view their bookings" ON public.bookings
    FOR SELECT USING (
        professional_id IN (
            SELECT professionals.id FROM public.professionals WHERE professionals.user_id = auth.uid()
        )
    );

CREATE POLICY "Professionals can update their bookings" ON public.bookings
    FOR UPDATE USING (
        professional_id IN (
            SELECT professionals.id FROM public.professionals WHERE professionals.user_id = auth.uid()
        )
    );

CREATE POLICY "Companies can view their bookings" ON public.bookings
    FOR SELECT USING (
        company_id IN (
            SELECT companies.id FROM public.companies WHERE companies.user_id = auth.uid()
        )
    );

CREATE POLICY "Companies can update their bookings" ON public.bookings
    FOR UPDATE USING (
        company_id IN (
            SELECT companies.id FROM public.companies WHERE companies.user_id = auth.uid()
        )
    );

-- =====================================================
-- REVIEWS POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Clients can manage own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Professionals can view their reviews" ON public.reviews;
DROP POLICY IF EXISTS "Companies can view their reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can view reviews" ON public.reviews;

CREATE POLICY "Clients can manage own reviews" ON public.reviews
    FOR ALL USING (
        client_id IN (
            SELECT clients.id FROM public.clients WHERE clients.user_id = auth.uid()
        )
    );

CREATE POLICY "Professionals can view their reviews" ON public.reviews
    FOR SELECT USING (
        professional_id IN (
            SELECT professionals.id FROM public.professionals WHERE professionals.user_id = auth.uid()
        )
    );

CREATE POLICY "Companies can view their reviews" ON public.reviews
    FOR SELECT USING (
        professional_id IN (
            SELECT p.id FROM public.professionals p
            JOIN public.companies c ON p.company_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

CREATE POLICY "Public can view reviews" ON public.reviews
    FOR SELECT USING (true);

-- =====================================================
-- NOTIFICATIONS POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = notifications.user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = notifications.user_id);

CREATE POLICY "System can insert notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);
