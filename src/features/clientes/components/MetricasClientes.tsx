import React from "react";
import MetricCard from "../../../features/panel/components/MetricCard";

interface MetricasClientesProps {
  totalClientes: number;
  clientesActivos: number;
  presupuestosVinculados: number;
}

const MetricasClientes: React.FC<MetricasClientesProps> = ({
  totalClientes,
  clientesActivos,
  presupuestosVinculados,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard titulo="Clientes Totales" valor={totalClientes} icon="user" />
      <MetricCard
        titulo="Clientes Activos"
        valor={clientesActivos}
        icon="active"
      />
      <MetricCard
        titulo="Presupuestos Vinculados"
        valor={presupuestosVinculados}
        icon="linked"
      />
    </div>
  );
};

export default MetricasClientes;
