import React, { useState, useEffect } from "react";
import MetricCard from "./MetricCard";
import { getMetricas } from "../services/get-metricas.action";
import { formatearPrecio } from "../../../shared/helpers/formato.helpers";
import type { MetricasResponse } from "../../../shared/types";
import { useGlobalLoading } from "../../../shared/hooks/useGlobalLoading";

const MetricasPanel: React.FC = () => {
  const [metricas, setMetricas] = useState<MetricasResponse | null>(null);
  // Keep local loading state for potential internal use
  const [_loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { registerLoading, resolveLoading, isLoading: globalIsLoading } = useGlobalLoading();

  useEffect(() => {
    const cargarMetricas = async () => {
      try {
        setLoading(true);
        registerLoading("metricas");
        const datos = await getMetricas();
        setMetricas(datos);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar métricas",
        );
      } finally {
        setLoading(false);
        resolveLoading("metricas");
      }
    };

    cargarMetricas();
  }, [registerLoading, resolveLoading]);

  if (globalIsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-32 mb-3" />
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !metricas) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error || "No se pudieron cargar las métricas"}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        titulo="Presupuestos activos"
        valor={metricas.total}
        subtitulo="Registros en el sistema"
        variacion={metricas.variacion_total}
      />
      <MetricCard
        titulo="Importe adjudicado"
        valor={formatearPrecio(metricas.importe_total)}
        subtitulo="Valor acumulado"
        variacion={metricas.variacion_importe}
      />
      <MetricCard
        titulo="Tasa de aprobación"
        valor={`${metricas.tasa_aprobacion.toFixed(1)}%`}
        subtitulo="Presupuestos aprobados"
        variacion={metricas.variacion_aprobados}
      />
      <MetricCard
        titulo="Pendientes de revisión"
        valor={metricas.pendientes}
        subtitulo="Requieren atención"
        destacado={true}
      />
    </div>
  );
};

export default MetricasPanel;
