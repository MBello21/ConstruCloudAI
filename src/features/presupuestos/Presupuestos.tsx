import { useLocation } from "react-router";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { SectionHeaderSkeleton } from "../../shared/components/skeletons/SectionHeaderSkeleton";
import FiltrosTabla from "../../features/panel/components/FiltrosTabla";
import { usePresupuestos } from "./hooks/usePresupuestos";
import { FILTROS_ESTADO_PRESUPUESTOS } from "../../shared/helpers/filtro.helpers";
import { PaginacionTabla, TablaPresupuestos } from "../../features/panel/components";
import { formatearFecha, formatearPrecio } from "../../shared/helpers";
import { SkeletonTabla } from "../../features/panel/components/SkeletonTabla";
import useGlobalReducer from "../../state/useGlobalReducer";
import ModalEditarPresupuesto from "./components/ModalEditarPresupuesto";

export const Presupuestos = () => {
  const { pathname } = useLocation();
  const {
    filtro,
    presupuestos,
    isOpen,
    setIsOpen,
    presupuestoSeleccionado,
    loading,
    pagina,
    totalPaginas,
    totalRegistros,
    ITEMS_POR_PAGINA,
    handleCambioPagina,
    handleEditar,
    handleGuardar,
    handleFiltro,
  } = usePresupuestos();

  const { store } = useGlobalReducer();
  return (
    <section className="p-3 px-5 min-h-full bg-gray-100">
      {loading ? (
        <SectionHeaderSkeleton />
      ) : (
        <SectionHeader
          title="GESTIÓN"
          section="Presupuestos"
          subtitle={`${pagina * ITEMS_POR_PAGINA > totalRegistros ? totalRegistros : pagina * ITEMS_POR_PAGINA} de ${totalRegistros} presupuestos`}
          pathname={pathname}
        />
      )}
      <div className="mt-5">
        <FiltrosTabla
          filtros={FILTROS_ESTADO_PRESUPUESTOS}
          filtro={filtro}
          handleFiltro={handleFiltro}
        />
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden mt-5 shadow-md">
        <div className="min-h-112 bg-white flex flex-col justify-between">
          {loading ? (
            <SkeletonTabla showPagination={true} />
          ) : (
            <>
              <TablaPresupuestos
                presupuestos={presupuestos}
                formatearFecha={formatearFecha}
                formatearPrecio={formatearPrecio}
                onEditar={handleEditar}
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
