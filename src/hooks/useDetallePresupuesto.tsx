import { useNavigate, useParams } from "react-router";
import { usePresupuestoData } from "./usePresupuestoData";
import { useCapitulosManager } from "./useCapitulosManager";
import { usePresupuestoGuardar } from "./usePresupuestoGuardar";
import { deleteCapitulo } from "../services/actions/capitulos/delete-capitulo.action";
import { toast } from "sonner";
import { getPresupuestosByID } from "../services/actions/presupuestos/get-presupuest.by-id.action";

export const useDetallePresupuesto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    presupuesto,
    setPresupuesto,
    presupuestoSnapshot,
    setPresupuestoSnapshot,
    capitulos,
    setCapitulos,
    confirmDelete,
    setConfirmDelete,
    capitulosSnapshot,
    setCapitulosSnapshot,
    isDirty,
    handleActualizarPresupuesto,
  } = usePresupuestoData();

  const {
    handleAgregarCapitulo,
    handleActualizarNombreCapitulo,
    handleAgregarDetalle,
    handleEliminarDetalle,
    handleActualizarDetalle,
    handleConfirmDeleteCapitulo,
    handleConfirmDeleteDetalle,
    capituloToDelete,
    detalleToDelete,
    setCapituloToDelete,
    setDetalleToDelete,
  } = useCapitulosManager({
    capitulos,
    setCapitulos,
    presupuestoId: presupuesto?.id,
  });

  const { isSaving, handleGuardar, handleDescartar } = usePresupuestoGuardar({
    presupuesto,
    capitulos,
    presupuestoSnapshot,
    capitulosSnapshot,
    presupuestoId: id,
    setPresupuesto,
    setPresupuestoSnapshot,
    setCapitulos,
    setCapitulosSnapshot,
  });

  const handleVolver = () => {
    navigate(-1);
  };

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
          const data = await getPresupuestosByID(Number(id));
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

  const handleExportar = () => {
    if (!presupuesto) return;
    console.log("Exportar presupuesto:", presupuesto.id);
  };

  return {
    presupuesto,
    capitulos,
    setPresupuesto,
    confirmDelete,
    setConfirmDelete,
    isDirty,
    isSaving,
    handleActualizarDetalle,
    handleActualizarNombreCapitulo,
    handleActualizarPresupuesto,
    handleAgregarCapitulo,
    handleAgregarDetalle,
    handleEliminarCapitulo,
    handleEliminarDetalle,
    confirmarEliminacion,
    handleExportar,
    handleVolver,
    handleDescartar,
    handleGuardar,
    handleConfirmDeleteCapitulo,
    handleConfirmDeleteDetalle,
    capituloToDelete,
    detalleToDelete,
    setCapituloToDelete,
    setDetalleToDelete,
  };
};
