Crea un archivo CLAUDE.md en la raíz del proyecto con el siguiente contenido:

# ConstruCloudAI - Contexto para Claude Code

## Stack
- Frontend: React 19 + TypeScript + React Router v7 + Tailwind CSS
- Backend: FastAPI + PostgreSQL + pgvector + Alembic
- IA: Groq (LLaMA 3.3 70B) + HuggingFace embeddings
- Iconos: lucide-react

## Arquitectura Frontend
- features/ → páginas principales (Panel, Presupuestos, GenerarPresupuesto, DetallePresupuesto)
- components/layout/ → Navbar, Sidebar
- components/ui/ → componentes reutilizables (Button, BadgeEstado, etc.)
- components/Panel/ → componentes específicos del panel
- components/presupuestos/ → componentes específicos de presupuestos
- hooks/ → custom hooks (usePanel, usePresupuestos, useGenerarPresupuesto)
- services/actions/ → llamadas a la API con axios
- services/api/ → configuración de axios (construcloudAPI)
- types/ → todas las interfaces y types, nunca locales en componentes
- helpers/ → funciones reutilizables (formatearFecha, formatearPrecio, etc.)
- constants/ → constantes y datos estáticos

## Reglas estrictas
- NUNCA definir interfaces o types locales en componentes — siempre en src/types/
- NUNCA usar any — usar tipos específicos o unknown
- Los ids pueden ser number | string para compatibilidad back/front
- Usar NavLink de React Router para navegación con estado activo
- Usar useNavigate(-1) para volver atrás, no window.history.back()
- Campos opcionales con ? cuando no siempre existen
- Variables no usadas con prefijo _ para ignorar el linter

## Convenciones
- Componentes en PascalCase
- Hooks con prefijo use
- Actions con sufijo .action.ts
- Types con sufijo .types.ts
- Helpers con sufijo .helpers.ts
- Constantes en UPPER_CASE

## Lo que NO hacer
- No definir interfaces locales en componentes
- No usar enum — usar union types o const objects
- No usar window.history — usar React Router
- No mezclar lógica en componentes visuales — extraer a hooks
- No tocar el Layout para estilos de página específicos