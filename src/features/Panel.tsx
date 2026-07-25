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
  useEffect(() => {
    const fetchData = async () => {
      const skip = (pagina - 1) * ITEMS_POR_PAGINA;
      const data = await getPresupuestos(skip);
      setPresupuestos(data.presupuestos);
      setTotalRegistros(data.total);
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
      </div>
    </section>
  );
};
