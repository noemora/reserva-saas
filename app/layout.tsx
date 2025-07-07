import { AuthProvider } from "@/components/providers/auth-provider"
import "@/app/globals.css"
import { Mona_Sans as FontSans } from 'next/font/google'
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Booking System",
  description: "Ejemplo con Zustand + Next.js 15",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={cn(fontSans.variable, "h-full")}>
      <body className="min-h-full bg-muted/20 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
