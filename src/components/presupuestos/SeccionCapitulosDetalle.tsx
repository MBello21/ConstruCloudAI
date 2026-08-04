import { Plus } from "lucide-react";
import type { Capitulo } from "../../types";
import { useCapitulosDetalle } from "../../hooks/useCapitulosDetalle";
import CapituloItem from "./CapituloItem";

interface SeccionCapitulosDetalleProps {
  capitulos: Capitulo[];
  onAgregarCapitulo: () => void;
  onEliminarCapitulo: (id: number | string) => void;
  onActualizarNombreCapitulo: (id: number | string, nombre: string) => void;
  onAgregarDetalle: (capituloId: number | string) => void;
  onEliminarDetalle: (
    capituloId: number | string,
    detalleId: number | string,
  ) => void;
  onActualizarDetalle: (
    capituloId: number | string,
    detalleId: number | string,
    campo: string,
    valor: string | number,
  ) => void;
}

const SeccionCapitulosDetalle: React.FC<SeccionCapitulosDetalleProps> = ({
  capitulos,
  onAgregarCapitulo,
  onEliminarCapitulo,
  onActualizarNombreCapitulo,
  onAgregarDetalle,
  onEliminarDetalle,
  onActualizarDetalle,
}) => {
  const {
    expandedCapitulos,
    editingFields,
    editValues,
    toggleExpanded,
    toggleEditField,
    handleFieldChange,
    handleFieldBlur,
  } = useCapitulosDetalle(
    onActualizarNombreCapitulo,
    onActualizarDetalle,
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Capítulos y Detalles
        </h2>
        <button
          onClick={onAgregarCapitulo}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-md font-medium text-sm hover:bg-blue-900 focus:outline-none transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Añadir capítulo
        </button>
      </div>

      <div className="space-y-4">
        {capitulos.map((capitulo) => (
          <CapituloItem
            key={capitulo.id}
            capitulo={capitulo}
            isExpanded={expandedCapitulos.has(capitulo.id)}
            onToggleExpanded={() => toggleExpanded(capitulo.id)}
            onEliminarCapitulo={onEliminarCapitulo}
            editingFields={editingFields}
            editValues={editValues}
            onToggleEditField={toggleEditField}
            handleFieldChange={handleFieldChange}
            handleFieldBlur={handleFieldBlur}
            onAgregarDetalle={onAgregarDetalle}
            onEliminarDetalle={onEliminarDetalle}
          />
        ))}
      </div>

      {capitulos.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No hay capítulos. Haz clic en "+ Añadir capítulo" para comenzar.
        </div>
      )}
    </div>
  );
};

export default SeccionCapitulosDetalle;
