import CabeceraTabla from "./components/CabeceraTabla";
import CabeceraTableSkeleton from "./components/CabeceraTableSkeleton";
import TablaPresupuestos from "./components/TablaPresupuestos";
import { SkeletonTabla } from "./components/SkeletonTabla";
import { formatearFecha, formatearPrecio } from "../../shared/helpers";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { SectionHeaderSkeleton } from "../../shared/components/skeletons/SectionHeaderSkeleton";
import { usePanel } from "./hooks/usePanel";
import { useLocation } from "react-router";
import MetricasPanel from "./components/MetricasPanel";
import useGlobalReducer from "../../state/useGlobalReducer";
import ModalEditarPresupuesto from "../presupuestos/components/ModalEditarPresupuesto";
import { useGlobalLoading } from "../../shared/hooks/useGlobalLoading";
import { ARR_MONTHS } from "../../shared/constants/date.constant";

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
  const year = new Date().getFullYear();
  const months = ARR_MONTHS.find((m) => m.index === new Date().getMonth());

  return (
    <section className="p-3 px-5 min-h-full bg-gray-100">
      {globalIsLoading ? (
        <SectionHeaderSkeleton />
      ) : (
        <SectionHeader
          title="Panel general"
          section="Presupuesto de obra"
          subtitle={`Resumen de actividad · ${months?.month} ${year}`}
          pathname={pathname}
        />
      )}
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
