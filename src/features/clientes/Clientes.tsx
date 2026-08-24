import { SectionHeader } from "../../shared/components/SectionHeader";
import { SectionHeaderSkeleton } from "../../shared/components/skeletons/SectionHeaderSkeleton";
import FiltrosTabla from "../../features/panel/components/FiltrosTabla";
import MetricasClientes from "./components/MetricasClientes";
import TablaClientes from "./components/TablaClientes";
import SkeletonMetricasClientes from "./components/SkeletonMetricasClientes";
import SkeletonTablaClientes from "./components/SkeletonTablaClientes";
import SkeletonFiltrosTabla from "./components/SkeletonFiltrosTabla";
import { FILTROS_ESTADO_CLIENTES } from "../../shared/helpers/filtro.helpers";
import { PaginacionTabla } from "../panel/components";
import { useClientes } from "./hooks/useClientes";

export const Clientes = () => {
  const {
    pathname,
    setFiltro,
    clientesFiltrados,
    clientesActivos,
    presupuestosVinculados,
    totalPaginas,
    totalClientes,
    pagina,
    filtro,
    showSkeleton,
    handleCambioPagina,
    handleDelete,
  } = useClientes();

  return (
    <section className="py-3 px-5 ">
      {showSkeleton ? (
        <SectionHeaderSkeleton />
      ) : (
        <SectionHeader
          title="GESTIÓN"
          section="Cartera"
          subtitle="Clientes"
          pathname={pathname}
        />
      )}

      <div className="mt-6">
        {showSkeleton ? (
          <SkeletonMetricasClientes />
        ) : (
          <MetricasClientes
            totalClientes={totalClientes}
            clientesActivos={clientesActivos}
            presupuestosVinculados={presupuestosVinculados}
          />
        )}
      </div>

      <div className="mt-5">
        {showSkeleton ? (
          <SkeletonFiltrosTabla />
        ) : (
          <>
            <FiltrosTabla
              filtros={FILTROS_ESTADO_CLIENTES}
              filtro={filtro}
              setFiltro={setFiltro}
            />
          </>
        )}
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden mt-5 shadow-md">
        <div className="bg-white flex flex-col">
          {showSkeleton ? (
            <SkeletonTablaClientes />
          ) : (
            <>
              <TablaClientes
                clientes={clientesFiltrados}
                onDelete={handleDelete}
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
