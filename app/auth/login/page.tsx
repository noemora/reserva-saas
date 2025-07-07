"use client"
import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LoginForm />
      <div className="fixed bottom-4 right-4">
        <Link href="/auth/register">
          <Button variant="outline">¿No tienes cuenta? Regístrate</Button>
        </Link>
      </div>
    </div>
  )
}
