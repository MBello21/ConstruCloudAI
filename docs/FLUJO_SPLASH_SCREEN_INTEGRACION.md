# Flujo de Integración: AuthContext + GlobalLoading + SplashScreen

## Descripción General
Se ha integrado el flujo de autenticación con el sistema de GlobalLoading para que tras login/signup, el usuario vea un splash screen hasta que TODOS los datos estén cargados.

## Cambios Realizados

### 1. AuthContext.tsx
- **Acción**: Importa `useGlobalLoading` y registra "auth" como fuente de loading
- **Cómo funciona**:
  - En el `useEffect` de `initializeAuth`, registra "auth" al inicio
  - Resuelve "auth" cuando termina de verificar el token almacenado
  - Esto asegura que GlobalLoading sabe que auth se está inicializando

### 2. useGlobalLoading.ts (GlobalLoadingProvider)
- **Acción**: Inicializa con "initialization" como fuente pendiente
- **Cómo funciona**:
  - `pendingSources` inicia como `["initialization"]`
  - Un `useEffect` resuelve "initialization" con `setTimeout(..., 0)`
  - Esto garantiza que AppContent vea `isLoading = true` al inicio
  - Permite que componentes como AuthProvider se registren después

### 3. Layout.tsx
- **Acción**: Removió `AuthProvider` duplicado que envolvía el contenido
- **Por qué**: El verdadero `AuthProvider` está en `AuthLayout.tsx`
- **Resultado**: Evita duplicidad y el layout es más limpio

### 4. routes.tsx
- **Acción**: Removió import no usado de `ProtectedRoute`

## Flujo Completo de Carga

```
1. Usuario hace login → handleLogin navega a "/panel"
   ↓
2. Layout se monta (ruta cambió a "/")
   ↓
3. AuthLayout monta → AuthProvider monta
   - registerLoading("auth")
   - GlobalLoading.pendingSources = ["initialization", "auth"]
   ↓
4. Router monta componentes de ruta (Panel, Presupuestos, etc)
   - usePanel se monta
   - registerLoading("panel-tabla")
   - GlobalLoading.pendingSources = ["initialization", "auth", "panel-tabla"]
   ↓
5. setTimeout(..., 0) de GlobalLoadingProvider se ejecuta
   - resolveLoading("initialization")
   - GlobalLoading.pendingSources = ["auth", "panel-tabla"]
   ↓
6. Mientras GlobalLoading.isLoading = true
   - AppContent renderiza SplashScreen sobre Layout
   - Layout renderiza skeletons (bajo el SplashScreen, no visibles)
   ↓
7. AuthContext termina initializeAuth
   - resolveLoading("auth")
   - GlobalLoading.pendingSources = ["panel-tabla"]
   ↓
8. usePanel termina fetchData
   - resolveLoading("panel-tabla")
   - GlobalLoading.pendingSources = []
   ↓
9. GlobalLoading.isLoading = false (por primera vez)
   - useInitialLoading() detecta el cambio
   - AppContent deja de renderizar SplashScreen
   - SplashScreen hace fade-out (opacity 0 en 300ms)
   ↓
10. Layout completo aparece de golpe SIN skeletons visibles
```

## Comportamiento por Escenario

### Escenario 1: Login / Signup
- **Observación esperada**:
  1. Usuario ve splash screen inmediatamente
  2. Splash screen persiste hasta que todos los datos cargan
  3. Layout completo aparece de golpe con fade-out del splash
  4. NO se ven tablas cargando, skeletons, ni contenido parcial

### Escenario 2: Refresh de página (F5)
- **Observación esperada**:
  1. Splash screen aparece
  2. Auth verifica el token
  3. Si token válido: splash persiste hasta que panel carga, luego layout
  4. Si token inválido: splash desaparece, redirige a login
  5. Mismo comportamiento que login/signup

### Escenario 3: Navegación interna (/panel → /presupuestos)
- **Observación esperada**:
  1. NO splash screen (porque isInitialLoading() = false)
  2. Componente nuevo puede renderizar skeletons mientras carga
  3. Transición normal sin splash

### Escenario 4: Backend caído (timeout)
- **Observación esperada**:
  1. Splash screen aparece
  2. Después de ~5s (timeout), splash desaparece
  3. Layout se muestra con lo que haya disponible
  4. Posibles errores en toast

## Timing Crítico

- **GlobalLoadingProvider**: Inicializa con "initialization"
  - Resuelve inmediatamente (setTimeout 0) para no bloquear
  - Establece máximo de 5s para cualquier fuente (timeout de seguridad)

- **AuthContext**: registerLoading("auth") - resolveLoading("auth")
  - Tiempo típico: 10-50ms (verificación de localStorage)

- **usePanel**: registerLoading("panel-tabla") - resolveLoading("panel-tabla")
  - Tiempo típico: 200-1000ms (fetch de datos del servidor)

- **SplashScreen**: Fade-out de 300ms cuando no visible
  - Permite transición suave al layout

## Validación

Para verificar que funciona correctamente:

1. ✓ Login: Ver splash → layout completo sin skeletons
2. ✓ Signup: Mismo comportamiento que login
3. ✓ F5 (refresh): Splash → layout completo
4. ✓ Navegación interna: Sin splash, solo skeletons si es necesario
5. ✓ Backend caído: Splash 5s → layout con errores
6. ✓ Build: `npm run build` sin errores

## Archivos Modificados

- `src/features/auth/context/AuthContext.tsx` - Registra/resuelve "auth"
- `src/shared/hooks/useGlobalLoading.ts` - Inicializa con "initialization"
- `src/app/Layout.tsx` - Removió AuthProvider duplicado
- `src/app/routes.tsx` - Removió import no usado

## Archivos Sin Cambios (Reutilizados)

- `src/app/AppContent.tsx` - Ya renderiza SplashScreen basado en useInitialLoading()
- `src/shared/components/SplashScreen.tsx` - Ya tiene fade-out de 300ms
- `src/shared/context/GlobalLoadingProvider.tsx` - Ya expone contexto
- `src/features/panel/hooks/usePanel.tsx` - Ya registra/resuelve "panel-tabla"
