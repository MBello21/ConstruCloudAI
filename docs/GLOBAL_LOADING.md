# Global Loading Coordinator

## Overview
Sistema coordinado para mostrar/ocultar skeletons de forma sincronizada cuando múltiples fuentes de datos se cargan simultáneamente.

## Características
- ✅ Coordina múltiples fuentes de datos (Panel, Métricas, etc.)
- ✅ Todos los skeletons aparecen y desaparecen al mismo tiempo
- ✅ Timeout de seguridad (5s) previene skeleton infinito si un fetch falla
- ✅ Reutilizable para futuras vistas/components

## Cómo funciona

### Arquitectura
```
┌─────────────────────────────────────────┐
│   App (envuelto con GlobalLoadingProvider)
├─────────────────────────────────────────┤
│   GlobalLoadingContext                   │
│   - Set<string> de fuentes activas       │
│   - isLoading = size > 0                 │
└─────────────────────────────────────────┘
       ↑                    ↑
       │                    │
   usePanel()          MetricasPanel()
   registerLoading()   registerLoading()
   resolveLoading()    resolveLoading()
```

### Flujo
1. Componente inicia fetch → `registerLoading("component-name")`
2. Todos los skeletons ven `isLoading = true` → aparecen simultáneamente
3. Último fetch finaliza → último `resolveLoading()` 
4. `isLoading = false` → todos los skeletons desaparecen simultáneamente
5. Timeout de 5s asegura que si un fetch falla, el skeleton no queda infinito

## Uso

### Para añadir coordinación a un componente

```tsx
import { useGlobalLoading } from "../../shared/hooks/useGlobalLoading";

// En el hook de datos
const MyDataHook = () => {
  const { registerLoading, resolveLoading } = useGlobalLoading();

  useEffect(() => {
    const fetchData = async () => {
      registerLoading("my-component");  // Marca como cargando
      try {
        const data = await fetchSomeData();
        setData(data);
      } finally {
        resolveLoading("my-component");  // Marca como resuelto
      }
    };
    fetchData();
  }, [registerLoading, resolveLoading]);

  return { data, /* ... */ };
};
```

### Para usar isLoading en render

```tsx
import { useGlobalLoading } from "../../shared/hooks/useGlobalLoading";

const MyComponent = () => {
  const { isLoading } = useGlobalLoading();

  if (isLoading) {
    return <MyComponentSkeleton />;
  }

  return <MyComponentContent />;
};
```

## Fuentes actuales de loading

| Fuente | Componente | Estado |
|--------|-----------|--------|
| `"metricas"` | MetricasPanel | Registrado ✅ |
| `"panel-tabla"` | usePanel (Panel) | Registrado ✅ |

## Añadir nuevas fuentes

1. En el hook/componente que carga datos:
   ```tsx
   const { registerLoading, resolveLoading } = useGlobalLoading();
   
   // Al iniciar fetch
   registerLoading("presupuestos-list");
   
   // Al terminar (try/catch/finally)
   resolveLoading("presupuestos-list");
   ```

2. En el componente que renderiza skeleton:
   ```tsx
   const { isLoading } = useGlobalLoading();
   
   return isLoading ? <Skeleton /> : <Content />;
   ```

## Detalles técnicos

### Timeout de seguridad
- Si un fetch falla y nunca llama `resolveLoading()`, un timeout de 5 segundos lo fuerza a `isLoading = false`
- Evita que la UI quede en estado skeleton infinito
- El componente seguirá mostrando su estado de error, no el skeleton

### Performance
- Usa Set<string> internamente → O(1) lookups
- Context re-render solo cuando cambia `isLoading` (booleano)
- No re-renderiza todo el árbol, solo componentes que usan el hook

### Mantener estado local
- Cada hook mantiene su propio `loading` state localmente
- Esto permite que componentes internos sepan si ELLOS están cargando
- `globalIsLoading` es solo para coordinar CUÁNDO mostrar skeletons

## Ejemplo: Sidebar

Si el Sidebar alguna vez carga datos dinámicos (permisos, avatar del usuario):

```tsx
const Sidebar = () => {
  const { registerLoading, resolveLoading } = useGlobalLoading();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      registerLoading("sidebar-user");  // ← Solo si hay datos async
      try {
        const user = await getCurrentUser();
        setUserData(user);
      } finally {
        resolveLoading("sidebar-user");
      }
    };
    fetchUser();
  }, [registerLoading, resolveLoading]);

  // Sidebar es estático (no carga nav items) → no registra loading
};
```

## Troubleshooting

**Problema**: Skeleton queda infinito  
**Solución**: Verificar que `resolveLoading()` se llama en el `finally` block

**Problema**: Skeletons desaparecen a diferentes tiempos  
**Solución**: Verificar que ambas fuentes registran y resuelven sus loading

**Problema**: "useGlobalLoading debe ser usado dentro de GlobalLoadingProvider"  
**Solución**: Verificar que `<App>` está dentro de `<GlobalLoadingProvider>` en `app/App.tsx`
