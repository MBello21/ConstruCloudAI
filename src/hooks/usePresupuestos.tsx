import { useEffect, useState } from "react";
import type { PresupuestoElement } from "../types";
import { getPresupuestos } from "../services/actions/presupuestos/get-presupuestos.action";
import { getClientes } from "../services/actions/clientes/get-clientes.action";
import useGlobalReducer from "../context/store-context/useGlobalReducer";
import { toast } from "sonner";
import { putPresupuesto } from "../services/actions/presupuestos/put-presupuesto.action";
import type { PresupuestoFormData } from "../components/presupuestos/ModalEditarPresupuesto";

const ITEMS_POR_PAGINA = 7;
export const usePresupuestos = () => {
  const { dispatch } = useGlobalReducer();
  const [pagina, setPagina] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [presupuestoSeleccionado, setPresupuestoSeleccionado] =
    useState<PresupuestoElement | null>(null);
  const [filtro, setFiltro] = useState<string>("Todos");
  const [presupuestos, setPresupuestos] = useState<PresupuestoElement[]>([]);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const skip = (pagina - 1) * ITEMS_POR_PAGINA;
        const data = await getPresupuestos(filtro, skip);
        const clientes = await getClientes();
        dispatch({ type: "set_clientes", payload: clientes });
        setPresupuestos(data.presupuestos);
        setTotalRegistros(data.total);
      } catch (_error) {
        toast.error("No se pudo conectar con el servidor. Inténtalo de nuevo.");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchData();
  }, [pagina, dispatch, filtro, refresh]);

  const totalPaginas = Math.ceil(totalRegistros / ITEMS_POR_PAGINA);

  const handleCambioPagina = (nuevaPagina: number): void => {
    setPagina(nuevaPagina);
  };
  const handleEditar = (presupuesto: PresupuestoElement) => {
    setPresupuestoSeleccionado(presupuesto);
    setIsOpen(true);
  };
  const handleGuardar = async (data: PresupuestoFormData) => {
    if (!presupuestoSeleccionado || !presupuestoSeleccionado.id) {
      return;
    }
    try {
      const payload = {
        ...data,
        cliente_id: data.cliente_id ?? undefined,
      };

      await putPresupuesto(presupuestoSeleccionado.id, payload);
      setRefresh((r) => r + 1);
    } catch (_error) {
      toast("Error al actualizar el presupuesto");
    }
  };
  const handleFiltro = (nuevoFiltro: string) => {
    setFiltro(nuevoFiltro);
    setPagina(1);
    setTotalRegistros(0);
  };
  return {
    presupuestos,
    presupuestoSeleccionado,
    pagina,
    isOpen,
    setIsOpen,
    totalPaginas,
    filtro,
    handleFiltro,
    loading,
    totalRegistros,
    ITEMS_POR_PAGINA,
    handleCambioPagina,
    handleEditar,
    handleGuardar,
  };
};
