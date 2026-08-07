import type { FiltrosTablaProps } from "../../../shared/types";

const FiltrosTabla: React.FC<FiltrosTablaProps> = ({
  filtros,
  filtro,
  setFiltro,
  handleFiltro,
}) => {
  const onChange = handleFiltro || setFiltro;
  return (
    <div className="flex gap-2">
      {filtros.map((f) => (
        <button
          key={f.label}
          onClick={() => onChange?.(f.value)}
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
