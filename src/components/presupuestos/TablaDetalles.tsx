import type { Detalle } from "../../types";
import FilaDetalle from "./FilaDetalle";

interface TablaDetallesProps {
  detalles: Detalle[];
  capituloId: number | string;
  editingFields: Record<string, boolean>;
  editValues: Record<string, string | number>;
  onToggleEditField: (fieldId: string, valor: string | number) => void;
  handleFieldChange: (fieldId: string, valor: string | number) => void;
  handleFieldBlur: (
    fieldId: string,
    capituloId: number | string,
    detalleId: number | string,
    campo: string,
  ) => void;
  onEliminarDetalle: (capituloId: number | string, detalleId: number | string) => void;
}

const TablaDetalles: React.FC<TablaDetallesProps> = ({
  detalles,
  capituloId,
  editingFields,
  editValues,
  onToggleEditField,
  handleFieldChange,
  handleFieldBlur,
  onEliminarDetalle,
}) => {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-2 font-semibold text-gray-700">
              Descripción
            </th>
            <th className="text-center py-2 px-2 font-semibold text-gray-700 w-16">
              Ud.
            </th>
            <th className="text-center py-2 px-2 font-semibold text-gray-700 w-20">
              Cantidad
            </th>
            <th className="text-right py-2 px-2 font-semibold text-gray-700 w-24">
              Precio ud.
            </th>
            <th className="text-right py-2 px-2 font-semibold text-gray-700 w-24">
              Subtotal
            </th>
            <th className="text-center py-2 px-2 w-10" />
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle) => (
            <FilaDetalle
              key={detalle.id}
              detalle={detalle}
              capituloId={capituloId}
              editingFields={editingFields}
              editValues={editValues}
              onToggleEditField={onToggleEditField}
              handleFieldChange={handleFieldChange}
              handleFieldBlur={handleFieldBlur}
              onEliminarDetalle={onEliminarDetalle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDetalles;
