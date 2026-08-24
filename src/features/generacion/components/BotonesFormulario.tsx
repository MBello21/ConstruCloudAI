import { useNavigate } from "react-router";

interface BotonesFormularioProps {
  fase: "formulario" | "revision" | "guardado";
  onRegenetar?: () => void;
  onGuardar?: () => void;
  isLoading?: boolean;
}

const BotonesFormulario: React.FC<BotonesFormularioProps> = ({
  fase,
  onRegenetar,
  onGuardar,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  const handleCancelar = () => {
    navigate(-1);
  };

  if (fase === "formulario") {
    return null;
  }

  if (fase === "revision") {
    return (
      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancelar}
          disabled={isLoading}
          className="px-4 py-2 border border-slate-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          onClick={onRegenetar}
          disabled={isLoading}
          className="px-4 py-2 border border-slate-300 rounded-md font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Regenerando..." : "Regenerar"}
        </button>
        <button
          onClick={onGuardar}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-950 text-white rounded-md font-medium text-sm hover:bg-blue-900 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Guardando..." : "Guardar presupuesto"}
        </button>
      </div>
    );
  }

  return null;
};

export default BotonesFormulario;
