"use client"

import { useState, useEffect } from "react"
import type {
  Company,
  CompanyProfessional,
  CompanyBooking,
  CompanyStats,
  WeeklyTrend,
  ProfessionalPerformance,
  ServiceDemand,
  HourlyUtilization,
} from "@/types/company"
import type { Client } from "@/types/professional"

export function useCompanyData() {
  const [company, setCompany] = useState<Company | null>(null)
  const [professionals, setProfessionals] = useState<CompanyProfessional[]>([])
  const [bookings, setBookings] = useState<CompanyBooking[]>([])
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    loadMockData()
  }, [])

  const loadMockData = () => {
    const mockCompany: Company = {
      id: "1",
      name: "Clínica Centro",
      email: "admin@clinicacentro.com",
      phone: "+1234567893",
      address: "Av. Principal 123, Centro, Ciudad",
      website: "www.clinicacentro.com",
      capacity: 50,
      foundedYear: 2019,
      description: "Clínica médica integral con servicios especializados y atención de calidad.",
      services: ["Medicina General", "Nutrición", "Dermatología"],
      schedule: {
        monday: { open: "08:00", close: "18:00", isOpen: true },
        tuesday: { open: "08:00", close: "18:00", isOpen: true },
        wednesday: { open: "08:00", close: "18:00", isOpen: true },
        thursday: { open: "08:00", close: "18:00", isOpen: true },
        friday: { open: "08:00", close: "18:00", isOpen: true },
        saturday: { open: "08:00", close: "14:00", isOpen: true },
        sunday: { open: "09:00", close: "13:00", isOpen: false },
      },
      professionals: [],
      totalBookings: 156,
      monthlyRevenue: 18750,
      rating: 4.7,
    }

    const mockProfessionals: CompanyProfessional[] = [
      {
        id: "1",
        name: "Dr. Juan Pérez",
        title: "Médico General",
        email: "doctor@clinica.com",
        phone: "+1234567890",
        specialties: ["Medicina General", "Medicina Preventiva"],
        isActive: true,
        todayBookings: 5,
        weeklyBookings: 18,
        monthlyRevenue: 4500,
        rating: 4.8,
        joinedDate: "2023-01-15",
      },
      {
        id: "2",
        name: "Nut. Carlos Ruiz",
        title: "Nutricionista",
        email: "carlos.ruiz@email.com",
        phone: "+1234567896",
        specialties: ["Nutrición Clínica", "Nutrición Deportiva", "Pérdida de Peso"],
        isActive: true,
        todayBookings: 3,
        weeklyBookings: 12,
        monthlyRevenue: 2800,
        rating: 4.7,
        joinedDate: "2023-03-20",
      },
      {
        id: "3",
        name: "Dra. Ana López",
        title: "Dermatóloga",
        email: "ana.lopez@email.com",
        phone: "+1234567897",
        specialties: ["Dermatología General", "Dermatología Estética"],
        isActive: false,
        todayBookings: 0,
        weeklyBookings: 8,
        monthlyRevenue: 3200,
        rating: 4.9,
        joinedDate: "2023-02-10",
      },
    ]

    const mockBookings: CompanyBooking[] = [
      {
        id: "1",
        clientId: "1",
        clientName: "María García",
        clientEmail: "maria.garcia@email.com",
        clientPhone: "+1234567890",
        serviceId: "1",
        serviceName: "Consulta Médica General",
        date: "2025-01-15",
        time: "10:00",
        duration: 30,
        price: 150,
        status: "confirmed",
        workplaceId: "1",
        workplaceName: "Clínica Centro",
        professionalId: "1",
        professionalName: "Dr. Juan Pérez",
        notes: "Primera consulta",
      },
      {
        id: "2",
        clientId: "2",
        clientName: "Carlos López",
        clientEmail: "carlos.lopez@email.com",
        clientPhone: "+1234567891",
        serviceId: "2",
        serviceName: "Consulta Nutricional",
        date: "2025-01-15",
        time: "14:30",
        duration: 45,
        price: 120,
        status: "pending",
        workplaceId: "1",
        workplaceName: "Clínica Centro",
        professionalId: "2",
        professionalName: "Nut. Carlos Ruiz",
      },
      {
        id: "3",
        clientId: "3",
        clientName: "Ana Martínez",
        clientEmail: "ana.martinez@email.com",
        clientPhone: "+1234567892",
        serviceId: "3",
        serviceName: "Chequeo Completo",
        date: "2025-01-16",
        time: "09:00",
        duration: 60,
        price: 300,
        status: "confirmed",
        workplaceId: "1",
        workplaceName: "Clínica Centro",
        professionalId: "1",
        professionalName: "Dr. Juan Pérez",
      },
    ]

    const mockClients: Client[] = [
      {
        id: "1",
        name: "María García",
        email: "maria.garcia@email.com",
        phone: "+1234567890",
        createdAt: "2024-12-01",
      },
      {
        id: "2",
        name: "Carlos López",
        email: "carlos.lopez@email.com",
        phone: "+1234567891",
        createdAt: "2024-11-15",
      },
      {
        id: "3",
        name: "Ana Martínez",
        email: "ana.martinez@email.com",
        phone: "+1234567892",
        createdAt: "2024-10-20",
      },
    ]

    setCompany(mockCompany)
    setProfessionals(mockProfessionals)
    setBookings(mockBookings)
    setClients(mockClients)
  }

  const getCompanyStats = (): CompanyStats => {
    const today = new Date().toISOString().split("T")[0]
    const todayBookings = bookings.filter((b) => b.date === today)
    const pendingBookings = bookings.filter((b) => b.status === "pending")
    const activeProfessionals = professionals.filter((p) => p.isActive)
    const completedBookings = bookings.filter((b) => b.status === "completed")
    const cancelledBookings = bookings.filter((b) => b.status === "cancelled")

    return {
      todayBookings: todayBookings.length,
      pendingBookings: pendingBookings.length,
      monthlyRevenue: company?.monthlyRevenue || 0,
      activeProfessionals: activeProfessionals.length,
      totalProfessionals: professionals.length,
      completionRate: bookings.length > 0 ? Math.round((completedBookings.length / bookings.length) * 100) : 0,
      cancellationRate: bookings.length > 0 ? Math.round((cancelledBookings.length / bookings.length) * 100) : 0,
      averageRating: company?.rating || 0,
    }
  }

  const getWeeklyTrend = (): WeeklyTrend[] => {
    return [
      { day: "Lun", bookings: 12, revenue: 1440 },
      { day: "Mar", bookings: 15, revenue: 1800 },
      { day: "Mié", bookings: 18, revenue: 2160 },
      { day: "Jue", bookings: 14, revenue: 1680 },
      { day: "Vie", bookings: 16, revenue: 1920 },
      { day: "Sáb", bookings: 8, revenue: 960 },
      { day: "Dom", bookings: 4, revenue: 480 },
    ]
  }

  const getProfessionalPerformance = (): ProfessionalPerformance[] => {
    return professionals.map((prof) => ({
      professionalId: prof.id,
      name: prof.name,
      bookings: prof.weeklyBookings,
      revenue: prof.monthlyRevenue,
      completionRate: 95, // Mock data
      rating: prof.rating,
    }))
  }

  const getServiceDemand = (): ServiceDemand[] => {
    return [
      { serviceName: "Consulta Médica General", bookings: 32, revenue: 4800, duration: 30 },
      { serviceName: "Consulta Nutricional", bookings: 22, revenue: 2640, duration: 45 },
      { serviceName: "Chequeo Médico Completo", bookings: 18, revenue: 5400, duration: 60 },
      { serviceName: "Tratamiento Dermatológico", bookings: 24, revenue: 4320, duration: 40 },
    ]
  }

  const getHourlyUtilization = (): HourlyUtilization[] => {
    return [
      { timeSlot: "08:00-10:00", bookings: 25, utilization: 85 },
      { timeSlot: "10:00-12:00", bookings: 30, utilization: 92 },
      { timeSlot: "12:00-14:00", bookings: 15, utilization: 48 },
      { timeSlot: "14:00-16:00", bookings: 42, utilization: 95 },
      { timeSlot: "16:00-18:00", bookings: 32, utilization: 78 },
    ]
  }

  const addProfessional = (professional: Omit<CompanyProfessional, "id" | "joinedDate">) => {
    const newProfessional: CompanyProfessional = {
      ...professional,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString(),
      todayBookings: 0,
      weeklyBookings: 0,
      monthlyRevenue: 0,
      rating: 0,
    }
    setProfessionals((prev) => [...prev, newProfessional])
    return newProfessional
  }

  const updateProfessional = (id: string, updates: Partial<CompanyProfessional>) => {
    setProfessionals((prev) => prev.map((prof) => (prof.id === id ? { ...prof, ...updates } : prof)))
  }

  const addClient = (client: Omit<Client, "id" | "createdAt">) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setClients((prev) => [...prev, newClient])
    return newClient
  }

  const addBooking = (booking: Omit<CompanyBooking, "id">) => {
    const newBooking: CompanyBooking = {
      ...booking,
      id: Date.now().toString(),
    }
    setBookings((prev) => [...prev, newBooking])
  }

  const updateBookingStatus = (id: string, status: CompanyBooking["status"]) => {
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)))
  }

  return {
    company,
    professionals,
    bookings,
    clients,
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
  }
}
