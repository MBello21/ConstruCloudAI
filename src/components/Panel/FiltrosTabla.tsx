import type { FiltrosTablaProps } from "../../types";

const FiltrosTabla: React.FC<FiltrosTablaProps> = ({
  filtros,
  filtro,
  handleFiltro,
}) => {
  return (
    <div className="flex gap-2">
      {filtros.map((f) => (
        <button
          key={f.label}
          onClick={() => handleFiltro(f.value)}
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
  );
};

export default FiltrosTabla;
