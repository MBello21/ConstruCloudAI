import CabeceraTabla from "../components/Panel/CabeceraTabla";
import TablaPresupuestos from "../components/Panel/TablaPresupuestos";
import { SkeletonTabla } from "../components/Panel/SkeletonTabla";
import { formatearFecha, formatearPrecio } from "../helpers";
import { SectionHeader } from "../components/ui/SectionHeader";
import { usePanel } from "../hooks/usePanel";
import { useLocation } from "react-router";

export const Panel = () => {
  const { presupuestos, filtro, setFiltro, loading, presupuestosFiltrados } =
    usePanel();
  const { pathname } = useLocation();
  return (
    <section className="p-3 px-5 min-h-full bg-gray-100">
      <SectionHeader
        title="PANEL GENERAL"
        section="Presupuesto de obra"
        subtitle="Resumen de actividad · Julio 2026"
        pathname={pathname}
      />
      <div className="border border-gray-300 rounded-lg overflow-hidden mt-5 shadow-md">
        <CabeceraTabla
          totalRegistros={presupuestos.length}
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <div className="min-h-112 bg-white flex flex-col justify-between">
          {loading ? (
            <SkeletonTabla showPagination={false} />
          ) : (
            <TablaPresupuestos
              presupuestos={presupuestosFiltrados}
              formatearFecha={formatearFecha}
              formatearPrecio={formatearPrecio}
            />
          )}
        </div>
      </div>
    </section>
  );
};
