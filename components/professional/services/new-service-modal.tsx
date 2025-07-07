"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle2 } from "lucide-react"
import type { Service, Workplace, ServiceSchedule } from "@/types/professional"

interface NewServiceModalProps {
  open: boolean
  onClose: () => void
  selectedWorkplace?: Workplace
  onAddService: (service: Omit<Service, "id">) => void
}

export function NewServiceModal({ open, onClose, selectedWorkplace, onAddService }: NewServiceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    category: "",
  })

  const [schedule, setSchedule] = useState<ServiceSchedule>({
    monday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
    tuesday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
    wednesday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
    thursday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
    friday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
    saturday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
    sunday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
  })

  const categories = [
    "Medicina General",
    "Nutrición",
    "Terapia Física",
    "Cardiología",
    "Dermatología",
    "Psicología",
    "Laboratorio",
  ]

  const dayLabels = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  }

  const dayIcons = {
    monday: "L",
    tuesday: "M",
    wednesday: "X",
    thursday: "J",
    friday: "V",
    saturday: "S",
    sunday: "D",
  }

  // Generar opciones de tiempo cada 30 minutos
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        options.push({ value: timeString, label: displayTime })
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedWorkplace) return

    const newService: Omit<Service, "id"> = {
      name: formData.name,
      description: formData.description,
      duration: Number.parseInt(formData.duration),
      price: Number.parseFloat(formData.price),
      category: formData.category,
      isActive: true,
      workplaceId: selectedWorkplace.id,
      schedule: schedule,
    }

    onAddService(newService)

    // Reset form
    setFormData({
      name: "",
      description: "",
      duration: "",
      price: "",
      category: "",
    })
    setSchedule({
      monday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
      tuesday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
      wednesday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
      thursday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
      friday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
      saturday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
      sunday: { isAvailable: false, startTime: "", endTime: "", breakStart: "", breakEnd: "" },
    })

    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleScheduleChange = (
    day: string,
    field: "isAvailable" | "startTime" | "endTime" | "breakStart" | "breakEnd",
    value: string | boolean,
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
  }

  const toggleDayAvailability = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable,
        // Si se desactiva, limpiar horarios
        ...(prev[day].isAvailable ? { startTime: "", endTime: "", breakStart: "", breakEnd: "" } : {}),
      },
    }))
  }

  const getActiveDaysCount = () => {
    return Object.values(schedule).filter((day) => day.isAvailable).length
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Servicio</DialogTitle>
          <p className="text-gray-600">Crea un nuevo servicio para {selectedWorkplace?.name}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Información Básica */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Información del Servicio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="serviceName">Nombre del Servicio</Label>
                    <Input
                      id="serviceName"
                      placeholder="Ej: Consulta Médica General"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe el servicio que se ofrece..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duración (minutos)</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="30"
                        value={formData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Precio ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleccionar categoría..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Horarios de Trabajo */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Horarios de Trabajo
                    <Badge variant="outline" className="ml-auto">
                      {getActiveDaysCount()} días activos
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600">Configura los días y horarios en que ofreces este servicio</p>
                </CardHeader>
                <CardContent>
                  {/* Selector rápido de días */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium mb-3 block">Días de trabajo</Label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(schedule).map(([day, daySchedule]) => (
                        <Button
                          key={day}
                          type="button"
                          variant={daySchedule.isAvailable ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleDayAvailability(day)}
                          className={`relative ${
                            daySchedule.isAvailable ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-50"
                          }`}
                        >
                          {daySchedule.isAvailable && (
                            <CheckCircle2 className="w-3 h-3 absolute -top-1 -right-1 bg-green-500 text-white rounded-full" />
                          )}
                          <span className="font-medium">{dayIcons[day as keyof typeof dayIcons]}</span>
                          <span className="ml-1 text-xs">{dayLabels[day as keyof typeof dayLabels].slice(0, 3)}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Configuración detallada por tabs */}
                  <Tabs defaultValue="monday" className="w-full">
                    <TabsList className="grid w-full grid-cols-7 mb-4">
                      {Object.entries(dayLabels).map(([day, label]) => (
                        <TabsTrigger
                          key={day}
                          value={day}
                          className={`text-xs ${
                            schedule[day as keyof typeof schedule].isAvailable
                              ? "data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                              : "opacity-50"
                          }`}
                        >
                          {label.slice(0, 3)}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {Object.entries(schedule).map(([day, daySchedule]) => (
                      <TabsContent key={day} value={day} className="space-y-4">
                        {daySchedule.isAvailable ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Hora de Inicio</Label>
                                <Select
                                  value={daySchedule.startTime || "00:00"}
                                  onValueChange={(value) => handleScheduleChange(day, "startTime", value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Seleccionar hora..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Hora de Fin</Label>
                                <Select
                                  value={daySchedule.endTime || "00:00"}
                                  onValueChange={(value) => handleScheduleChange(day, "endTime", value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Seleccionar hora..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <Label className="text-sm font-medium mb-2 block">Horario de Descanso (Opcional)</Label>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-xs text-gray-600">Inicio Descanso</Label>
                                  <Select
                                    value={daySchedule.breakStart || "00:00"}
                                    onValueChange={(value) => handleScheduleChange(day, "breakStart", value)}
                                  >
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Sin descanso" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="00:00">Sin descanso</SelectItem>
                                      {timeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-600">Fin Descanso</Label>
                                  <Select
                                    value={daySchedule.breakEnd || "00:00"}
                                    onValueChange={(value) => handleScheduleChange(day, "breakEnd", value)}
                                  >
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Sin descanso" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="00:00">Sin descanso</SelectItem>
                                      {timeOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>

                            {/* Resumen del día */}
                            {daySchedule.startTime && daySchedule.endTime && (
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-sm text-blue-800">
                                  <strong>{dayLabels[day as keyof typeof dayLabels]}:</strong> {daySchedule.startTime} -{" "}
                                  {daySchedule.endTime}
                                  {daySchedule.breakStart && daySchedule.breakEnd && (
                                    <span className="ml-2 text-blue-600">
                                      (Descanso: {daySchedule.breakStart} - {daySchedule.breakEnd})
                                    </span>
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">
                              No disponible los {dayLabels[day as keyof typeof dayLabels].toLowerCase()}
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => toggleDayAvailability(day)}
                              className="mt-2"
                            >
                              Activar {dayLabels[day as keyof typeof dayLabels]}
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Crear Servicio
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
