import { useParams } from "react-router";
import { usePresupuestoData } from "./usePresupuestoData";
import { useCapitulosManager } from "../../capitulos/hooks/useCapitulosManager";
import { usePresupuestoGuardar } from "./usePresupuestoGuardar";
import { usePresupuestoEliminar } from "./usePresupuestoEliminar";

export const useDetallePresupuesto = () => {
  const { id } = useParams();

  const {
    presupuesto,
    setPresupuesto,
    presupuestoSnapshot,
    setPresupuestoSnapshot,
    capitulos,
    setCapitulos,
    capitulosSnapshot,
    setCapitulosSnapshot,
    isDirty,
    handleActualizarPresupuesto,
    blocker,
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

  const {
    confirmDelete,
    setConfirmDelete,
    confirmarEliminacion,
    handleEliminarCapitulo,
    handleEliminar,
  } = usePresupuestoEliminar({
    capitulosSnapshot,
    setCapitulos,
    setCapitulosSnapshot,
    setPresupuesto,
    setPresupuestoSnapshot,
    presupuestoDataId: id,
  });

  const handleExportar = () => {
    if (!presupuesto) return;
    console.log("Exportar presupuesto:", presupuesto.id);
  };

  const handleVolver = () => {
    window.history.back();
  };

  return {
    presupuesto,
    capitulos,
    setPresupuesto,
    confirmDelete,
    setConfirmDelete,
    isDirty,
    isSaving,
    handleEliminar,
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
    blocker,
  };
};
