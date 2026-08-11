import type { Capitulo } from "../../capitulos/capitulo.types";
import type { PresupuestoDetalle } from "./presupuesto.types";

export interface UsePresupuestoEliminarParams {
  capitulosSnapshot: Capitulo[];
  setCapitulos: (
    value: Capitulo[] | ((prev: Capitulo[]) => Capitulo[]),
  ) => void;
  setCapitulosSnapshot: (
    value: Capitulo[] | ((prev: Capitulo[]) => Capitulo[]),
  ) => void;
  setPresupuesto: (
    value:
      | PresupuestoDetalle
      | null
      | ((prev: PresupuestoDetalle | null) => PresupuestoDetalle | null),
  ) => void;
  setPresupuestoSnapshot: (
    value:
      | PresupuestoDetalle
      | null
      | ((prev: PresupuestoDetalle | null) => PresupuestoDetalle | null),
  ) => void;
  presupuestoDataId: string | undefined;
}

export interface UsePresupuestoGuardarProps {
  presupuesto: PresupuestoDetalle | null;
  capitulos: Capitulo[];
  presupuestoSnapshot: PresupuestoDetalle | null;
  capitulosSnapshot: Capitulo[];
  presupuestoId?: string | number;
  setPresupuesto: (presupuesto: PresupuestoDetalle) => void;
  setPresupuestoSnapshot: (presupuesto: PresupuestoDetalle) => void;
  setCapitulos: (capitulos: Capitulo[]) => void;
  setCapitulosSnapshot: (capitulos: Capitulo[]) => void;
}
