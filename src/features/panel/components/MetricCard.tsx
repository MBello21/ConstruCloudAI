import React from "react";
import {
  MoveUpRight,
  MoveDownRight,
  Users,
  Building2,
  ExternalLink,
} from "lucide-react";
import type { MetricCardProps } from "../../../shared/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  user: <Users className="h-5 w-5" />,
  active: <Building2 className="h-5 w-5" />,
  linked: <ExternalLink className="h-5 w-5" />,
};
const MetricCard: React.FC<MetricCardProps> = ({
  titulo,
  valor,
  subtitulo,
  variacion,
  destacado,
  icon,
}) => {
  const borderClass = destacado
    ? "border-yellow-400 border-2"
    : "border-gray-200 border";

  const mostrarVariacion = variacion !== undefined && variacion !== 0;
  const esPositiva = variacion && variacion > 0;
  const iconComponent = icon ? ICON_MAP[icon] : null;

  return (
    <div
      className={`bg-white rounded-lg py-2 px-4 shadow-sm flex items-center ${iconComponent ? "gap-4" : ""} ${borderClass}`}
    >
      {iconComponent && (
        <div className="bg-gray-300 h-8 w-8 flex items-center justify-center rounded-md">
          {iconComponent}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500">{titulo}</p>
        <div className="flex items-center gap-2">
          <p className="flex items-center text-2xl font-bold text-gray-900">
            {valor}
          </p>
          {mostrarVariacion && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold ${
                esPositiva ? "text-green-600" : "text-red-500"
              }`}
            >
              {esPositiva ? (
                <MoveUpRight className="w-3 h-3" />
              ) : (
                <MoveDownRight className="w-3 h-3" />
              )}
              {esPositiva ? "+" : ""}
              {Math.floor(variacion)}%
            </div>
          )}
        </div>
        <p className={`${subtitulo && "text-xs text-gray-400 mt-3"}`}>
          {subtitulo}
        </p>
      </div>
    </div>
  );
};

export default MetricCard;
