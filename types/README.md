# Types Organization

Esta carpeta contiene todos los tipos TypeScript del proyecto organizados de manera centralizada.

## 📁 Estructura

```
types/
├── index.ts          # Exportaciones centralizadas
├── database.ts       # Tipos raw de base de datos
├── auth.ts          # Tipos de autenticación
├── booking.ts       # Tipos de reservas (con características UI)
├── client.ts        # Tipos de cliente (con características UI)
├── company.ts       # Tipos de empresa (con características UI)
└── professional.ts  # Tipos de profesional (con características UI)
```

## 🎯 Propósito de cada archivo

### `database.ts`

- **Tipos raw de Supabase**: Tipos directos de las tablas y vistas de la base de datos
- **Tipos CRUD**: Insert, Update para todas las tablas
- **Tipos Complete**: Vistas que combinan profile + datos específicos
- **Aliases legacy**: Para compatibilidad hacia atrás (marcados como deprecated)

### `auth.ts`

- Tipos relacionados con autenticación
- Estados de sesión
- Datos de usuario para autenticación

### `booking.ts`

- Tipos de reservas con características mejoradas para UI
- Detalles de reservas con información relacionada
- Estados de reservas
- Horarios y disponibilidad

### `client.ts`

- Tipos de cliente con características específicas para UI
- Perfiles de cliente extendidos

### `company.ts`

- Tipos de empresa con características específicas para UI
- Estadísticas de empresa
- Tipos de profesionales de empresa

### `professional.ts`

- Tipos de profesional con características específicas para UI
- Servicios y lugares de trabajo
- Horarios de servicios

## 📦 Uso

### Importación recomendada

```typescript
// Desde el índice principal para tipos comunes
import type { CompleteClient, ProfileInsert } from '@/types';

// Desde archivos específicos para tipos especializados
import type { BookingWithDetails } from '@/types/booking';
import type { CompanyStats } from '@/types/company';
```

### Tipos de base de datos

```typescript
// Nuevos nombres (recomendados)
import type { ClientRow, ClientInsert, ClientUpdate } from '@/types';

// Nombres legacy (deprecated pero funcionales)
import type { Client } from '@/types';
```

## 🔄 Migración desde helpers

Los tipos que estaban en `lib/helpers/types.ts` han sido movidos a esta estructura centralizada:

- ✅ Todos los tipos de base de datos → `types/database.ts`
- ✅ Re-exportaciones desde helpers mantenidas para compatibilidad
- ✅ Nuevos tipos organizados por dominio

## ⚠️ Deprecations

Los siguientes tipos están marcados como deprecated pero siguen funcionando:

- `Profile` → usar `ProfileRow`
- `Client` → usar `ClientRow`
- `Professional` → usar `ProfessionalRow`
- `Company` → usar `CompanyRow`
- `Service` → usar `ServiceRow`
- `Workplace` → usar `WorkplaceRow`
- `Booking` → usar `BookingRow`

## 🚀 Beneficios

1. **Organización centralizada**: Todos los tipos en un solo lugar
2. **Separación de responsabilidades**: Database vs UI types
3. **Mejor discoverabilidad**: Fácil encontrar tipos relacionados
4. **Compatibilidad**: Los imports existentes siguen funcionando
5. **Escalabilidad**: Fácil agregar nuevos tipos organizados
