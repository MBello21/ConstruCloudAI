import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router";
import { SectionHeader } from "../../shared/components/SectionHeader";
import FiltrosTabla from "../../features/panel/components/FiltrosTabla";
import MetricasClientes from "./components/MetricasClientes";
import TablaClientes from "./components/TablaClientes";
import { FILTROS_ESTADO_CLIENTES } from "../../shared/helpers/filtro.helpers";
import type { Cliente } from "./cliente.types";
import { getClientes } from "./services/get-clientes.action";

// Mock data
const CLIENTES_MOCK: Cliente[] = [];

export const Clientes = () => {
  const { pathname } = useLocation();
  const [filtro, setFiltro] = useState<string>("Todos");
  const [clientes, setClientes] = useState<Cliente[]>(CLIENTES_MOCK);

  const clientesFiltrados = useMemo(() => {
    if (filtro === "Todos") {
      return clientes;
    }
    return clientes.filter((cliente) => cliente.estado?.trim() === filtro);
  }, [clientes, filtro]);

  const totalClientes = clientes.length;
  const clientesActivos = clientes.filter(
    (c) => c.estado?.trim() === "Activo",
  ).length;
  const presupuestosVinculados = clientes.reduce(
    (sum, c) => sum + (c.presupuestos?.length || 0),
    0,
  );
  useEffect(() => {
    const fetchData = async () => {
      const data = await getClientes();
      setClientes(data);
    };
    fetchData();
  }, []);

  return (
    <section className="p-3 px-5 min-h-full bg-gray-100">
      <SectionHeader
        title="GESTIÓN"
        section="Cartera"
        subtitle="Clientes"
        pathname={pathname}
      />

      <div className="mt-6">
        <MetricasClientes
          totalClientes={totalClientes}
          clientesActivos={clientesActivos}
          presupuestosVinculados={presupuestosVinculados}
        />
      </div>

      <div className="mt-5">
        <FiltrosTabla
          filtros={FILTROS_ESTADO_CLIENTES}
          filtro={filtro}
          setFiltro={setFiltro}
        />
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden mt-5 shadow-md">
        <div className="bg-white flex flex-col">
          <TablaClientes clientes={clientesFiltrados} />
        </div>
      </div>
    </section>
  );
};
