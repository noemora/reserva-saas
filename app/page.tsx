"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { AuthGuard } from "@/components/auth/auth-guard"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { ClientDashboard } from "@/components/client/client-dashboard"
import { ProfessionalDashboard } from "@/components/professional/professional-dashboard"
import { CompanyDashboard } from "@/components/company/company-dashboard"
import { ClinicSelection } from "@/components/professional/clinic-selection"
import { Button } from "@/components/ui/button"

function AuthenticatedApp() {
  const { profile, signOut } = useAuth()
  const [currentView, setCurrentView] = useState<
    "client-dashboard" | "professional-dashboard" | "company-dashboard" | "clinic-selection"
  >(() => {
    if (!profile) return "client-dashboard"

    switch (profile.user_type) {
      case "Cliente":
        return "client-dashboard"
      case "Profesional":
        return "clinic-selection"
      case "Empresa":
        return "company-dashboard"
      default:
        return "client-dashboard"
    }
  })

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Error: No se pudo cargar el perfil</p>
          <Button onClick={signOut} className="mt-4">
            Cerrar sesión
          </Button>
        </div>
      </div>
    )
  }

  const handleClinicSelection = () => {
    setCurrentView("professional-dashboard")
  }

  // Convertir profile a formato esperado por los dashboards
  const userData = {
    id: profile.id,
    name: profile.full_name || "Usuario",
    email: profile.email,
    phone: profile.phone || "",
    userType: profile.user_type,
    avatar: profile.avatar_url || "/placeholder.svg?height=40&width=40",
    memberSince: profile.created_at
      ? new Date(profile.created_at).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
        })
      : "Reciente",
    totalBookings: 0,
  }

  const handleLogout = async () => {
    await signOut()
  }

  switch (currentView) {
    case "client-dashboard":
      return <ClientDashboard user={userData} onLogout={handleLogout} />
    case "clinic-selection":
      return <ClinicSelection onContinue={handleClinicSelection} />
    case "professional-dashboard":
      return <ProfessionalDashboard user={userData} onLogout={handleLogout} />
    case "company-dashboard":
      return <CompanyDashboard user={userData} onLogout={handleLogout} />
    default:
      return <ClientDashboard user={userData} onLogout={handleLogout} />
  }
}

function AuthWrapper() {
  const [showRegister, setShowRegister] = useState(false)

  return (
    <AuthGuard
      fallback={
        <div>
          {showRegister ? (
            <div>
              <RegisterForm onSuccess={() => setShowRegister(false)} />
              <div className="fixed bottom-4 right-4">
                <Button variant="outline" onClick={() => setShowRegister(false)}>
                  ¿Ya tienes cuenta? Inicia sesión
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <LoginForm onSuccess={() => {}} />
              <div className="fixed bottom-4 right-4">
                <Button variant="outline" onClick={() => setShowRegister(true)}>
                  ¿No tienes cuenta? Regístrate
                </Button>
              </div>
            </div>
          )}
        </div>
      }
    >
      <AuthenticatedApp />
    </AuthGuard>
  )
}

export default function Home() {
  const { session, signIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.replace("/dashboard")
    }
  }, [session, router])

  const handleLogin = () => {
    router.push("/auth/login")
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Bienvenido al sistema de reservas</h1>
      <Button onClick={handleLogin}>Iniciar sesión demo</Button>
    </main>
  )
}
