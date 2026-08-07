# Verificación de Coordinación de Skeletons

## ✅ Verificación de Código Completada

### 1. Integración en App
- ✅ `src/app/App.tsx` envuelto con `<GlobalLoadingProvider>` (línea 9)
- ✅ GlobalLoadingProvider instancia el hook `useGlobalLoadingProvider()`

### 2. MetricasPanel
- ✅ Importa `useGlobalLoading` (línea 6)
- ✅ Llama `registerLoading("metricas")` al iniciar fetch (línea 19)
- ✅ Llama `resolveLoading("metricas")` en finally (línea 29)
- ✅ Usa `globalIsLoading` para mostrar/ocultar skeleton (línea 36)
- ⚠️ Estado local `loading` mantenido para uso interno futuro

### 3. usePanel Hook
- ✅ Importa `useGlobalLoading` (línea 7)
- ✅ Llama `registerLoading("panel-tabla")` al iniciar fetch (línea 22)
- ✅ Llama `resolveLoading("panel-tabla")` en finally dentro setTimeout (línea 33)
- ✅ Timeout de 500ms antes de resolver (para garantizar que el skeleton sea visible)
- ⚠️ Estado local `loading` mantenido para uso interno futuro

### 4. Panel Component
- ✅ Importa `useGlobalLoading` (línea 11)
- ✅ Obtiene `isLoading: globalIsLoading` (línea 25)
- ✅ Usa `globalIsLoading ? <SkeletonTabla /> : <TablaPresupuestos />` (línea 47)

### 5. Sistema de Loading Global
- ✅ `useGlobalLoading.ts` define GlobalLoadingContext (línea 9)
- ✅ Mantiene Set<string> de fuentes activas (línea 12)
- ✅ `registerLoading(key)` añade al Set (línea 16)
- ✅ `resolveLoading(key)` elimina del Set (línea 28)
- ✅ `isLoading = pendingSources.size > 0` (booleano derivado)
- ✅ Timeout de seguridad: 5000ms (línea 24)
- ✅ clearTimeout en nuevo registerLoading (línea 19)
- ✅ cleanup en useEffect (línea 44)

### 6. Exports
- ✅ `useGlobalLoading` exportado en `shared/hooks/index.ts` (línea 2)

---

## 📋 Flujo de Ejecución Esperado

### Paso 1: Usuario navega a `/panel`

```
0ms   ↓ Panel.tsx monta
      ├─ usePanel() inicia
      │  └─ registerLoading("panel-tabla") → isLoading = true
      │     timeout 500ms
      └─ MetricasPanel monta
         └─ registerLoading("metricas") → isLoading = true
            timeout 5s (se reinicia cada registerLoading)

Estado: isLoading = true (2 fuentes activas)
```

### Paso 2: Skeletons aparecen (primeros 100ms)

```
100ms → MetricasPanel + SkeletonTabla aparecen SIMULTÁNEAMENTE
        Usuarios ven:
        ┌─────────────────────────────┐
        │ [Skeleton] [Skeleton] ...   │  ← Métricas skeleton
        ├─────────────────────────────┤
        │ ┌─────┬───────┬───────────┐ │
        │ │Code │Project│Amount │   │ │  ← Tabla skeleton
        │ ├─────┼───────┼───────────┤ │
        │ │ ░░░ │ ░░░░░ │ ░░░ │ ░░  │ │
        │ │ ░░░ │ ░░░░░ │ ░░░ │ ░░  │ │
        │ └─────┴───────┴───────────┘ │
        └─────────────────────────────┘

Estado: isLoading = true
Fuentes pendientes: ["panel-tabla", "metricas"]
```

### Paso 3: Primera fuente termina (~600-800ms típicamente)

```
600ms → getPresupuestos() completa
        Panel hook finaliza setTimeout(500ms)
        resolveLoading("panel-tabla")
        
Estado: isLoading = true (aún espera "metricas")
Fuentes pendientes: ["metricas"]

⚠️ IMPORTANTE: SkeletonTabla sigue visible porque metricas aún está cargando
✅ NO hay flash - tabla no aparece aún
```

### Paso 4: Última fuente termina (~1000-1500ms típicamente)

```
1200ms → getMetricas() completa
         resolveLoading("metricas")
         Set vacío
         
Estado: isLoading = false
Fuentes pendientes: []

✅ TODOS los skeletons desaparecen SIMULTÁNEAMENTE
   MetricasPanel muestra contenido real
   SkeletonTabla desaparece, TablaPresupuestos aparece
```

---

## 🔍 Casos de Prueba

### Test 1: Conexión Rápida (< 500ms)
**Resultado esperado:**
- Skeletons pueden no ser visibles (aparecen y desaparecen muy rápido)
- O aparecen brevemente (50-200ms)
- Sin flash molesto
- UI se siente responsiva

**Cómo verificar:**
```
1. Abre DevTools (F12)
2. Consola → console.log en MetricasPanel y usePanel
3. Abre /panel
4. Verifica timestamps:
   - registerLoading("metricas"): [TIME_A]
   - registerLoading("panel-tabla"): [TIME_B]
   - resolveLoading("panel-tabla"): [TIME_C]
   - resolveLoading("metricas"): [TIME_D]
   
Deben estar en ese orden: A,B < C < D
```

### Test 2: Conexión Lenta (Throttle 3G en DevTools)

**Red tab → Throttling → Slow 3G**

**Resultado esperado:**
- Skeletons aparecen immediatamente después de montar componentes
- Permanecen visibles 2-4 segundos
- Desaparecen juntos cuando última fuente termina
- NO hay flash de tabla sin datos

**Cómo verificar:**
```
1. Abre DevTools (F12)
2. Network tab
3. Throttling → Slow 3G
4. Hard refresh (Ctrl+Shift+R)
5. Navega a /panel (o refresca si ya estás ahí)
6. Observa:
   ✅ Skeletons aparecen juntos
   ✅ Se quedan visibles mientras cargan
   ✅ Desaparecen juntos
   ❌ NO debe haber flash de "tabla vacía"
```

### Test 3: API Desconectada (Timeout de Seguridad)

**Simular fallo de API:**
```
1. DevTools → Network tab
2. Throttling → Offline
3. Navega a /panel
```

**Resultado esperado:**
- Skeletons aparecen
- Persisten por ~4-5 segundos (timeout)
- Tras 5 segundos:
  - ✅ Skeletons desaparecen
  - ✅ Se muestran errores de carga (si están implementados)
  - ❌ NO quedan en skeleton infinito

**Cómo verificar:**
```
1. DevTools (F12)
2. Network → Offline
3. Abre /panel
4. Observa tiempo:
   - Skeletons aparecen: T=0
   - Skeletons desaparecen: T≈5000ms
5. Verifica que hay error messages (si los hay implementados)
```

### Test 4: Una fuente falla, otra éxito

**Scenario:** getMetricas() falla, getPresupuestos() éxito

```
Esperado:
- Skeletons aparecen (ambas registran)
- getPresupuestos completa → resolveLoading("panel-tabla")
- getMetricas falla → no llama resolveLoading("metricas")
- Espera timeout de 5s
- Tras 5s:
  ✅ SkeletonTabla desaparece
  ✅ TablaPresupuestos muestra datos
  ✅ MetricasPanel muestra error (no skeleton)
```

---

## 🛠️ Debugging

### Si skeletons no aparecen:
1. Verificar que GlobalLoadingProvider está en App.tsx ✅
2. Verificar que registerLoading se llama (console.log)
3. Verificar que componentes usan globalIsLoading ✅

### Si skeletons desaparecen a diferente tiempo:
1. Verificar que ambos fetchs llaman registerLoading y resolveLoading
2. Verificar el orden: ambos deben registrar antes de que cualquiera resuelva
3. Comprobar timeouts: ¿hay alguno que bloquea?

### Si skeleton infinito:
1. Verificar que resolveLoading se llama en finally
2. Verificar que el timeout de 5s está activo (línea 24 en useGlobalLoading.ts)
3. Revisar console para errores no capturados

### Console logs para debugging:
```tsx
// En useGlobalLoading.ts
const registerLoading = useCallback((key: string) => {
  console.log(`[LOADING] +${key}`, [...pendingSources].sort());
  // ...
}, []);

const resolveLoading = useCallback((key: string) => {
  console.log(`[LOADING] -${key}`, [...pendingSources].sort());
  // ...
}, []);
```

---

## ✅ Checklist de Verificación Manual

Cuando ejecutes `npm run dev` y abras `/panel`:

- [ ] Skeletons aparecen dentro de los primeros 100ms
- [ ] Ambos skeletons (métricas y tabla) aparecen SIMULTÁNEAMENTE
- [ ] Sin flash o parpadeo molesto
- [ ] Skeletons desaparecen al mismo tiempo
- [ ] Transición a contenido real es suave
- [ ] Build sin errores: `✓ built in 2.6s`
- [ ] No hay warnings en console sobre Context
- [ ] Con throttle Slow 3G:
  - [ ] Skeletons visibles 2-4 segundos
  - [ ] Desaparecen juntos
  - [ ] No hay flash de "tabla sin datos"
- [ ] Modo offline (test timeout):
  - [ ] Skeletons desaparecen tras ~5 segundos
  - [ ] No quedan infinitos
  - [ ] Se muestran estados de error

---

## 📊 Métricas de Éxito

| Métrica | Esperado | Tolerancia |
|---------|----------|-----------|
| Tiempo de aparición de skeletons | 0-100ms | < 200ms |
| Sincronización aparición | Δ < 50ms | Δ < 100ms |
| Sincronización desaparición | Δ < 50ms | Δ < 100ms |
| Timeout seguridad | 5000ms ± 100ms | ✓ |
| Flash molesto | No | Máximo 1 frame |
| Build errors | 0 | ✓ |

---

## 🚀 Próximos pasos para futuras vistas

Para añadir coordinación a otros skeletons (presupuestos, clientes, etc):

```tsx
// 1. En el hook que carga datos:
const { registerLoading, resolveLoading } = useGlobalLoading();
registerLoading("presupuestos-list");
resolveLoading("presupuestos-list");

// 2. En el componente que renderiza:
const { isLoading } = useGlobalLoading();
if (isLoading) return <PresupuestosSkeleton />;
```

¡Automáticamente se coordina con los demás skeletons!
