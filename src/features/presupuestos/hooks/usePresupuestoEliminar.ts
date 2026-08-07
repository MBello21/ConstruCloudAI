import { useState } from "react";
import { useNavigate } from "react-router";
import type { PresupuestoDetalle } from "../presupuesto.types";
import type { Capitulo } from "../../capitulos/capitulo.types";
import type { ConfirmDelete } from "../../../shared/types";
import { deleteCapitulo } from "../../capitulos/services/delete-capitulo.action";
import { deletePresupuesto } from "../services/delete-presupuesto.action";
import { getPresupuestosByID } from "../services/get-presupuesto-by-id.action";
import { toast } from "sonner";

interface UsePresupuestoEliminarParams {
  capitulosSnapshot: Capitulo[];
  setCapitulos: (value: Capitulo[] | ((prev: Capitulo[]) => Capitulo[])) => void;
  setCapitulosSnapshot: (
    value: Capitulo[] | ((prev: Capitulo[]) => Capitulo[]),
  ) => void;
  setPresupuesto: (
    value: PresupuestoDetalle | null | ((prev: PresupuestoDetalle | null) => PresupuestoDetalle | null),
  ) => void;
  setPresupuestoSnapshot: (
    value: PresupuestoDetalle | null | ((prev: PresupuestoDetalle | null) => PresupuestoDetalle | null),
  ) => void;
  presupuestoDataId: string | undefined;
}

export const usePresupuestoEliminar = ({
  capitulosSnapshot,
  setCapitulos,
  setCapitulosSnapshot,
  setPresupuesto,
  setPresupuestoSnapshot,
  presupuestoDataId,
}: UsePresupuestoEliminarParams) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState<ConfirmDelete | null>(
    null,
  );

  const confirmarEliminacion = async () => {
    if (!confirmDelete) return;

    try {
      if (confirmDelete.tipo === "capitulo") {
        const esNuevo = !capitulosSnapshot.some(
          (c) => c.id === confirmDelete.id,
        );
        if (!esNuevo) {
          await deleteCapitulo(confirmDelete.id);
          setCapitulosSnapshot((prev) =>
            prev.filter((c) => c.id !== confirmDelete.id),
          );
          const data = await getPresupuestosByID(Number(presupuestoDataId));
          setPresupuesto(data);
          setPresupuestoSnapshot(data);
        }
        setCapitulos((prev) => prev.filter((c) => c.id !== confirmDelete.id));
      }
      toast.success("Eliminado correctamente");
    } catch (_error) {
      toast.error("Error al eliminar");
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleEliminarCapitulo = (id: number | string) => {
    setConfirmDelete({ tipo: "capitulo", id });
  };

  const handleEliminar = async (id: number) => {
    try {
      await deletePresupuesto(id);
      navigate(-1);
    } catch (_error) {
      toast.error("No se pudo eliminar el presupuesto");
    }
  };

  return {
    confirmDelete,
    setConfirmDelete,
    confirmarEliminacion,
    handleEliminarCapitulo,
    handleEliminar,
  };
};
