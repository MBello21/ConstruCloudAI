import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { MetricCardProps } from "../../types";

const MetricCard: React.FC<MetricCardProps> = ({
  titulo,
  valor,
  subtitulo,
  variacion,
  destacado,
}) => {
  const borderClass = destacado
    ? "border-yellow-400 border-2"
    : "border-gray-200 border";

  const mostrarVariacion =
    variacion !== undefined && variacion !== 0;
  const esPositiva = variacion && variacion > 0;

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${borderClass}`}>
      <p className="text-sm text-gray-500">{titulo}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{valor}</p>
      {mostrarVariacion && (
        <div
          className={`flex items-center gap-1 text-xs font-semibold mt-1 ${
            esPositiva ? "text-green-600" : "text-red-500"
          }`}
        >
          {esPositiva ? (
            <ArrowUp className="w-3 h-3" />
          ) : (
            <ArrowDown className="w-3 h-3" />
          )}
          {esPositiva ? "+" : ""}{variacion}%
        </div>
      )}
      <p className="text-xs text-gray-400 mt-3">{subtitulo}</p>
    </div>
  );
};

export default MetricCard;
