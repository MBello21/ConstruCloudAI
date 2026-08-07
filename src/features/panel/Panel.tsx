import CabeceraTabla from "./components/CabeceraTabla";
import CabeceraTableSkeleton from "./components/CabeceraTableSkeleton";
import TablaPresupuestos from "./components/TablaPresupuestos";
import { SkeletonTabla } from "./components/SkeletonTabla";
import { formatearFecha, formatearPrecio } from "../../shared/helpers";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { usePanel } from "./hooks/usePanel";
import { useLocation } from "react-router";
import MetricasPanel from "./components/MetricasPanel";
import useGlobalReducer from "../../state/useGlobalReducer";
import ModalEditarPresupuesto from "../presupuestos/components/ModalEditarPresupuesto";
import { useGlobalLoading } from "../../shared/hooks/useGlobalLoading";

export const Panel = () => {
  const {
    presupuestos,
    filtro,
    setFiltro,
    loading: _loading,
    isOpen,
    setIsOpen,
    presupuestoSeleccionado,
    handleEditar,
    handleGuardar,
  } = usePanel();
  const { isLoading: globalIsLoading } = useGlobalLoading();
  const { pathname } = useLocation();
  const { store } = useGlobalReducer();

  return (
    <section className="p-3 px-5 min-h-full bg-gray-100">
      <SectionHeader
        title="PANEL GENERAL"
        section="Presupuesto de obra"
        subtitle="Resumen de actividad · Julio 2026"
        pathname={pathname}
      />
      <div className="mt-5">
        <MetricasPanel />
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden mt-5 shadow-md">
        {globalIsLoading ? (
          <CabeceraTableSkeleton />
        ) : (
          <CabeceraTabla
            totalRegistros={presupuestos.length}
            filtro={filtro}
            setFiltro={setFiltro}
          />
        )}
        <div className="min-h-112 bg-white flex flex-col justify-between">
          {globalIsLoading ? (
            <SkeletonTabla showPagination={false} />
          ) : (
            <TablaPresupuestos
              presupuestos={presupuestos}
              formatearFecha={formatearFecha}
              formatearPrecio={formatearPrecio}
              onEditar={handleEditar}
            />
          )}
        </div>
      </div>
      {isOpen && presupuestoSeleccionado && (
        <ModalEditarPresupuesto
          key={presupuestoSeleccionado.id}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onGuardar={handleGuardar}
          presupuesto={presupuestoSeleccionado}
          clientes={store.clientes}
        />
      )}
    </section>
  );
};
