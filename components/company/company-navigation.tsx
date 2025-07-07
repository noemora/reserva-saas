"use client"

interface CompanyNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function CompanyNavigation({ activeTab, onTabChange }: CompanyNavigationProps) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "bookings", label: "Reservas" },
    { id: "professionals", label: "Profesionales" },
    { id: "statistics", label: "Estadísticas" },
    { id: "profile", label: "Mi Perfil" },
  ]

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="py-4">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
