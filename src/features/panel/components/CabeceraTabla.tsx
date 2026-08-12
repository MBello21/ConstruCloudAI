import React from "react";
import type { CabeceraTablaProps } from "../../../shared/types";
import FiltrosTabla from "./FiltrosTabla";
import { FILTROS_ESTADO_PANEL } from "../../../shared/helpers/filtro.helpers";

const CabeceraTabla: React.FC<CabeceraTablaProps> = ({
  totalRegistros,
  filtro,
  setFiltro,
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      <div>
        <h4 className="font-semibold">Presupuestos recientes</h4>
        <p className="text-sm text-gray-500">
          {totalRegistros} ultimos registros · ordenados por fecha
        </p>
      </div>
      <FiltrosTabla
        filtros={FILTROS_ESTADO_PANEL}
        filtro={filtro}
        setFiltro={setFiltro}
      />
    </div>
  );
};

export default CabeceraTabla;
