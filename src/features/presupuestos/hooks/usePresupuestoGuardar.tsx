import { useState } from "react";
import { toast } from "sonner";
import { putPresupuesto } from "../services/put-presupuesto.action";
import { getPresupuestosByID } from "../services/get-presupuesto-by-id.action";
import { syncCapitulos } from "../services/sync-presupuesto.service";
import type { UsePresupuestoGuardarProps } from "../types/hooks.types";

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
        cliente_id: presupuesto.cliente_id ?? presupuesto.cliente?.cliente_id,
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
      toast.error(error instanceof Error ? error.message : "Error al guardar");
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
