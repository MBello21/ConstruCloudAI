import React from "react";
import type { BadgeEstadoProps } from "../../types";
import { ESTADO_CONFIG } from "../../helpers";

const BadgeEstado: React.FC<BadgeEstadoProps> = ({ estado }) => {
  const config = ESTADO_CONFIG[estado] || ESTADO_CONFIG["Borrador"];

  return (
    <span
      className={`inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full text-xs font-medium w-30 text-center ${config.bg} ${config.text}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {estado}
    </span>
  );
};

export default BadgeEstado;
