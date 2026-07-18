# ConstruCloudAI Frontend

Frontend de ConstruCloudAI — plataforma de generación de presupuestos de construcción asistidos por IA.

## Stack

- **Framework:** React 19
- **Lenguaje:** TypeScript
- **Routing:** React Router v7
- **Estilos:** Tailwind CSS
- **Build:** Vite
- **Deploy:** Cloudflare Pages

## Estructura del proyecto

```
construcloudai-front/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes.tsx
│   ├── pages/
│   │   ├── Layout.tsx            # Navbar + Sidebar + Outlet
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── NotFound.tsx
│   ├── features/
│   │   ├── dashboard/
│   │   ├── clientes/
│   │   ├── presupuestos/
│   │   ├── tarifas/
│   │   └── perfil/
│   ├── components/
│   │   ├── ui/                   # Componentes atómicos reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── index.ts          # Barrel re-exports
│   │   └── layout/
│   │       ├── Sidebar.tsx
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── usePresupuestos.ts
│   │   └── useClientes.ts
│   ├── services/
│   │   ├── api.ts                # Axios instance + interceptors
│   │   ├── auth.service.ts
│   │   ├── presupuestos.service.ts
│   │   ├── clientes.service.ts
│   │   └── tarifas.service.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   ├── index.ts
│   │   ├── ui.types.ts
│   │   ├── auth.types.ts
│   │   ├── cliente.types.ts
│   │   ├── presupuesto.types.ts
│   │   └── tarifa.types.ts
│   ├── constants/
│   │   ├── presupuestos.constants.ts
│   │   ├── ui.constants.ts
│   │   ├── api.constants.ts
│   │   └── index.ts
│   └── utils/
│       └── helpers.ts
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Arquitectura

- **pages/** — Rutas de nivel superior: Layout (con Navbar, Sidebar y Outlet), Login, Register, NotFound
- **features/** — Módulos de dominio que se renderizan dentro del Outlet del Layout (dashboard, clientes, presupuestos, tarifas, perfil)
- **components/ui/** — Componentes atómicos reutilizables, tipados y con variantes
- **components/layout/** — Estructura visual compartida (Navbar, Sidebar, Footer)

## Design System — Componentes UI

Componentes atómicos en `src/components/ui/`, tipados con TypeScript y estilizados con Tailwind.

| Componente | Descripción | Variantes |
|------------|-------------|-----------|
| `Button` | Botón con variantes y estados | `primary`, `secondary`, `danger`, `ghost` · `sm`, `md`, `lg` · `loading`, `disabled` |
| `Input` | Campo de texto con label y error | `text`, `email`, `password`, `number` |
| `Select` | Selector dropdown tipado | Genérico `<T>` con opciones tipadas |
| `Textarea` | Área de texto multilínea | Con contador de caracteres opcional |
| `Modal` | Diálogo modal | Con header, body, footer slots |
| `Badge` | Etiqueta de estado | `success`, `warning`, `danger`, `info`, `neutral` |
| `Card` | Contenedor con sombra | Con header y footer opcionales |
| `Table` | Tabla con columnas tipadas | Genérica `<T>`, sortable, con empty state |
| `Spinner` | Indicador de carga | `sm`, `md`, `lg` |
| `Alert` | Mensaje de feedback | `success`, `error`, `warning`, `info` |

Importación centralizada:

```tsx
import { Button, Input, Badge, Modal } from '@/components/ui';
```

## Setup local

```bash
git clone git@github.com:tu-usuario/construcloudai-front.git
cd construcloudai-front
npm install
cp .env.example .env
npm run dev
```

## Deploy

Conectado a Cloudflare Pages con deploy automático desde `main`.

## Licencia

Proyecto privado — Labs by 4Geeks Academy (Jul–Ago 2026).