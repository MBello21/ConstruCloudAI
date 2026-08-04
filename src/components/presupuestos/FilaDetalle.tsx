import { Trash2 } from "lucide-react";
import { formatearPrecio } from "../../helpers";
import type { Detalle } from "../../types";
import CampoEditable from "./CampoEditable";

interface FilaDetalleProps {
  detalle: Detalle;
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

const UNIDADES = ["m", "m2", "ud", "m3", "h"];

const FilaDetalle: React.FC<FilaDetalleProps> = ({
  detalle,
  capituloId,
  editingFields,
  editValues,
  onToggleEditField,
  handleFieldChange,
  handleFieldBlur,
  onEliminarDetalle,
}) => {
  const descFieldId = `detalle-${detalle.id}-desc`;
  const unitFieldId = `detalle-${detalle.id}-unit`;
  const qtyFieldId = `detalle-${detalle.id}-qty`;
  const priceFieldId = `detalle-${detalle.id}-price`;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-2 text-gray-900">
        <CampoEditable
          tipo="textarea"
          valor={editValues[descFieldId] ?? detalle.descripcion}
          isEditing={editingFields[descFieldId] ?? false}
          onToggleEdit={() =>
            onToggleEditField(descFieldId, detalle.descripcion)
          }
          handleChange={(valor) => handleFieldChange(descFieldId, valor)}
          handleBlur={() =>
            handleFieldBlur(descFieldId, capituloId, detalle.id, "descripcion")
          }
        >
          {detalle.descripcion}
        </CampoEditable>
      </td>
      <td className="py-3 px-2 text-center text-gray-700">
        <CampoEditable
          tipo="select"
          valor={editValues[unitFieldId] ?? detalle.unidad}
          isEditing={editingFields[unitFieldId] ?? false}
          onToggleEdit={() => onToggleEditField(unitFieldId, detalle.unidad)}
          handleChange={(valor) => handleFieldChange(unitFieldId, valor)}
          handleBlur={() =>
            handleFieldBlur(unitFieldId, capituloId, detalle.id, "unidad")
          }
          opciones={UNIDADES}
          inputClassName="px-2 py-1 border border-blue-950 rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
        >
          {detalle.unidad}
        </CampoEditable>
      </td>
      <td className="py-3 px-2 text-center text-gray-700">
        <CampoEditable
          tipo="number"
          valor={editValues[qtyFieldId] ?? detalle.cantidad}
          isEditing={editingFields[qtyFieldId] ?? false}
          onToggleEdit={() =>
            onToggleEditField(qtyFieldId, detalle.cantidad)
          }
          handleChange={(valor) => handleFieldChange(qtyFieldId, valor)}
          handleBlur={() =>
            handleFieldBlur(qtyFieldId, capituloId, detalle.id, "cantidad")
          }
          inputClassName="w-full px-2 py-1 border border-blue-950 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-950"
        >
          {detalle.cantidad}
        </CampoEditable>
      </td>
      <td className="py-3 px-2 text-right text-gray-700">
        <CampoEditable
          tipo="number"
          valor={editValues[priceFieldId] ?? detalle.precio_unitario}
          isEditing={editingFields[priceFieldId] ?? false}
          onToggleEdit={() =>
            onToggleEditField(priceFieldId, detalle.precio_unitario)
          }
          handleChange={(valor) => handleFieldChange(priceFieldId, valor)}
          handleBlur={() =>
            handleFieldBlur(
              priceFieldId,
              capituloId,
              detalle.id,
              "precio_unitario",
            )
          }
          inputClassName="w-full px-2 py-1 border border-blue-950 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-950"
        >
          {formatearPrecio(detalle.precio_unitario)}
        </CampoEditable>
      </td>
      <td className="py-3 px-2 text-right font-medium text-gray-900">
        {formatearPrecio(detalle.subtotal)}
      </td>
      <td className="py-3 px-2 text-center">
        <button
          onClick={() => onEliminarDetalle(capituloId, detalle.id)}
          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default FilaDetalle;
