"use client"

import { useState, useEffect } from "react"
import type { Professional, Workplace, Service, Booking, Client, DashboardStats } from "@/types/professional"

export function useProfessionalData() {
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [workplaces, setWorkplaces] = useState<Workplace[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>("")

  useEffect(() => {
    // Simular carga de datos
    loadMockData()
  }, [])

  const loadMockData = () => {
    const mockProfessional: Professional = {
      id: "1",
      name: "Dr. Juan Pérez",
      title: "Médico General",
      email: "doctor@clinica.com",
      phone: "+1234567890",
      licenseNumber: "MP-1234",
      experience: 15,
      education: "Universidad Nacional - Medicina",
      specialties: ["Medicina General", "Medicina Preventiva"],
      biography:
        "Médico especializado en medicina general con amplia experiencia en diagnóstico y tratamiento de diversas patologías.",
      rating: 4.8,
      totalBookings: 156,
      memberSince: "Enero 2023",
      workplaces: [],
    }

    const mockWorkplaces: Workplace[] = [
      {
        id: "1",
        name: "Clínica Centro",
        address: "Av. Principal 123, Centro, Ciudad",
        description: "Nuestra sede principal ubicada en el centro de la ciudad",
        phone: "+1234567890",
        email: "centro@clinica.com",
        schedule: "08:00 - 18:00",
        services: ["Consulta Médica General", "Consulta Nutricional"],
        isActive: true,
      },
      {
        id: "2",
        name: "Centro Rehabilitación",
        address: "Calle Salud 456, Norte, Ciudad",
        description: "Centro especializado en terapias de rehabilitación",
        phone: "+1234567891",
        email: "rehabilitacion@clinica.com",
        schedule: "07:00 - 19:00",
        services: ["Terapia Física"],
        isActive: true,
      },
      {
        id: "3",
        name: "Laboratorio Central",
        address: "Plaza Médica 789, Sur, Ciudad",
        description: "Laboratorio clínico con equipos de última generación",
        phone: "+1234567892",
        email: "laboratorio@clinica.com",
        schedule: "06:00 - 14:00",
        services: ["Exámenes de Laboratorio"],
        isActive: true,
      },
    ]

    const mockServices: Service[] = [
      {
        id: "1",
        name: "Consulta Médica General",
        description: "Consulta médica integral con revisión completa del estado de salud",
        duration: 30,
        price: 150,
        category: "Medicina General",
        isActive: true,
        workplaceId: "1",
        schedule: {
          monday: { isAvailable: true, startTime: "08:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
          tuesday: { isAvailable: true, startTime: "08:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
          wednesday: {
            isAvailable: true,
            startTime: "08:00",
            endTime: "17:00",
            breakStart: "12:00",
            breakEnd: "13:00",
          },
          thursday: { isAvailable: true, startTime: "08:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
          friday: { isAvailable: true, startTime: "08:00", endTime: "17:00", breakStart: "12:00", breakEnd: "13:00" },
          saturday: { isAvailable: true, startTime: "08:00", endTime: "12:00" },
          sunday: { isAvailable: false, startTime: "", endTime: "" },
        },
      },
      {
        id: "2",
        name: "Chequeo Médico Completo",
        description: "Evaluación médica exhaustiva con análisis de laboratorio incluidos",
        duration: 60,
        price: 300,
        category: "Medicina General",
        isActive: true,
        workplaceId: "1",
        schedule: {
          monday: { isAvailable: true, startTime: "09:00", endTime: "16:00", breakStart: "12:00", breakEnd: "13:00" },
          tuesday: { isAvailable: true, startTime: "09:00", endTime: "16:00", breakStart: "12:00", breakEnd: "13:00" },
          wednesday: { isAvailable: false, startTime: "", endTime: "" },
          thursday: { isAvailable: true, startTime: "09:00", endTime: "16:00", breakStart: "12:00", breakEnd: "13:00" },
          friday: { isAvailable: true, startTime: "09:00", endTime: "16:00", breakStart: "12:00", breakEnd: "13:00" },
          saturday: { isAvailable: false, startTime: "", endTime: "" },
          sunday: { isAvailable: false, startTime: "", endTime: "" },
        },
      },
      {
        id: "3",
        name: "Consulta Nutricional",
        description: "Evaluación nutricional y plan alimentario personalizado",
        duration: 45,
        price: 120,
        category: "Nutrición",
        isActive: true,
        workplaceId: "1",
        schedule: {
          monday: { isAvailable: true, startTime: "14:00", endTime: "18:00" },
          tuesday: { isAvailable: true, startTime: "14:00", endTime: "18:00" },
          wednesday: { isAvailable: true, startTime: "14:00", endTime: "18:00" },
          thursday: { isAvailable: true, startTime: "14:00", endTime: "18:00" },
          friday: { isAvailable: true, startTime: "14:00", endTime: "18:00" },
          saturday: { isAvailable: false, startTime: "", endTime: "" },
          sunday: { isAvailable: false, startTime: "", endTime: "" },
        },
      },
    ]

    const mockBookings: Booking[] = [
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
        notes: "Primera consulta",
      },
      {
        id: "2",
        clientId: "2",
        clientName: "Carlos López",
        clientEmail: "carlos.lopez@email.com",
        clientPhone: "+1234567891",
        serviceId: "2",
        serviceName: "Chequeo Médico Completo",
        date: "2025-01-15",
        time: "14:30",
        duration: 60,
        price: 300,
        status: "pending",
        workplaceId: "1",
        workplaceName: "Clínica Centro",
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

    setProfessional(mockProfessional)
    setWorkplaces(mockWorkplaces)
    setServices(mockServices)
    setBookings(mockBookings)
    setClients(mockClients)
    setSelectedWorkplace("1")
  }

  const getDashboardStats = (): DashboardStats => {
    const today = new Date().toISOString().split("T")[0]
    const todayBookings = bookings.filter((b) => b.date === today)
    const pendingBookings = bookings.filter((b) => b.status === "pending")

    return {
      todayAppointments: todayBookings.length,
      pendingBookings: pendingBookings.length,
      weeklyAppointments: 32, // Mock data
      monthlyRevenue: 4800, // Mock data
    }
  }

  const addService = (service: Omit<Service, "id">) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
    }
    setServices((prev) => [...prev, newService])
  }

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((service) => (service.id === id ? { ...service, ...updates } : service)))
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

  const addBooking = (booking: Omit<Booking, "id">) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
    }
    setBookings((prev) => [...prev, newBooking])
  }

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)))
  }

  return {
    professional,
    workplaces,
    services,
    bookings,
    clients,
    selectedWorkplace,
    setSelectedWorkplace,
    getDashboardStats,
    addService,
    updateService,
    addClient,
    addBooking,
    updateBookingStatus,
  }
}
