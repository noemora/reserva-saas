"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, Clock, DollarSign, Tag, Calendar, CheckCircle } from "lucide-react"
import type { Service, ServiceSchedule } from "@/types/professional"

interface EditServiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: Service | null
  workplaces: Array<{ id: string; name: string }>
}

const categories = [
  "Consulta General",
  "Especialidad Médica",
  "Terapia Física",
  "Psicología",
  "Nutrición",
  "Cardiología",
  "Dermatología",
  "Pediatría",
]

const timeOptions = Array.from({ length: 34 }, (_, i) => {
  const hour = Math.floor(i / 2) + 6
  const minute = i % 2 === 0 ? "00" : "30"
  return `${hour.toString().padStart(2, "0")}:${minute}`
}).filter((time) => time <= "22:30")

const daysOfWeek = [
  { key: "monday", label: "Lunes", short: "L" },
  { key: "tuesday", label: "Martes", short: "M" },
  { key: "wednesday", label: "Miércoles", short: "X" },
  { key: "thursday", label: "Jueves", short: "J" },
  { key: "friday", label: "Viernes", short: "V" },
  { key: "saturday", label: "Sábado", short: "S" },
  { key: "sunday", label: "Domingo", short: "D" },
]

export function EditServiceModal({ open, onOpenChange, service, workplaces }: EditServiceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 30,
    price: 0,
    category: "",
    workplaceId: "",
    schedule: {} as ServiceSchedule,
  })

  const [activeTab, setActiveTab] = useState("monday")

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        duration: service.duration,
        price: service.price,
        category: service.category,
        workplaceId: service.workplaceId,
        schedule: service.schedule || {},
      })
    }
  }, [service])

  const activeDays = Object.keys(formData.schedule).filter((day) => formData.schedule[day]?.isAvailable)

  const toggleDay = (dayKey: string) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [dayKey]: prev.schedule[dayKey]?.isAvailable
          ? { ...prev.schedule[dayKey], isAvailable: false }
          : {
              isAvailable: true,
              startTime: "09:00",
              endTime: "17:00",
              breakStart: "",
              breakEnd: "",
            },
      },
    }))
  }

  const updateSchedule = (dayKey: string, field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [dayKey]: {
          ...prev.schedule[dayKey],
          [field]: value,
        },
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Actualizar servicio:", { id: service?.id, ...formData })
    onOpenChange(false)
  }

  if (!service) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Editar Servicio
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-5 gap-6">
            {/* Información Básica - 2 columnas */}
            <div className="col-span-2 space-y-4">
              <h3 className="text-lg font-medium">Información del Servicio</h3>

              <div>
                <Label htmlFor="edit-name" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Nombre del Servicio
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Consulta Cardiológica"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción del servicio..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="edit-duration" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duración (min)
                  </Label>
                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: Number.parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="90">1.5 horas</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-price" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Precio ($)
                  </Label>
                  <Input
                    id="edit-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))
                    }
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Categoría
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
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

              <div>
                <Label>Ubicación</Label>
                <Select
                  value={formData.workplaceId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, workplaceId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    {workplaces.map((workplace) => (
                      <SelectItem key={workplace.id} value={workplace.id}>
                        {workplace.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Horarios de Trabajo - 3 columnas */}
            <div className="col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Horarios de Trabajo
                </h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {activeDays.length} días activos
                </Badge>
              </div>

              {/* Selector de Días */}
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day.key}
                    type="button"
                    variant={formData.schedule[day.key]?.isAvailable ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => toggleDay(day.key)}
                  >
                    {formData.schedule[day.key]?.isAvailable && <CheckCircle className="w-3 h-3 text-green-500" />}
                    {day.short}
                  </Button>
                ))}
              </div>

              {/* Configuración por Día */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-7">
                  {daysOfWeek.map((day) => (
                    <TabsTrigger
                      key={day.key}
                      value={day.key}
                      className={`text-xs ${
                        formData.schedule[day.key]?.isAvailable ? "bg-green-50 text-green-700" : "text-gray-400"
                      }`}
                    >
                      {day.short}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {daysOfWeek.map((day) => (
                  <TabsContent key={day.key} value={day.key} className="space-y-4">
                    {formData.schedule[day.key]?.isAvailable ? (
                      <div className="space-y-4 p-4 border rounded-lg">
                        <h4 className="font-medium text-green-700">Configuración para {day.label}</h4>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Hora de Inicio</Label>
                            <Select
                              value={formData.schedule[day.key]?.startTime || "09:00"}
                              onValueChange={(value) => updateSchedule(day.key, "startTime", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Hora de Fin</Label>
                            <Select
                              value={formData.schedule[day.key]?.endTime || "17:00"}
                              onValueChange={(value) => updateSchedule(day.key, "endTime", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`break-${day.key}`}
                              checked={!!formData.schedule[day.key]?.breakStart}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateSchedule(day.key, "breakStart", "12:00")
                                  updateSchedule(day.key, "breakEnd", "13:00")
                                } else {
                                  updateSchedule(day.key, "breakStart", "")
                                  updateSchedule(day.key, "breakEnd", "")
                                }
                              }}
                            />
                            <Label htmlFor={`break-${day.key}`}>Horario de descanso</Label>
                          </div>

                          {formData.schedule[day.key]?.breakStart && (
                            <div className="grid grid-cols-2 gap-3 ml-6">
                              <div>
                                <Label>Inicio descanso</Label>
                                <Select
                                  value={formData.schedule[day.key]?.breakStart || "12:00"}
                                  onValueChange={(value) => updateSchedule(day.key, "breakStart", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label>Fin descanso</Label>
                                <Select
                                  value={formData.schedule[day.key]?.breakEnd || "13:00"}
                                  onValueChange={(value) => updateSchedule(day.key, "breakEnd", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            <strong>Horario configurado:</strong> {formData.schedule[day.key]?.startTime} -{" "}
                            {formData.schedule[day.key]?.endTime}
                            {formData.schedule[day.key]?.breakStart && (
                              <span>
                                {" "}
                                (Descanso: {formData.schedule[day.key]?.breakStart} -{" "}
                                {formData.schedule[day.key]?.breakEnd})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No disponible los {day.label.toLowerCase()}</p>
                        <p className="text-sm">Activa este día para configurar horarios</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800"
              disabled={!formData.name || !formData.category || !formData.workplaceId}
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
