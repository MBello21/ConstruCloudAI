import { useState } from "react";
import { useNavigate } from "react-router";
import type { ConfirmDelete } from "../../../shared/types";
import { deletePresupuesto } from "../services/delete-presupuesto.action";
import { toast } from "sonner";
import type { Capitulo } from "../../capitulos/capitulo.types";

interface UsePresupuestoEliminarParams {
  capitulos: Capitulo[];
  setCapitulos: React.Dispatch<React.SetStateAction<Capitulo[]>>;
}

export const usePresupuestoEliminar = ({
  capitulos,
  setCapitulos,
}: UsePresupuestoEliminarParams) => {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState<ConfirmDelete | null>(
    null,
  );

  const handleEliminarCapitulo = (id: number | string) => {
    setConfirmDelete({ tipo: "capitulo", id });
  };

  const handleEliminarDetalle = (
    capituloId: number | string,
    id: number | string,
  ) => {
    setConfirmDelete({ tipo: "detalle", id, capituloId });
  };

  const confirmarEliminacion = () => {
    if (!confirmDelete) return;

    if (confirmDelete.tipo === "capitulo") {
      setCapitulos(capitulos.filter((c) => c.id !== confirmDelete.id));
      toast.success("Capítulo eliminado");
    }

    if (confirmDelete.tipo === "detalle") {
      if (!confirmDelete.capituloId) return;
      setCapitulos(
        capitulos.map((c) => {
          if (c.id === confirmDelete.capituloId) {
            return {
              ...c,
              detalles: c.detalles.filter((d) => d.id !== confirmDelete.id),
            };
          }
          return c;
        }),
      );
      toast.success("Detalle eliminado");
    }

    setConfirmDelete(null);
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
    handleEliminarCapitulo,
    handleEliminarDetalle,
    confirmarEliminacion,
    handleEliminar,
  };
};
