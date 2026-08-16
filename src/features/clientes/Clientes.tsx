import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { SectionHeaderSkeleton } from "../../shared/components/skeletons/SectionHeaderSkeleton";
import FiltrosTabla from "../../features/panel/components/FiltrosTabla";
import MetricasClientes from "./components/MetricasClientes";
import TablaClientes from "./components/TablaClientes";
import SkeletonMetricasClientes from "./components/SkeletonMetricasClientes";
import SkeletonTablaClientes from "./components/SkeletonTablaClientes";
import SkeletonFiltrosTabla from "./components/SkeletonFiltrosTabla";
import { FILTROS_ESTADO_CLIENTES } from "../../shared/helpers/filtro.helpers";
import type { Cliente } from "./cliente.types";
import { useGlobalLoading } from "../../shared/hooks/useGlobalLoading";
import { PaginacionTabla } from "../panel/components";
import { getPaginationClientes } from "./services/get-pagination-client.action";
import { toast } from "sonner";
import { deleteCliente } from "./services/delete-cliente.action";

const CLIENTES_MOCK: Cliente[] = [];
const ITEMS_POR_PAGINA = 7;
export const Clientes = () => {
  const { pathname } = useLocation();
  const [filtro, setFiltro] = useState<string>("Todos");
  const [pagina, setPagina] = useState<number>(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [clientes, setClientes] = useState<Cliente[]>(CLIENTES_MOCK);
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

  const refreshClientes = async () => {
    const skip = (pagina - 1) * ITEMS_POR_PAGINA;
    const data = await getPaginationClientes(filtro, skip);
    setClientes(data.clientes);
    setTotalRegistros(data.total);
  };

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
  }, [filtro, pagina, refreshClientes]);
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
