import { useEffect } from "react";
import CabeceraDetalle from "../components/presupuestos/CabeceraDetalle";
import InfoGeneral from "../components/presupuestos/InfoGeneral";
import SeccionCapitulosDetalle from "../components/presupuestos/SeccionCapitulosDetalle";
import ResumenEconomico from "../components/presupuestos/ResumenEconomico";
import { DirtyStateBar } from "../components/presupuestos/DirtyStateBar";
import { useDetallePresupuesto } from "../hooks/useDetallePresupuesto";

export const DetallePresupuesto = () => {
  const {
    presupuesto,
    capitulos,
    isDirty,
    isSaving,
    handleVolver,
    confirmarEliminacion,
    confirmDelete,
    setConfirmDelete,
    handleExportar,
    handleActualizarPresupuesto,
    handleActualizarDetalle,
    handleAgregarCapitulo,
    handleEliminarCapitulo,
    handleActualizarNombreCapitulo,
    handleAgregarDetalle,
    handleEliminarDetalle,
    handleDescartar,
    handleGuardar,
  } = useDetallePresupuesto();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  if (!presupuesto) return <div>Cargando...</div>;
  console.log({ presupuesto });
  return (
    <section className="min-h-screen bg-gray-100 pb-32">
      <CabeceraDetalle
        presupuesto={presupuesto}
        onVolver={handleVolver}
        // onEliminar={handleEliminar}
        onExportar={handleExportar}
      />
      <div className="max-w-4xl mx-auto">
        <InfoGeneral
          presupuesto={presupuesto}
          onActualizar={handleActualizarPresupuesto}
        />

        <SeccionCapitulosDetalle
          capitulos={capitulos}
          onAgregarCapitulo={handleAgregarCapitulo}
          onEliminarCapitulo={handleEliminarCapitulo}
          onActualizarNombreCapitulo={handleActualizarNombreCapitulo}
          onAgregarDetalle={handleAgregarDetalle}
          onEliminarDetalle={handleEliminarDetalle}
          onActualizarDetalle={handleActualizarDetalle}
        />

        <ResumenEconomico
          subtotal={presupuesto.subtotal}
          iva={presupuesto.iva}
        />
      </div>

      <DirtyStateBar
        isDirty={isDirty}
        isSaving={isSaving}
        onDescartar={handleDescartar}
        onGuardar={handleGuardar}
      />
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ¿Eliminar {confirmDelete.tipo}?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
