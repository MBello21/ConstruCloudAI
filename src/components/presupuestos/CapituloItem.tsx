import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import type { Capitulo } from "../../types";
import CampoEditable from "./CampoEditable";
import TablaDetalles from "./TablaDetalles";

interface CapituloItemProps {
  capitulo: Capitulo;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onEliminarCapitulo: (id: number | string) => void;
  editingFields: Record<string, boolean>;
  editValues: Record<string, string | number>;
  onToggleEditField: (fieldId: string, valor: string | number) => void;
  handleFieldChange: (fieldId: string, valor: string | number) => void;
  handleFieldBlur: (
    fieldId: string,
    capituloId: number | string,
    detalleId: number | string | undefined,
    campo: string,
  ) => void;
  onAgregarDetalle: (capituloId: number | string) => void;
  onEliminarDetalle: (capituloId: number | string, detalleId: number | string) => void;
}

const CapituloItem: React.FC<CapituloItemProps> = ({
  capitulo,
  isExpanded,
  onToggleExpanded,
  onEliminarCapitulo,
  editingFields,
  editValues,
  onToggleEditField,
  handleFieldChange,
  handleFieldBlur,
  onAgregarDetalle,
  onEliminarDetalle,
}) => {
  const nombreFieldId = `capitulo-${capitulo.id}`;
  const isEditingNombre = editingFields[nombreFieldId] ?? false;

  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
        <div
          className="flex items-center gap-3 flex-1"
          onClick={onToggleExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          )}
          <CampoEditable
            tipo="text"
            valor={editValues[nombreFieldId] ?? capitulo.nombre}
            isEditing={isEditingNombre}
            onToggleEdit={() =>
              onToggleEditField(nombreFieldId, capitulo.nombre)
            }
            handleChange={(valor) => handleFieldChange(nombreFieldId, valor)}
            handleBlur={() =>
              handleFieldBlur(nombreFieldId, capitulo.id, undefined, "nombre")
            }
            className="font-medium text-gray-900"
            inputClassName="font-medium text-gray-900 px-2 py-1 w-full border border-blue-950 rounded focus:outline-none focus:ring-2 focus:ring-blue-950 me-1"
          >
            {capitulo.numero && `${capitulo.numero}. `}
            {capitulo.nombre}
          </CampoEditable>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEliminarCapitulo(capitulo.id);
          }}
          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {isExpanded && (
        <div className="p-4">
          <TablaDetalles
            detalles={capitulo.detalles}
            capituloId={capitulo.id}
            editingFields={editingFields}
            editValues={editValues}
            onToggleEditField={onToggleEditField}
            handleFieldChange={handleFieldChange}
            handleFieldBlur={handleFieldBlur}
            onEliminarDetalle={onEliminarDetalle}
          />

          <button
            onClick={() => onAgregarDetalle(capitulo.id)}
            className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-950 border border-blue-950 rounded-md hover:bg-blue-50 focus:outline-none transition-colors duration-200"
          >
            <Plus className="w-3 h-3" />
            Añadir línea
          </button>
        </div>
      )}
    </div>
  );
};

export default CapituloItem;
