# SidebarSkeleton - Usage Guide

## Overview
`SidebarSkeleton` es un componente placeholder que replica la estructura visual del Sidebar real pero con bloques animados de carga.

## Características
- ✅ Mismo tamaño y estructura que el Sidebar real (sin layout shift)
- ✅ Animación smooth con `animate-pulse` de Tailwind
- ✅ Replica todos los elementos: logo, título, subtítulo, 6 items de navegación
- ✅ Dimensiones exactas: header h-16, iconos w-4 h-4, etc.

## Cómo usar

### Opción 1: Con estado de loading
```tsx
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SidebarSkeleton } from '../components/skeletons';

export const SidebarWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <SidebarSkeleton />;
  return <Sidebar />;
};
```

### Opción 2: Condicional basado en datos dinámicos
```tsx
interface SidebarProps {
  userData?: User;
  isLoadingUser: boolean;
}

export const Sidebar = ({ userData, isLoadingUser }: SidebarProps) => {
  if (isLoadingUser) return <SidebarSkeleton />;
  
  return (
    // Sidebar content
  );
};
```

## Detalles técnicos

### Estructura replicada:
- **Header (h-16)**: Logo (w-10 h-10) + Título + Subtítulo
- **Navigation**: Título "Navegación" + 6 items (icon w-4 h-4 + label)
- **Spacing**: Mismo padding, gap y margins que el original

### Animación:
- Usa `bg-gray-200 animate-pulse` para los placeholders
- Sin delay: aparece inmediatamente
- Transición limpia al contenido real

## Validación de dimensiones
- Header: `h-16` (64px) ✓
- Logo placeholder: `w-10 h-10` (40px) ✓
- Icon placeholders: `w-4 h-4` (16px) ✓
- Navigation items spacing: `space-y-2` ✓
- No hay layout shift al cambiar de skeleton → contenido real
