import type { BookingService, BookingLocation, BookingProfessional } from "@/types/booking"

export class BookingDataService {
  static getServices(): BookingService[] {
    return [
      {
        id: "1",
        name: "Consulta Médica General",
        description: "Consulta médica general para diagnóstico y tratamiento",
        duration: 30, // En minutos
        professionals: ["Dr. Juan Pérez", "Dra. Ana López"],
        price: 150,
        category: "Consulta",
        locations: ["1", "2"],
      },
      {
        id: "2",
        name: "Chequeo Médico Completo",
        description: "Evaluación médica integral con análisis completo",
        duration: 60,
        professionals: ["Dr. Juan Pérez"],
        price: 300,
        category: "Examen",
        locations: ["1"],
      },
      {
        id: "3",
        name: "Terapia Física",
        description: "Sesión de terapia física para rehabilitación",
        duration: 60,
        professionals: ["Lic. Pedro Martín"],
        price: 200,
        category: "Terapia",
        locations: ["2"],
      },
      {
        id: "4",
        name: "Terapia Deportiva",
        description: "Terapia especializada para atletas y deportistas",
        duration: 45,
        professionals: ["Lic. Pedro Martín", "Lic. María González"],
        price: 180,
        category: "Terapia",
        locations: ["2"],
      },
      {
        id: "5",
        name: "Evaluación Postural",
        description: "Análisis completo de postura y movimiento",
        duration: 45,
        professionals: ["Lic. Pedro Martín"],
        price: 160,
        category: "Evaluación",
        locations: ["2"],
      },
      {
        id: "6",
        name: "Consulta Nutricional",
        description: "Evaluación nutricional y plan alimentario personalizado",
        duration: 45,
        professionals: ["Nut. Carlos Ruiz"],
        price: 140,
        category: "Consulta",
        locations: ["1", "3"],
      },
      {
        id: "7",
        name: "Consulta Dermatológica",
        description: "Evaluación y tratamiento de problemas de la piel",
        duration: 30,
        professionals: ["Dra. Ana López", "Dr. Luis Fernández"],
        price: 180,
        category: "Consulta",
        locations: ["1", "3"],
      },
      {
        id: "8",
        name: "Tratamiento Dermatológico",
        description: "Tratamientos especializados para la piel",
        duration: 40,
        professionals: ["Dra. Ana López"],
        price: 220,
        category: "Tratamiento",
        locations: ["3"],
      },
    ]
  }

  static getLocations(): BookingLocation[] {
    return [
      {
        id: "1",
        name: "Clínica Centro",
        address: "Av. Principal 123",
      },
      {
        id: "2",
        name: "Centro Rehabilitación",
        address: "Calle Salud 456",
      },
      {
        id: "3",
        name: "Clínica Norte",
        address: "Av. Norte 789",
      },
    ]
  }

  static getProfessionals(): BookingProfessional[] {
    return [
      {
        id: "1",
        name: "Dr. Juan Pérez",
        title: "Médico General",
        specialties: ["Medicina General", "Medicina Preventiva"],
        rating: 4.8,
        experience: "15 años",
        locations: ["1"],
        services: [
          {
            id: "1",
            name: "Consulta Médica General",
            schedule: {
              monday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              tuesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              wednesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              thursday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              friday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              saturday: { isAvailable: true, startTime: "08:00", endTime: "12:00" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
          {
            id: "2",
            name: "Chequeo Médico Completo",
            schedule: {
              monday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              tuesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              wednesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              thursday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              friday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              saturday: { isAvailable: false, startTime: "", endTime: "" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
        ],
      },
      {
        id: "2",
        name: "Dra. Ana López",
        title: "Dermatóloga",
        specialties: ["Dermatología General", "Dermatología Estética"],
        rating: 4.9,
        experience: "12 años",
        locations: ["1", "3"],
        services: [
          {
            id: "7",
            name: "Consulta Dermatológica",
            schedule: {
              monday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "16:00",
                breakStart: "13:00",
                breakEnd: "14:00",
              },
              tuesday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "16:00",
                breakStart: "13:00",
                breakEnd: "14:00",
              },
              wednesday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "16:00",
                breakStart: "13:00",
                breakEnd: "14:00",
              },
              thursday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "16:00",
                breakStart: "13:00",
                breakEnd: "14:00",
              },
              friday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "16:00",
                breakStart: "13:00",
                breakEnd: "14:00",
              },
              saturday: { isAvailable: false, startTime: "", endTime: "" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
          {
            id: "8",
            name: "Tratamiento Dermatológico",
            schedule: {
              monday: { isAvailable: true, startTime: "10:00", endTime: "15:00" },
              tuesday: { isAvailable: true, startTime: "10:00", endTime: "15:00" },
              wednesday: { isAvailable: true, startTime: "10:00", endTime: "15:00" },
              thursday: { isAvailable: false, startTime: "", endTime: "" },
              friday: { isAvailable: true, startTime: "10:00", endTime: "15:00" },
              saturday: { isAvailable: false, startTime: "", endTime: "" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
        ],
      },
      {
        id: "3",
        name: "Nut. Carlos Ruiz",
        title: "Nutricionista",
        specialties: ["Nutrición Clínica", "Nutrición Deportiva"],
        rating: 4.7,
        experience: "8 años",
        locations: ["1", "3"],
        services: [
          {
            id: "6",
            name: "Consulta Nutricional",
            schedule: {
              monday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              tuesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              wednesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              thursday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              friday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              saturday: { isAvailable: true, startTime: "08:00", endTime: "12:00" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
        ],
      },
      {
        id: "4",
        name: "Lic. Pedro Martín",
        title: "Fisioterapeuta",
        specialties: ["Fisioterapia", "Rehabilitación"],
        rating: 4.6,
        experience: "10 años",
        locations: ["2"],
        services: [
          {
            id: "3",
            name: "Terapia Física",
            schedule: {
              monday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              tuesday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              wednesday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              thursday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              friday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              saturday: { isAvailable: true, startTime: "08:00", endTime: "14:00" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
          {
            id: "4",
            name: "Terapia Deportiva",
            schedule: {
              monday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              tuesday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              wednesday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              thursday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              friday: {
                isAvailable: true,
                startTime: "07:00",
                endTime: "18:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              saturday: { isAvailable: true, startTime: "08:00", endTime: "14:00" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
          {
            id: "5",
            name: "Evaluación Postural",
            schedule: {
              monday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              tuesday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              wednesday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              thursday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              friday: {
                isAvailable: true,
                startTime: "09:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              saturday: { isAvailable: false, startTime: "", endTime: "" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
        ],
      },
      {
        id: "5",
        name: "Lic. María González",
        title: "Fisioterapeuta",
        specialties: ["Terapia Deportiva", "Rehabilitación"],
        rating: 4.8,
        experience: "7 años",
        locations: ["2"],
        services: [
          {
            id: "4",
            name: "Terapia Deportiva",
            schedule: {
              monday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "16:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              tuesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "16:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              wednesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "16:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              thursday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "16:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              friday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "16:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              saturday: { isAvailable: true, startTime: "09:00", endTime: "13:00" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
        ],
      },
      {
        id: "6",
        name: "Dr. Luis Fernández",
        title: "Dermatólogo",
        specialties: ["Dermatología General", "Cirugía Dermatológica"],
        rating: 4.7,
        experience: "20 años",
        locations: ["3"],
        services: [
          {
            id: "7",
            name: "Consulta Dermatológica",
            schedule: {
              monday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              tuesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              wednesday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              thursday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              friday: {
                isAvailable: true,
                startTime: "08:00",
                endTime: "17:00",
                breakStart: "12:00",
                breakEnd: "13:00",
              },
              saturday: { isAvailable: false, startTime: "", endTime: "" },
              sunday: { isAvailable: false, startTime: "", endTime: "" },
            },
          },
        ],
      },
    ]
  }

  static getCategories(): string[] {
    return [...new Set(this.getServices().map((s) => s.category))]
  }

  static getAllProfessionalNames(): string[] {
    return [...new Set(this.getServices().flatMap((s) => s.professionals))]
  }

  static getAvailableProfessionalsForService(
    service: BookingService,
    location: BookingLocation,
  ): BookingProfessional[] {
    return this.getProfessionals().filter(
      (prof) => service.professionals.includes(prof.name) && prof.locations.includes(location.id),
    )
  }
}
