import { useState } from "react";
import { toast } from "sonner";
import type { PresupuestoDetalle } from "../presupuesto.types";
import type { Capitulo } from "../../capitulos/capitulo.types";
import { putPresupuesto } from "../services/put-presupuesto.action";
import { getPresupuestosByID } from "../services/get-presupuesto-by-id.action";
import { syncCapitulos } from "../services/sync-presupuesto.service";

interface UsePresupuestoGuardarProps {
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

export const usePresupuestoGuardar = ({
  presupuesto,
  capitulos,
  presupuestoSnapshot,
  capitulosSnapshot,
  presupuestoId,
  setPresupuesto,
  setPresupuestoSnapshot,
  setCapitulos,
  setCapitulosSnapshot,
}: UsePresupuestoGuardarProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleDescartar = () => {
    setPresupuesto(presupuestoSnapshot!);
    setCapitulos(capitulosSnapshot);
  };

  const handleGuardar = async () => {
    if (!presupuesto || !presupuestoId) return;
    setIsSaving(true);

    try {
      await putPresupuesto(presupuestoId, {
        titulo: presupuesto.titulo,
        descripcion: presupuesto.descripcion,
        estado: presupuesto.estado,
        cliente_id:
          presupuesto.cliente_id ?? presupuesto.cliente?.cliente_id,
        validez_dias: presupuesto.validez_dias,
        condiciones_pago: presupuesto.condiciones_pago,
      });

      await syncCapitulos(capitulos, capitulosSnapshot, presupuestoId);

      const data = await getPresupuestosByID(Number(presupuestoId));
      setPresupuesto(data);
      setPresupuestoSnapshot(data);
      setCapitulos(data.capitulos || []);
      setCapitulosSnapshot(data.capitulos || []);

      toast.success("Presupuesto actualizado correctamente");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al guardar",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    handleGuardar,
    handleDescartar,
  };
};
