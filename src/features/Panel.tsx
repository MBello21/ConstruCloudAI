import { useEffect, useState } from "react";
import CabeceraTabla from "../components/Panel/CabeceraTabla";
import TablaPresupuestos from "../components/Panel/TablaPresupuestos";
import PaginacionTabla from "../components/Panel/PaginacionTabla";
import { formatearFecha, formatearPrecio } from "../helpers";
import type { PresupuestoElement } from "../types";
import { SectionHeader } from "../components/ui/SectionHeader";
import { getPresupuestos } from "../services/actions/get-presupuestos.action";

const ITEMS_POR_PAGINA = 7;

export const Panel = () => {
  const [pagina, setPagina] = useState(1);
  const [filtro, setFiltro] = useState<string>("Todos");
  const [presupuestos, setPresupuestos] = useState<PresupuestoElement[]>([]);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const skip = (pagina - 1) * ITEMS_POR_PAGINA;
      const data = await getPresupuestos(skip);
      setPresupuestos(data.presupuestos);
      setTotalRegistros(data.total);
      setTimeout(() => setLoading(false), 500);
    };
    fetchData();
  }, [pagina]);
  const presupuestosFiltrados =
    filtro === "Todos"
      ? presupuestos
      : presupuestos.filter((p) => p.estado === filtro);

  const totalPaginas = Math.ceil(totalRegistros / ITEMS_POR_PAGINA);

  const handleCambioPagina = (nuevaPagina: number): void => {
    setPagina(nuevaPagina);
  };

  return (
    <section className="p-3 px-5 bg-gray-100 h-full">
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
        {loading ? (
          <div className="bg-white">
            {Array.from({ length: 7 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex items-center border-b border-gray-200 p-4 gap-4"
              >
                <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
                <div className="flex-1 h-6 bg-gray-200 animate-pulse rounded" />
                <div className="w-28 h-6 bg-gray-200 animate-pulse rounded" />
                <div className="w-24 h-6 bg-gray-200 animate-pulse rounded" />
                <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
                <div className="w-16 h-6 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
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
    </section>
  );
};
