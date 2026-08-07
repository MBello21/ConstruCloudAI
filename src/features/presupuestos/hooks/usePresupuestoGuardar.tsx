import { useState } from "react";
import { toast } from "sonner";
import type { PresupuestoDetalle } from "../presupuesto.types";
import type { Capitulo } from "../../capitulos/capitulo.types";
import { putPresupuesto } from "../services/put-presupuesto.action";
import { postCapitulo } from "../../capitulos/services/post-capitulo.action";
import { putCapitulo } from "../../capitulos/services/put-capitulo.action";
import { deleteCapitulo } from "../../capitulos/services/delete-capitulo.action";
import { postDetalle } from "../../detalles/services/post-detalle.action";
import { putDetalle } from "../../detalles/services/put-detalle.action";
import { deleteDetalle } from "../../detalles/services/delete-detalle.action";
import { getPresupuestosByID } from "../services/get-presupuesto-by-id.action";

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
      // 1. Actualizar datos del presupuesto
      await putPresupuesto(presupuestoId, {
        titulo: presupuesto.titulo,
        descripcion: presupuesto.descripcion,
        estado: presupuesto.estado,
        cliente_id:
          presupuesto.cliente_id ?? presupuesto.cliente?.cliente_id,
        validez_dias: presupuesto.validez_dias,
        condiciones_pago: presupuesto.condiciones_pago,
      });

      // 2. Detectar cambios en capítulos
      const capitulosOriginales = new Set(capitulosSnapshot.map((c) => c.id));
      const capitulosActuales = new Set(capitulos.map((c) => c.id));

      // Capítulos eliminados
      for (const cap of capitulosSnapshot) {
        if (!capitulosActuales.has(cap.id)) {
          await deleteCapitulo(cap.id);
        }
      }

      // Capítulos nuevos o actualizados
      for (const cap of capitulos) {
        if (!capitulosOriginales.has(cap.id)) {
          // Nuevo capítulo + sus detalles
          const created = await postCapitulo({
            presupuesto_id: Number(presupuestoId),
            nombre: cap.nombre,
            numero: cap.numero,
            orden: cap.orden,
          });
          for (const det of cap.detalles) {
            await postDetalle({ ...det, capitulo_id: created.id });
          }
        } else {
          // Capítulo existente: actualizar nombre si cambió
          const original = capitulosSnapshot.find((c) => c.id === cap.id);
          if (original && original.nombre !== cap.nombre) {
            await putCapitulo(cap.id, { nombre: cap.nombre });
          }

          // 3. Detectar cambios en detalles de este capítulo
          const detallesOriginales = new Set(
            original?.detalles.map((d) => d.id) || [],
          );
          const detallesActuales = new Set(cap.detalles.map((d) => d.id));

          for (const det of original?.detalles || []) {
            if (!detallesActuales.has(det.id)) {
              await deleteDetalle(det.id);
            }
          }

          for (const det of cap.detalles) {
            if (!detallesOriginales.has(det.id)) {
              await postDetalle({ ...det, capitulo_id: cap.id });
            } else {
              const detOriginal = original?.detalles.find(
                (d) => d.id === det.id,
              );
              if (JSON.stringify(det) !== JSON.stringify(detOriginal)) {
                await putDetalle(det.id, det);
              }
            }
          }
        }
      }

      // 4. Refrescar datos del backend
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
