import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { PresupuestoElement } from "../types";
import { getPresupuestos } from "../services/actions/get-presupuestos.action";

export const usePanel = () => {
  const [filtro, setFiltro] = useState<string>("Todos");
  const [presupuestos, setPresupuestos] = useState<PresupuestoElement[]>([]);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const skip = 0;
      try {
        const data = await getPresupuestos(skip);
        setPresupuestos(data.presupuestos);
        setTotalRegistros(data.total);
      } catch (_error) {
        toast.error("No se pudo conectar con el servidor. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const presupuestosFiltrados =
    filtro === "Todos"
      ? presupuestos
      : presupuestos.filter((p) => p.estado === filtro);

  return {
    presupuestos,
    presupuestosFiltrados,
    filtro,
    setFiltro,
    loading,
    totalRegistros,
  };
};
