"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useClientStore } from "@/lib/stores/client-store"
import { useAuthStore } from "@/lib/stores/auth-store"
import {
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  AlertTriangle,
  Pill,
  Shield,
  Globe,
  Bell,
  Edit3,
  Save,
  X,
  Calendar,
  Camera,
} from "lucide-react"

export default function MyProfile() {
  const { profile: clientProfile, setProfile } = useClientStore()
  const { profile: authProfile, updateProfile } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: clientProfile?.full_name || authProfile?.full_name || "",
    phone: clientProfile?.phone || authProfile?.phone || "",
    email: clientProfile?.email || authProfile?.email || "",
    avatar_url: clientProfile?.avatar_url || "",
  })

  // Use client profile if available, otherwise fall back to auth profile
  const profile = clientProfile || authProfile

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!profile) return
    await setProfile({ ...profile, full_name: formData.full_name, avatar_url: formData.avatar_url })
    await updateProfile(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      full_name: clientProfile?.full_name || authProfile?.full_name || "",
      phone: clientProfile?.phone || authProfile?.phone || "",
      email: clientProfile?.email || authProfile?.email || "",
      avatar_url: clientProfile?.avatar_url || "",
    })
    setIsEditing(false)
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mi Perfil</CardTitle>
            <p className="text-gray-600">Cargando información del perfil...</p>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-gray-600 mt-2">Gestiona tu información personal y preferencias</p>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar_url || formData.avatar_url} />
                <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {getInitials(profile.name || profile.full_name || "Usuario")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white shadow-md"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name || profile.full_name || "Usuario"}</h2>
              <p className="text-gray-600 mt-1">{profile.email}</p>
              <div className="flex items-center gap-4 mt-3">
                <Badge variant="secondary" className="bg-white/50">
                  <User className="w-3 h-3 mr-1" />
                  Cliente
                </Badge>
                {profile.date_of_birth && (
                  <Badge variant="outline" className="bg-white/50">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear()} años
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="bg-white/50">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Información Personal */}
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-blue-600" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nombre Completo
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    className="border-gray-200 focus:border-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{profile.name || profile.full_name || "No especificado"}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Teléfono
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border-gray-200 focus:border-blue-500"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{profile.phone || "No especificado"}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{profile.email}</span>
                </div>
              </div>

              {profile.address && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Dirección</Label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{profile.address}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contacto de Emergencia */}
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Contacto de Emergencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            {profile.emergency_contact ? (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <User className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-xs text-amber-600 uppercase tracking-wide">Nombre</p>
                      <p className="font-medium text-gray-900">{profile.emergency_contact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <Phone className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-xs text-amber-600 uppercase tracking-wide">Teléfono</p>
                      <p className="font-medium text-gray-900">{profile.emergency_contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <Heart className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-xs text-amber-600 uppercase tracking-wide">Relación</p>
                      <p className="font-medium text-gray-900">{profile.emergency_contact.relationship}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No hay contacto de emergencia configurado</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Agregar Contacto
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Información Médica */}
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-red-600" />
            Información Médica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {profile.medical_history && profile.medical_history.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Historial Médico</Label>
              <div className="flex flex-wrap gap-2">
                {profile.medical_history.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profile.allergies && profile.allergies.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Alergias</Label>
              <div className="flex flex-wrap gap-2">
                {profile.allergies.map((allergy, index) => (
                  <Badge key={index} className="bg-red-50 text-red-700 border-red-200">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profile.current_medications && profile.current_medications.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Medicamentos Actuales</Label>
              <div className="flex flex-wrap gap-2">
                {profile.current_medications.map((medication, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Pill className="h-3 w-3 mr-1" />
                    {medication}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {(!profile.medical_history || profile.medical_history.length === 0) &&
            (!profile.allergies || profile.allergies.length === 0) &&
            (!profile.current_medications || profile.current_medications.length === 0) && (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No hay información médica registrada</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Agregar Información
                </Button>
              </div>
            )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Información del Seguro */}
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-green-600" />
              Información del Seguro
            </CardTitle>
          </CardHeader>
          <CardContent>
            {profile.insurance_provider ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-xs text-green-600 uppercase tracking-wide">Proveedor</p>
                    <p className="font-medium text-gray-900">{profile.insurance_provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <User className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-xs text-green-600 uppercase tracking-wide">Número de Póliza</p>
                    <p className="font-medium text-gray-900">{profile.insurance_number}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No hay información de seguro registrada</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Agregar Seguro
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preferencias */}
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-purple-600" />
              Preferencias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.preferred_language && (
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Globe className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-xs text-purple-600 uppercase tracking-wide">Idioma Preferido</p>
                  <p className="font-medium text-gray-900">{profile.preferred_language}</p>
                </div>
              </div>
            )}

            {profile.communication_preferences && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                  <Bell className="h-4 w-4 text-purple-600" />
                  Preferencias de Comunicación
                </Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Notificaciones por Email</span>
                    </div>
                    <Switch checked={profile.communication_preferences.email} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Notificaciones por SMS</span>
                    </div>
                    <Switch checked={profile.communication_preferences.sms} />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Llamadas Telefónicas</span>
                    </div>
                    <Switch checked={profile.communication_preferences.phone} />
                  </div>
                </div>
              </div>
            )}

            {!profile.preferred_language && !profile.communication_preferences && (
              <div className="text-center py-8">
                <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No hay preferencias configuradas</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Configurar Preferencias
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { MyProfile }
