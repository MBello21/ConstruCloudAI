import React from "react";
import MetricCard from "../Panel/MetricCard";

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
      <MetricCard
        titulo="Clientes Totales"
        valor={totalClientes}
        subtitulo="En el sistema"
      />
      <MetricCard
        titulo="Clientes Activos"
        valor={clientesActivos}
        subtitulo="Actualmente activos"
        destacado={true}
      />
      <MetricCard
        titulo="Presupuestos Vinculados"
        valor={presupuestosVinculados}
        subtitulo="Asociados a clientes"
      />
    </div>
  );
};

export default MetricasClientes;
