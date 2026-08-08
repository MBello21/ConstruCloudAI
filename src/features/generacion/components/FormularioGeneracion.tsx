import { Sparkles } from "lucide-react";
import type { FormularioGeneracionProps } from "../../../shared/types";

interface FormularioGeneracionExtendedProps extends FormularioGeneracionProps {
  isGenerating?: boolean;
}

const FormularioGeneracion: React.FC<FormularioGeneracionExtendedProps> = ({
  handleChange,
  descripcion,
  handleSubmit,
  isGenerating = false,
}) => {
  return (
    <div className="bg-white border border-slate-300 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-200">
        <div className="flex gap-3 items-center">
          <Sparkles className="w-5 h-5 text-blue-950" />
          <h2 className="text-sm font-semibold text-gray-800">
            Generar con IA
          </h2>
        </div>
        <p className="text-sm text-gray-400 text-right max-w-xs">
          Describe la obra y la IA propone partidas y precios
        </p>
      </div>

      <textarea
        className="w-full min-h-35 px-3 py-2 border border-slate-300 rounded-md bg-white text-sm placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all duration-200 mb-4"
        placeholder="Describe la obra aquí..."
        onChange={handleChange}
        name="descripcion"
        value={descripcion}
        disabled={isGenerating}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-md font-medium text-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          {isGenerating ? "Generando..." : "Generar presupuesto"}
        </button>
      </div>
    </div>
  );
};

export default FormularioGeneracion;
