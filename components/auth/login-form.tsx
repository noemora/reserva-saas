"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth-store"
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const { signIn, loading } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor, completa todos los campos")
      return
    }

    console.log("🔐 Intentando login con:", email)

    const result = await signIn(email, password)

    if (result.error) {
      console.error("❌ Error en login:", result.error)
      setError(result.error.message || "Error al iniciar sesión")
      toast.error("Error al iniciar sesión")
    } else {
      console.log("✅ Login exitoso, redirigiendo...")
      toast.success("¡Bienvenido!")
      // Pequeño delay para asegurar que el estado se actualice
      setTimeout(() => {
        router.push("/dashboard")
      }, 100)
    }
  }

  const handleTestAccount = async (type: "Cliente" | "Profesional" | "Empresa") => {
    setError("")

    const testAccounts = {
      Cliente: { email: "cliente@test.com", password: "123456" },
      Profesional: { email: "profesional@test.com", password: "123456" },
      Empresa: { email: "empresa@test.com", password: "123456" },
    }

    const account = testAccounts[type]
    setEmail(account.email)
    setPassword(account.password)

    console.log(`🧪 Probando cuenta de ${type}:`, account.email)

    const result = await signIn(account.email, account.password)

    if (result.error) {
      console.error("❌ Error en login de prueba:", result.error)
      setError(result.error.message || "Error al iniciar sesión")
      toast.error("Error al iniciar sesión")
    } else {
      console.log("✅ Login de prueba exitoso, redirigiendo...")
      toast.success(`¡Bienvenido como ${type}!`)
      // Pequeño delay para asegurar que el estado se actualice
      setTimeout(() => {
        router.push("/dashboard")
      }, 100)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Ingresa tus credenciales para acceder al sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Iniciar Sesión
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Cuentas de prueba</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              onClick={() => handleTestAccount("Cliente")}
              disabled={loading}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ingresar como Cliente
            </Button>
            <Button
              variant="outline"
              onClick={() => handleTestAccount("Profesional")}
              disabled={loading}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ingresar como Profesional
            </Button>
            <Button
              variant="outline"
              onClick={() => handleTestAccount("Empresa")}
              disabled={loading}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ingresar como Empresa
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm text-gray-600 w-full">
            ¿No tienes cuenta?{" "}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => router.push("/auth/register")}
              disabled={loading}
            >
              Regístrate aquí
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
