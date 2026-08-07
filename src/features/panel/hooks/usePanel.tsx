import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { PresupuestoElement, PresupuestoFormData } from "../../../features/presupuestos/presupuesto.types";
import { getPresupuestos } from "../../../features/presupuestos/services/get-presupuestos.action";
import { putPresupuesto } from "../../../features/presupuestos/services/put-presupuesto.action";
import { useGlobalLoading } from "../../../shared/hooks/useGlobalLoading";

export const usePanel = () => {
  const [filtro, setFiltro] = useState<string>("Todos");
  const [presupuestos, setPresupuestos] = useState<PresupuestoElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [presupuestoSeleccionado, setPresupuestoSeleccionado] =
    useState<PresupuestoElement | null>(null);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [loading, setLoading] = useState(false);
  const { registerLoading, resolveLoading } = useGlobalLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      registerLoading("panel-tabla");
      const skip = 0;
      try {
        const data = await getPresupuestos(filtro, skip);
        setPresupuestos(data.presupuestos);
        setTotalRegistros(data.total);
      } catch (_error) {
        toast.error("No se pudo conectar con el servidor. Inténtalo de nuevo.");
      } finally {
        setTimeout(() => {
          setLoading(false);
          resolveLoading("panel-tabla");
        }, 500);
      }
    };
    fetchData();
  }, [filtro, refresh, registerLoading, resolveLoading]);
  const handleEditar = (presupuesto: PresupuestoElement) => {
    setPresupuestoSeleccionado(presupuesto);
    setIsOpen(true);
  };
  const handleGuardar = async (data: PresupuestoFormData) => {
    if (!presupuestoSeleccionado || !presupuestoSeleccionado.id) return;
    try {
      const payload = {
        ...data,
        cliente_id: data.cliente_id ?? undefined,
      };
      await putPresupuesto(presupuestoSeleccionado.id, payload);
      setIsOpen(false);
      setRefresh((r) => r + 1);
    } catch (_error) {
      toast.error("Error al actualizar el presupuesto");
    }
  };
  return {
    presupuestos,
    filtro,
    setFiltro,
    loading,
    totalRegistros,
    isOpen,
    setIsOpen,
    presupuestoSeleccionado,
    handleEditar,
    handleGuardar,
  };
};
