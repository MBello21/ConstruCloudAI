import { useState } from "react";
import { PRESUPUESTOS_MOCK } from "../mock/presupuestos.mock";
import CabeceraTabla from "../components/Panel/CabeceraTabla";
import TablaPresupuestos from "../components/Panel/TablaPresupuestos";
import PaginacionTabla from "../components/Panel/PaginacionTabla";
import { formatearFecha, formatearPrecio } from "../helpers";
import type { Presupuesto } from "../types";

const ITEMS_POR_PAGINA = 7;

export const Panel = () => {
  const [pagina, setPagina] = useState(1);
  const [filtro, setFiltro] = useState<string>("Todos");
  const presupuestosFiltrados =
    filtro === "Todos"
      ? PRESUPUESTOS_MOCK
      : PRESUPUESTOS_MOCK.filter((p) => p.estado === filtro);

  const totalPaginas = Math.ceil(PRESUPUESTOS_MOCK.length / ITEMS_POR_PAGINA);
  const indiceInicio = (pagina - 1) * ITEMS_POR_PAGINA;
  const indiceFin = indiceInicio + ITEMS_POR_PAGINA;
  const presupuestosPagina: Presupuesto[] = presupuestosFiltrados.slice(
    indiceInicio,
    indiceFin,
  );

  const handleCambioPagina = (nuevaPagina: number): void => {
    setPagina(nuevaPagina);
  };
  return (
    <section className="p-3 px-5 bg-gray-100 h-full">
      <div>
        <h2 className="font-sans text-sm text-neutral-500 font-semibold">
          PANEL GENERAL
        </h2>
        <h2 className="font-sans font-bold text-3xl">Presupuestos de obra</h2>
        <p className="text-neutral-400">Resumen de actividad · Julio 2026</p>
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden mt-5 shadow-md">
        <CabeceraTabla
          totalRegistros={PRESUPUESTOS_MOCK.length}
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <TablaPresupuestos
          presupuestos={presupuestosPagina}
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
