// hooks/useCapitulosDetalle.ts
import { useState } from "react";

export const useCapitulosDetalle = (
  onActualizarNombreCapitulo: (id: number | string, nombre: string) => void,
  onActualizarDetalle: (
    capituloId: number | string,
    detalleId: number | string,
    campo: string,
    valor: string | number,
  ) => void,
) => {
  const [expandedCapitulos, setExpandedCapitulos] = useState<
    Set<number | string>
  >(new Set());
  const [editingFields, setEditingFields] = useState<Record<string, boolean>>(
    {},
  );
  const [editValues, setEditValues] = useState<Record<string, string | number>>(
    {},
  );

  const toggleExpanded = (id: number | string) => {
    setExpandedCapitulos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleEditField = (
    fieldKey: string,
    initialValue?: string | number,
  ) => {
    setEditingFields((prev) => {
      const isEditing = !prev[fieldKey];
      if (isEditing && initialValue !== undefined) {
        setEditValues((prev) => ({ ...prev, [fieldKey]: initialValue }));
      }
      return { ...prev, [fieldKey]: isEditing };
    });
  };

  const handleFieldChange = (fieldKey: string, value: string | number) => {
    setEditValues((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleFieldBlur = (
    fieldKey: string,
    capituloId: number | string,
    detalleId: number | string | undefined,
    campo: string,
  ) => {
    const value = editValues[fieldKey];
    if (value !== undefined) {
      if (detalleId !== undefined) {
        const parsedValue =
          campo === "descripcion" || campo === "unidad"
            ? value
            : parseFloat(String(value));
        onActualizarDetalle(capituloId, detalleId, campo, parsedValue);
      } else {
        onActualizarNombreCapitulo(capituloId, String(value));
      }
    }
    toggleEditField(fieldKey);
  };

  return {
    expandedCapitulos,
    editingFields,
    editValues,
    toggleExpanded,
    toggleEditField,
    handleFieldChange,
    handleFieldBlur,
  };
};
