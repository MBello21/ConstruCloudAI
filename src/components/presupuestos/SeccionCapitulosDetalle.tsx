import React, { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { formatearPrecio } from "../../helpers";
import type { Capitulo } from "../../types";

interface SeccionCapitulosDetalleProps {
  capitulos: Capitulo[];
  onAgregarCapitulo: () => void;
  onEliminarCapitulo: (id: number | string) => void;
  onToggleCapitulo: (id: number | string) => void;
  onActualizarNombreCapitulo: (id: number | string, nombre: string) => void;
  onAgregarDetalle: (capituloId: number | string) => void;
  onEliminarDetalle: (
    capituloId: number | string,
    detalleId: number | string
  ) => void;
  onActualizarDetalle: (
    capituloId: number | string,
    detalleId: number | string,
    campo: string,
    valor: string | number
  ) => void;
}

const SeccionCapitulosDetalle: React.FC<SeccionCapitulosDetalleProps> = ({
  capitulos,
  onAgregarCapitulo,
  onEliminarCapitulo,
  onToggleCapitulo,
  onActualizarNombreCapitulo,
  onAgregarDetalle,
  onEliminarDetalle,
  onActualizarDetalle,
}) => {
  const [expandedCapitulos, setExpandedCapitulos] = useState<Set<number | string>>(
    new Set()
  );
  const [editingFields, setEditingFields] = useState<{ [key: string]: boolean }>({});
  const [editValues, setEditValues] = useState<{ [key: string]: string | number }>({});

  const toggleExpanded = (id: number | string) => {
    const newExpanded = new Set(expandedCapitulos);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCapitulos(newExpanded);
    onToggleCapitulo(id);
  };

  const toggleEditField = (fieldKey: string, initialValue?: string | number) => {
    setEditingFields((prev) => {
      const newState = { ...prev, [fieldKey]: !prev[fieldKey] };
      if (newState[fieldKey] && initialValue !== undefined) {
        setEditValues((prev) => ({ ...prev, [fieldKey]: initialValue }));
      }
      return newState;
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
        const parsedValue = campo === "descripcion" || campo === "unidad"
          ? value
          : parseFloat(String(value));
        onActualizarDetalle(capituloId, detalleId, campo, parsedValue);
      } else {
        onActualizarNombreCapitulo(capituloId, String(value));
      }
    }
    toggleEditField(fieldKey);
  };

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
          <div key={capitulo.id} className="border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div
                className="flex items-center gap-3 flex-1"
                onClick={() => toggleExpanded(capitulo.id)}
              >
                {expandedCapitulos.has(capitulo.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
                {editingFields[`capitulo-${capitulo.id}`] ? (
                  <input
                    type="text"
                    value={editValues[`capitulo-${capitulo.id}`] || ""}
                    onChange={(e) =>
                      handleFieldChange(`capitulo-${capitulo.id}`, e.target.value)
                    }
                    onBlur={() =>
                      handleFieldBlur(
                        `capitulo-${capitulo.id}`,
                        capitulo.id,
                        undefined,
                        "nombre"
                      )
                    }
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                    className="font-medium text-gray-900 px-2 py-1 border border-blue-950 rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
                  />
                ) : (
                  <span
                    className="font-medium text-gray-900 cursor-pointer hover:text-blue-950 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEditField(
                        `capitulo-${capitulo.id}`,
                        capitulo.nombre
                      );
                    }}
                  >
                    {capitulo.numero && `${capitulo.numero}. `}
                    {capitulo.nombre}
                  </span>
                )}
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

            {expandedCapitulos.has(capitulo.id) && (
              <div className="p-4">
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
                      {capitulo.detalles.map((detalle) => (
                        <tr
                          key={detalle.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-2 text-gray-900">
                            {editingFields[`detalle-${detalle.id}-desc`] ? (
                              <input
                                type="text"
                                value={editValues[`detalle-${detalle.id}-desc`] || ""}
                                onChange={(e) =>
                                  handleFieldChange(
                                    `detalle-${detalle.id}-desc`,
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  handleFieldBlur(
                                    `detalle-${detalle.id}-desc`,
                                    capitulo.id,
                                    detalle.id,
                                    "descripcion"
                                  )
                                }
                                autoFocus
                                className="w-full px-2 py-1 border border-blue-950 rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
                              />
                            ) : (
                              <span
                                onClick={() =>
                                  toggleEditField(
                                    `detalle-${detalle.id}-desc`,
                                    detalle.descripcion
                                  )
                                }
                                className="cursor-pointer hover:text-blue-950 transition-colors"
                              >
                                {detalle.descripcion}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700">
                            {editingFields[`detalle-${detalle.id}-unit`] ? (
                              <select
                                value={editValues[`detalle-${detalle.id}-unit`] || ""}
                                onChange={(e) =>
                                  handleFieldChange(
                                    `detalle-${detalle.id}-unit`,
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  handleFieldBlur(
                                    `detalle-${detalle.id}-unit`,
                                    capitulo.id,
                                    detalle.id,
                                    "unidad"
                                  )
                                }
                                autoFocus
                                className="px-2 py-1 border border-blue-950 rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
                              >
                                <option>m</option>
                                <option>m2</option>
                                <option>ud</option>
                                <option>m3</option>
                                <option>h</option>
                              </select>
                            ) : (
                              <span
                                onClick={() =>
                                  toggleEditField(
                                    `detalle-${detalle.id}-unit`,
                                    detalle.unidad
                                  )
                                }
                                className="cursor-pointer hover:text-blue-950 transition-colors"
                              >
                                {detalle.unidad}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700">
                            {editingFields[`detalle-${detalle.id}-qty`] ? (
                              <input
                                type="number"
                                value={editValues[`detalle-${detalle.id}-qty`] || ""}
                                onChange={(e) =>
                                  handleFieldChange(
                                    `detalle-${detalle.id}-qty`,
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                onBlur={() =>
                                  handleFieldBlur(
                                    `detalle-${detalle.id}-qty`,
                                    capitulo.id,
                                    detalle.id,
                                    "cantidad"
                                  )
                                }
                                autoFocus
                                className="w-full px-2 py-1 border border-blue-950 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-950"
                              />
                            ) : (
                              <span
                                onClick={() =>
                                  toggleEditField(
                                    `detalle-${detalle.id}-qty`,
                                    detalle.cantidad
                                  )
                                }
                                className="cursor-pointer hover:text-blue-950 transition-colors"
                              >
                                {detalle.cantidad}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-2 text-right text-gray-700">
                            {editingFields[`detalle-${detalle.id}-price`] ? (
                              <input
                                type="number"
                                value={editValues[`detalle-${detalle.id}-price`] || ""}
                                onChange={(e) =>
                                  handleFieldChange(
                                    `detalle-${detalle.id}-price`,
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                onBlur={() =>
                                  handleFieldBlur(
                                    `detalle-${detalle.id}-price`,
                                    capitulo.id,
                                    detalle.id,
                                    "precio_unitario"
                                  )
                                }
                                autoFocus
                                className="w-full px-2 py-1 border border-blue-950 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-950"
                              />
                            ) : (
                              <span
                                onClick={() =>
                                  toggleEditField(
                                    `detalle-${detalle.id}-price`,
                                    detalle.precio_unitario
                                  )
                                }
                                className="cursor-pointer hover:text-blue-950 transition-colors"
                              >
                                {formatearPrecio(detalle.precio_unitario)}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-2 text-right font-medium text-gray-900">
                            {formatearPrecio(detalle.subtotal)}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <button
                              onClick={() =>
                                onEliminarDetalle(capitulo.id, detalle.id)
                              }
                              className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

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
