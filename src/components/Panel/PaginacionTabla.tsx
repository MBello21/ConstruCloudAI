import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginacionTablaProps } from "../../types";

const PaginacionTabla: React.FC<PaginacionTablaProps> = ({
  pagina,
  totalPaginas,
  onCambioPagina,
}) => {
  const handleAnterior = () => {
    if (pagina > 1) {
      onCambioPagina(pagina - 1);
    }
  };

  const handleSiguiente = () => {
    if (pagina < totalPaginas) {
      onCambioPagina(pagina + 1);
    }
  };
  console.log("pagina:", pagina, "totalPaginas:", totalPaginas);
  return (
    <div className="flex justify-between items-center p-4 bg-white border-t border-gray-300">
      <div className="text-sm text-gray-600">
        Página {pagina} de {totalPaginas}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleAnterior}
          disabled={pagina === 1}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Página anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleSiguiente}
          disabled={pagina >= totalPaginas}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Página siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PaginacionTabla;
