import '@/app/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AuthInitializer } from '../components/auth-initializer';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Booking System',
  description: 'Ejemplo con Zustand + Next.js 15',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(fontSans.variable, 'h-full')}>
      <body className="min-h-full bg-muted/20 antialiased">
        <AuthInitializer>{children}</AuthInitializer>
      </body>
    </html>
  );
}
