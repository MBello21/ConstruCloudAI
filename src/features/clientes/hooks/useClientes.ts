import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import type { Cliente } from "../cliente.types";
import { useGlobalLoading } from "../../../shared/hooks";
import { getPaginationClientes } from "../services/get-pagination-client.action";
import { toast } from "sonner";
import { deleteCliente } from "../services/delete-cliente.action";

const ITEMS_POR_PAGINA = 7;

export const useClientes = () => {
  const { pathname } = useLocation();
  const [filtro, setFiltro] = useState<string>("Todos");
  const [pagina, setPagina] = useState<number>(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoading: globalIsLoading, isInitialLoad } = useGlobalLoading();

  const totalPaginas = Math.ceil(totalRegistros / ITEMS_POR_PAGINA);

  const clientesFiltrados = useMemo(() => {
    if (filtro === "Todos") {
      return clientes;
    }
    return clientes.filter((cliente) => cliente.estado?.trim() === filtro);
  }, [clientes, filtro]);

  const totalClientes = clientes.length;
  const clientesActivos = clientes.filter(
    (c) => c.estado?.trim() !== "Inactivo",
  ).length;
  const presupuestosVinculados = clientes.reduce(
    (sum, c) => sum + (c.presupuestos?.length || 0),
    0,
  );

  const showSkeleton = (globalIsLoading && isInitialLoad) || loading;

  const refreshClientes = useCallback(async () => {
    const skip = (pagina - 1) * ITEMS_POR_PAGINA;
    const data = await getPaginationClientes(filtro, skip);
    setClientes(data.clientes);
    setTotalRegistros(data.total);
  }, [pagina, filtro]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const skip = (pagina - 1) * ITEMS_POR_PAGINA;
        const data = await getPaginationClientes(filtro, skip);
        setClientes(data.clientes);
        setTotalRegistros(data.total);
      } catch (_error) {
        toast.error("No se pudo conectar con el servidor. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pagina, filtro]);
  useEffect(() => {
    const handler = () => refreshClientes();
    window.addEventListener("cliente-creado", handler);
    return () => window.removeEventListener("cliente-creado", handler);
  }, [refreshClientes]);

  const handleCambioPagina = (nuevaPagina: number): void => {
    setPagina(nuevaPagina);
  };

  const handleDelete = async (id: number) => {
    await deleteCliente(id);
    const skip = (pagina - 1) * ITEMS_POR_PAGINA;
    const data = await getPaginationClientes(filtro, skip);
    setClientes(data.clientes);
    setTotalRegistros(data.total);
  };
  return {
    pathname,
    pagina,
    filtro,
    setFiltro,
    clientesFiltrados,
    clientesActivos,
    presupuestosVinculados,
    totalPaginas,
    totalClientes,
    totalRegistros,
    showSkeleton,
    handleCambioPagina,
    handleDelete,
  };
};
