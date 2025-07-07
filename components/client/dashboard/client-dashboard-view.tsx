"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, User, Scissors, Plus, ArrowRight, Star, CheckCircle, Briefcase } from "lucide-react"
import { useClientStore } from "@/lib/stores/client-store"
import { useAuthStore } from "@/lib/stores/auth-store"

export function ClientDashboardView() {
  const { setActiveTab } = useClientStore()
  const { profile } = useAuthStore()

  const handleNewBooking = () => {
    setActiveTab("bookings")
  }

  const handleViewBookings = () => {
    setActiveTab("bookings")
  }

  // Mock data - en producción vendría del store o API
  const stats = [
    {
      title: "Citas Completadas",
      value: "12",
      change: "+2 este mes",
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      title: "Próximas Citas",
      value: "3",
      change: "Esta semana",
      icon: Calendar,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      title: "Profesionales",
      value: "5",
      change: "Favoritos",
      icon: User,
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
    },
    {
      title: "Servicios Usados",
      value: "8",
      change: "Diferentes",
      icon: Briefcase,
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-50 to-amber-50",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      service: "Corte de Cabello",
      professional: "María González",
      date: "2024-01-15",
      time: "10:00",
      location: "Salón Central",
      status: "confirmed",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 2,
      service: "Manicure",
      professional: "Carlos Ruiz",
      date: "2024-01-18",
      time: "14:30",
      location: "Spa Norte",
      status: "pending",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: 3,
      service: "Masaje Relajante",
      professional: "Ana Martín",
      date: "2024-01-20",
      time: "16:00",
      location: "Centro de Bienestar",
      status: "confirmed",
      avatar: "/placeholder-user.jpg",
    },
  ]

  const featuredServices = [
    {
      name: "Peluquería",
      description: "Cortes y peinados profesionales",
      icon: "✂️",
      gradient: "from-pink-500 to-rose-600",
      professionals: 8,
      rating: 4.9,
    },
    {
      name: "Spa & Bienestar",
      description: "Relajación y cuidado personal",
      icon: "🧘‍♀️",
      gradient: "from-purple-500 to-indigo-600",
      professionals: 6,
      rating: 4.8,
    },
    {
      name: "Estética",
      description: "Tratamientos de belleza",
      icon: "💅",
      gradient: "from-blue-500 to-cyan-600",
      professionals: 5,
      rating: 4.9,
    },
    {
      name: "Fitness",
      description: "Entrenamiento personalizado",
      icon: "💪",
      gradient: "from-green-500 to-teal-600",
      professionals: 12,
      rating: 4.7,
    },
    {
      name: "Consultoría",
      description: "Asesoramiento profesional",
      icon: "💼",
      gradient: "from-orange-500 to-red-600",
      professionals: 4,
      rating: 4.8,
    },
    {
      name: "Educación",
      description: "Clases y tutorías",
      icon: "📚",
      gradient: "from-indigo-500 to-purple-600",
      professionals: 7,
      rating: 4.9,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmada</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleDateString("es-ES", { month: "short" }).toUpperCase(),
      weekday: date.toLocaleDateString("es-ES", { weekday: "short" }).toUpperCase(),
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
        <div className="relative px-6 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">
              {getGreeting()}, {profile?.full_name?.split(" ")[0] || "Usuario"} 👋
            </h1>
            <p className="text-xl text-blue-100 mb-8">Encuentra y agenda servicios con los mejores profesionales</p>
            <Button
              onClick={handleNewBooking}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="mr-2 h-5 w-5" />
              Nueva Cita
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={index}
                className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Upcoming Appointments */}
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Próximas Citas
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={handleViewBookings}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Ver todas
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg mb-2">No tienes citas programadas</p>
                  <p className="text-gray-400 text-sm mb-4">¡Es un buen momento para agendar una!</p>
                  <Button
                    onClick={handleNewBooking}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agendar Cita
                  </Button>
                </div>
              ) : (
                upcomingAppointments.map((appointment) => {
                  const dateInfo = formatDate(appointment.date)
                  return (
                    <div
                      key={appointment.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white shadow-lg">
                          <span className="text-lg font-bold">{dateInfo.day}</span>
                          <span className="text-xs">{dateInfo.month}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{appointment.service}</h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{appointment.professional}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate">{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                      <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.professional} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                          {appointment.professional
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Featured Services */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Scissors className="h-5 w-5 text-blue-600" />
              Servicios Destacados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service, index) => (
                <div
                  key={index}
                  className={`relative p-6 rounded-xl bg-gradient-to-br ${service.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
                >
                  <div className="absolute top-4 right-4 text-2xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg">{service.name}</h3>
                    <p className="text-sm text-white/90 leading-relaxed">{service.description}</p>
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>{service.professionals} profesionales</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{service.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                    onClick={handleNewBooking}
                  >
                    Agendar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
