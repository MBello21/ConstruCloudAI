import React from "react";
import type { CabeceraTablaProps } from "../../types";
import { FILTROS_ESTADO } from "../../helpers/filtro.helpers";

const CabeceraTabla: React.FC<CabeceraTablaProps> = ({
  totalRegistros,
  filtro,
  setFiltro,
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      <div>
        <h2 className="font-semibold">Presupuestos recientes</h2>
        <p className="text-sm text-gray-500">
          {totalRegistros} registros · ordenados por fecha
        </p>
      </div>
      <div className="flex gap-2">
        {FILTROS_ESTADO.map((f) => (
          <button
            key={f.label}
            onClick={() => setFiltro(f.value)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              filtro === f.value
                ? "bg-blue-950 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CabeceraTabla;
