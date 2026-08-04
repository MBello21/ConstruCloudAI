import { useEffect, useState } from "react";
import CabeceraDetalle from "../components/presupuestos/CabeceraDetalle";
import InfoGeneral from "../components/presupuestos/InfoGeneral";
import SeccionCapitulosDetalle from "../components/presupuestos/SeccionCapitulosDetalle";
import ResumenEconomico from "../components/presupuestos/ResumenEconomico";
import { DirtyStateBar } from "../components/presupuestos/DirtyStateBar";
import { useDetallePresupuesto } from "../hooks/useDetallePresupuesto";
import { Modal } from "../components/modal/Modal";
import ModalNuevoCliente from "../components/presupuestos/ModalNuevoCliente";
import type { Cliente } from "../types";

export const DetallePresupuesto = () => {
  const [isModalNuevoCliente, setIsModalNuevoCliente] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
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
    handleEliminar,
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
        onEliminar={handleEliminar}
        onExportar={handleExportar}
      />
      <div className="max-w-4xl mx-auto">
        <InfoGeneral
          presupuesto={presupuesto}
          onActualizar={handleActualizarPresupuesto}
          clientes={clientes}
          setClientes={setClientes}
          setIsModalNuevoCliente={setIsModalNuevoCliente}
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
        <Modal
          eliminate={confirmDelete.tipo}
          setEliminate={setConfirmDelete}
          handleConfirm={confirmarEliminacion}
        />
      )}
      <ModalNuevoCliente
        isOpen={isModalNuevoCliente}
        onClose={() => setIsModalNuevoCliente(false)}
        onClienteCreado={(nuevoCliente) => {
          setClientes((prev) => [...prev, nuevoCliente]);
          handleActualizarPresupuesto("cliente_id", nuevoCliente.id);
        }}
      />
    </section>
  );
};
