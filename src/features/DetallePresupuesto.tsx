import CabeceraDetalle from "../components/presupuestos/CabeceraDetalle";
import InfoGeneral from "../components/presupuestos/InfoGeneral";
import SeccionCapitulosDetalle from "../components/presupuestos/SeccionCapitulosDetalle";
import ResumenEconomico from "../components/presupuestos/ResumenEconomico";
import { useDetallePresupuesto } from "../hooks/useDetallePresupuesto";

export const DetallePresupuesto = () => {
  const {
    presupuesto,
    capitulos,
    handleVolver,
    handleEliminar,
    handleExportar,
    handleActualizarPresupuesto,
    handleActualizarDetalle,
    handleAgregarCapitulo,
    handleEliminarCapitulo,
    handleToggleCapitulo,
    handleActualizarNombreCapitulo,
    handleAgregarDetalle,
    handleEliminarDetalle,
  } = useDetallePresupuesto();

  if (!presupuesto) return <div>Cargando...</div>;

  return (
    <section className="min-h-screen bg-gray-100 ">
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
        />

        <SeccionCapitulosDetalle
          capitulos={capitulos}
          onAgregarCapitulo={handleAgregarCapitulo}
          onEliminarCapitulo={handleEliminarCapitulo}
          onToggleCapitulo={handleToggleCapitulo}
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
    </section>
  );
};
