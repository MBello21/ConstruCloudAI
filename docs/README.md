---
título: ConstruCloudAI - Documentación Frontend
fecha: 2026-08-08
tags: [frontend, react, typescript]
---

# ConstruCloudAI - Documentación del Frontend

## Descripción General

ConstruCloudAI es una aplicación web de gestión de presupuestos para empresas de construcción. Permite crear, editar, y administrar presupuestos de obras con capítulos y detalles, gestión de clientes, y análisis de métricas.

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 19.2.7 | Framework UI |
| TypeScript | ~6.0.2 | Lenguaje tipado |
| React Router | 8.2.0 | Enrutamiento |
| Tailwind CSS | 4.3.3 | Estilos |
| Axios | 1.18.1 | Cliente HTTP |
| Lucide React | 1.26.0 | Iconos |
| Sonner | 2.0.7 | Notificaciones toast |
| Vite | 8.1.1 | Bundler |

## Estructura del Proyecto

```
src/
├── app/                    # Configuración de la app y rutas
├── features/               # Features principales (vertical slicing)
│   ├── panel/             # Dashboard principal
│   ├── presupuestos/      # CRUD de presupuestos
│   ├── clientes/          # Gestión de clientes
│   ├── capitulos/         # Gestión de capítulos
│   ├── detalles/          # Gestión de detalles
│   └── generacion/        # Generación de presupuestos con IA
├── shared/                 # Código compartido
│   ├── components/        # Componentes reutilizables
│   ├── hooks/             # Hooks compartidos
│   ├── services/          # Configuración de API
│   ├── helpers/           # Funciones auxiliares
│   ├── constants/         # Constantes
│   ├── context/           # Context compartido
│   ├── layout/            # Componentes de layout
│   └── types/             # Interfaces compartidas
└── state/                  # Estado global (reducer)
```

## Índice de Documentación

### Conceptos Fundamentales
- [[arquitectura]] - Visión general y patrones de arquitectura
- [[configuracion]] - Configuración de Vite, TypeScript y Tailwind

### Features
- [[features/panel]] - Dashboard principal
- [[features/presupuestos]] - Gestión de presupuestos
- [[features/clientes]] - Gestión de clientes
- [[features/capitulos]] - Gestión de capítulos
- [[features/detalles]] - Gestión de detalles

### Hooks
- [[hooks/hooks-panel]] - Hooks del panel
- [[hooks/hooks-presupuestos]] - Hooks de presupuestos
- [[hooks/hooks-clientes]] - Hooks de clientes
- [[hooks/hooks-capitulos]] - Hooks de capítulos
- [[hooks/hooks-shared]] - Hooks compartidos

### Componentes
- [[componentes/componentes-shared]] - Componentes reutilizables
- [[componentes/componentes-panel]] - Componentes del panel
- [[componentes/componentes-presupuestos]] - Componentes de presupuestos
- [[componentes/componentes-clientes]] - Componentes de clientes

### Datos y Estado
- [[types]] - Interfaces y tipos TypeScript
- [[services]] - Servicios y llamadas a API
- [[state]] - Gestión de estado global

### Navegación
- [[rutas]] - Mapa de rutas de la aplicación

---

## Convenciones

### Componentes
- **Naming**: PascalCase (ej: `Button.tsx`, `TablaPresupuestos.tsx`)
- **Props**: Interfaces con sufijo `Props` (ej: `ButtonProps`)
- **Exports**: Named exports preferiblemente

### Hooks
- **Naming**: Prefijo `use` (ej: `usePresupuestos`, `useGlobalLoading`)
- **Ubicación**: En `hooks/` dentro del feature
- **Retorno**: Objeto con métodos y estado

### Services
- **Naming**: Sufijo `.action.ts` o `.service.ts`
- **Tipo**: Funciones puras async
- **Ubicación**: En `services/` dentro del feature

### Types
- **Naming**: Interfaces con sufijo `Request`/`Response` para API
- **Ubicación**: En `types/` del feature o en `shared/types/`
- **Nunca**: Locales en componentes

### State
- **Pattern**: Reducer pattern con useReducer
- **Ubicación**: En `state/`
- **Scope**: Global, accesible desde cualquier componente

---

## Patrones Principales

### 1. Vertical Feature Slicing
Cada feature (presupuestos, clientes, etc.) es autocontendida:
- Componentes
- Hooks (façade + especializados)
- Services
- Types

### 2. Hook Façade
Los hooks principales actúan como façade:
- `usePresupuestos()` → orquesta data fetching, filtros, paginación
- Usa hooks especializados internamente
- Expone estado y handlers unificados

### 3. Flujo de Datos
```
Componente → Hook Façade → Hooks especializados → Services → API
```

### 4. Gestión de Estado
- **Local**: `useState` dentro de hooks
- **Global**: `useReducer` con Context (clientes)
- **Unsaved changes**: `useUnsavedChangesGuard`

---

## Contacto y Contribución

**Email**: magarbello@gmail.com

Para preguntas o sugerencias sobre la documentación, consulta el equipo.
