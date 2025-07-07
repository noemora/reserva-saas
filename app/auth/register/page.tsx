"use client"

import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RegisterForm />
      <div className="fixed bottom-4 right-4">
        <Link href="/auth/login">
          <Button variant="outline">¿Ya tienes cuenta? Inicia sesión</Button>
        </Link>
      </div>
    </div>
  )
}
