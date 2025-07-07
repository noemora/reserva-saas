"use client"

import { useEffect } from "react"
import { CompanyHeader } from "./company-header"
import { CompanyNavigation } from "./company-navigation"
import { CompanyDashboardView } from "./dashboard/company-dashboard-view"
import { CompanyBookingsManagement } from "./bookings/company-bookings-management"
import { CompanyProfessionalsManagement } from "./professionals/company-professionals-management"
import { CompanyStatistics } from "./statistics/company-statistics"
import { CompanyProfile } from "./profile/company-profile"
import { useCompanyStore } from "@/lib/stores/company-store"
import { useAuthStore } from "@/lib/stores/auth-store"

export function CompanyDashboard() {
  const { signOut } = useAuthStore()
  const {
    company,
    professionals,
    bookings,
    clients,
    activeTab,
    setActiveTab,
    getCompanyStats,
    getWeeklyTrend,
    getProfessionalPerformance,
    getServiceDemand,
    getHourlyUtilization,
    addProfessional,
    updateProfessional,
    addClient,
    addBooking,
    updateBookingStatus,
    loadMockData,
  } = useCompanyStore()

  // Load mock data on mount
  useEffect(() => {
    if (!company) {
      loadMockData()
    }
  }, [company, loadMockData])

  // Loading guard
  if (!company) {
    return <div className="flex items-center justify-center h-screen">Cargando…</div>
  }

  // Helpers
  const stats = getCompanyStats()
  const weeklyTrend = getWeeklyTrend()
  const professionalPerformance = getProfessionalPerformance()
  const serviceDemand = getServiceDemand()
  const hourlyUtilization = getHourlyUtilization()

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <CompanyDashboardView
            stats={stats}
            weeklyTrend={weeklyTrend}
            professionalPerformance={professionalPerformance}
            serviceDemand={serviceDemand}
            hourlyUtilization={hourlyUtilization}
          />
        )
      case "bookings":
        return (
          <CompanyBookingsManagement
            bookings={bookings}
            clients={clients}
            professionals={professionals}
            onAddClient={addClient}
            onAddBooking={addBooking}
            onUpdateBookingStatus={updateBookingStatus}
          />
        )
      case "professionals":
        return (
          <CompanyProfessionalsManagement
            professionals={professionals}
            onAddProfessional={addProfessional}
            onUpdateProfessional={updateProfessional}
          />
        )
      case "statistics":
        return (
          <CompanyStatistics
            stats={stats}
            weeklyTrend={weeklyTrend}
            professionalPerformance={professionalPerformance}
            serviceDemand={serviceDemand}
            hourlyUtilization={hourlyUtilization}
          />
        )
      case "profile":
        return <CompanyProfile company={company} />
      default:
        return (
          <CompanyDashboardView
            stats={stats}
            weeklyTrend={weeklyTrend}
            professionalPerformance={professionalPerformance}
            serviceDemand={serviceDemand}
            hourlyUtilization={hourlyUtilization}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyHeader company={company} onLogout={signOut} />

      <div className="flex">
        <CompanyNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
