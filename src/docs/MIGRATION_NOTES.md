# Migración de Types - 2026-07-24

Los tipos han sido reorganizados por dominio en los siguientes archivos:

## Arquivos nuevos

- `presupuesto.types.ts` - Presupuesto, PresupuestoDetalle
- `capitulo.types.ts` - Capitulo
- `detalle.types.ts` - Detalle, Unidad type
- `navegation.types.ts` - Navegation
- `index.ts` - Reexporta todos los tipos

## Archivos antiguos (deprecados)

- `interface.ts` - Vacío, migrado a presupuesto.types.ts
- `presupuestos.interface.ts` - Migrado a presupuesto.types.ts
- `presupuestos-with-detail.interfaces.ts` - Migrado a capitulo/detalle/presupuesto.types.ts

## Cómo importar

En lugar de:
```typescript
import type { Presupuesto } from "../types/presupuestos.interface";
```

Ahora:
```typescript
import type { Presupuesto } from "../types";
```

Todos los tipos están centralizados en `src/types/index.ts`.
