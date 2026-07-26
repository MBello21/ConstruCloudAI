import { useEffect, useState } from "react";
import type { PresupuestoElement } from "../types";
import { getPresupuestos } from "../services/actions/get-presupuestos.action";

const ITEMS_POR_PAGINA = 7;

export const usePresupuestos = () => {
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
  return {
    presupuestos,
    presupuestosFiltrados,
    pagina,
    totalPaginas,
    filtro,
    setFiltro,
    loading,
    totalRegistros,
    ITEMS_POR_PAGINA,
    handleCambioPagina,
  };
};
