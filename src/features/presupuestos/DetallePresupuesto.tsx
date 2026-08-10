import { useState } from "react";
import CabeceraDetalle from "./components/CabeceraDetalle";
import InfoGeneral from "./components/InfoGeneral";
import SeccionCapitulosDetalle from "./components/SeccionCapitulosDetalle";
import ResumenEconomico from "./components/ResumenEconomico";
import { DirtyStateBar } from "./components/DirtyStateBar";
import { useDetallePresupuesto } from "./hooks/useDetallePresupuesto";
import { Modal } from "../../shared/components/Modal";
import { ModalConfirmarSalida } from "../../shared/components/ModalConfirmarSalida";
import ModalNuevoCliente from "../../features/clientes/components/ModalNuevoCliente";
import type { Cliente } from "../../features/clientes/cliente.types";
import { SplashScreen } from "../../shared/components/SplashScreen";

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
    blocker,
  } = useDetallePresupuesto();

  if (!presupuesto) return <SplashScreen />;
  console.log({ presupuesto });
  return (
    <>
      <ModalConfirmarSalida blocker={blocker} />
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
    </>
  );
};
