"use client"

import { useEffect } from "react"
import { ProfessionalHeader } from "./professional-header"
import { ProfessionalNavigation } from "./professional-navigation"
import { Dashboard } from "./dashboard/dashboard"
import { BookingsManagement } from "./bookings/bookings-management"
import { CalendarView } from "./calendar/calendar-view"
import { LocationsManagement } from "./locations/locations-management"
import { ServicesManagement } from "./services/services-management"
import { ProfessionalProfile } from "./profile/professional-profile"
import { ProfessionalStatistics } from "./statistics/professional-statistics"
import { ClinicSelection } from "./clinic-selection"
import { useProfessionalStore } from "@/lib/stores/professional-store"
import { useAuthStore } from "@/lib/stores/auth-store"

export function ProfessionalDashboard() {
  const { signOut } = useAuthStore()
  const {
    professional,
    workplaces,
    services,
    bookings,
    clients,
    selectedWorkplace,
    hasSelectedClinic,
    activeTab,
    setSelectedWorkplace,
    setHasSelectedClinic,
    setActiveTab,
    getDashboardStats,
    addService,
    updateService,
    addClient,
    addBooking,
    updateBookingStatus,
    loadMockData,
  } = useProfessionalStore()

  // Load mock data on mount
  useEffect(() => {
    if (!professional) {
      loadMockData()
    }
  }, [professional, loadMockData])

  // Loading guard
  if (!professional) {
    return <div className="flex items-center justify-center h-screen">Cargando…</div>
  }

  // Clinic selection logic
  if (!hasSelectedClinic) {
    return <ClinicSelection onContinue={() => setHasSelectedClinic(true)} />
  }

  // Helpers
  const stats = getDashboardStats()
  const currentWorkplace = workplaces.find((w) => w.id === selectedWorkplace)

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard stats={stats} bookings={bookings} selectedWorkplace={currentWorkplace} />
      case "bookings":
        return (
          <BookingsManagement
            bookings={bookings}
            clients={clients}
            services={services}
            workplaces={workplaces}
            onAddClient={addClient}
            onAddBooking={addBooking}
            onUpdateBookingStatus={updateBookingStatus}
          />
        )
      case "calendar":
        return <CalendarView bookings={bookings} />
      case "locations":
        return <LocationsManagement workplaces={workplaces} />
      case "services":
        return (
          <ServicesManagement
            services={services}
            workplaces={workplaces}
            onAddService={addService}
            onUpdateService={updateService}
          />
        )
      case "statistics":
        return <ProfessionalStatistics bookings={bookings} services={services} workplaces={workplaces} stats={stats} />
      case "profile":
        return <ProfessionalProfile professional={professional} />
      default:
        return <Dashboard stats={stats} bookings={bookings} selectedWorkplace={currentWorkplace} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfessionalHeader
        professional={professional}
        workplaces={workplaces}
        selectedWorkplace={selectedWorkplace}
        onWorkplaceChange={setSelectedWorkplace}
        onLogout={signOut}
      />

      <div className="flex">
        <ProfessionalNavigation activeTab={activeTab} onTabChange={setActiveTab} selectedWorkplace={currentWorkplace} />

        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
