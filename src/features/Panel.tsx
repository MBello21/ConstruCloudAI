import CabeceraTabla from "../components/Panel/CabeceraTabla";
import TablaPresupuestos from "../components/Panel/TablaPresupuestos";
import PaginacionTabla from "../components/Panel/PaginacionTabla";
import { SkeletonTabla } from "../components/Panel/SkeletonTabla";
import { formatearFecha, formatearPrecio } from "../helpers";
import { SectionHeader } from "../components/ui/SectionHeader";
import { usePanel } from "../hooks/usePanel";

export const Panel = () => {
  const {
    presupuestos,
    filtro,
    setFiltro,
    loading,
    presupuestosFiltrados,
    totalPaginas,
    pagina,
    handleCambioPagina,
  } = usePanel();

  return (
    <section className="p-3 px-5 min-h-full bg-gray-100">
      <SectionHeader
        title="PANEL GENERAL"
        section="Presupuesto de obra"
        subtitle="Resumen de actividad · Julio 2026"
      />
      <div className="border border-gray-300 rounded-lg overflow-hidden mt-5 shadow-md">
        <CabeceraTabla
          totalRegistros={presupuestos.length}
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <div className="min-h-112">
          {loading ? (
            <SkeletonTabla />
          ) : (
            <>
              <TablaPresupuestos
                presupuestos={presupuestosFiltrados}
                formatearFecha={formatearFecha}
                formatearPrecio={formatearPrecio}
              />
              <PaginacionTabla
                pagina={pagina}
                totalPaginas={totalPaginas}
                onCambioPagina={handleCambioPagina}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
