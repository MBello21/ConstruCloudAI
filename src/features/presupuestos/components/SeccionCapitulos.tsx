import { Plus, ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import type { SeccionCapitulosProps } from "../../../shared/types";
import type { Detalle } from "../../../features/detalles/detalle.types";

const SeccionCapitulos: React.FC<SeccionCapitulosProps> = ({
  capitulos,
  capitulosAbiertos,
  onAgregarCapitulo,
  onEliminarCapitulo,
  onToggleCapitulo,
  onActualizarNombreCapitulo,
  onAgregarDetalle,
  onEliminarDetalle,
  onActualizarDetalle,
}) => {
  const subtotalCapitulo = (detalles: Detalle[]) =>
    detalles.reduce((sum, d) => sum + d.subtotal, 0);

  return (
    <div className="bg-white border border-slate-300 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Capítulos y partidas
        </h2>
        <button
          onClick={onAgregarCapitulo}
          className="inline-flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Añadir capítulo
        </button>
      </div>

      {capitulos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-400 mb-3">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-400">
            Los capítulos aparecerán aquí tras generar o puedes añadirlos
            manualmente
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {capitulos.map((capitulo) => (
            <div
              key={capitulo.id}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              {/* Header del capítulo */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-slate-200 hover:bg-gray-100 transition-colors">
                <button
                  onClick={() => onToggleCapitulo(capitulo.id)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {capitulosAbiertos.has(capitulo.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                <input
                  type="text"
                  value={capitulo.nombre}
                  onChange={(e) =>
                    onActualizarNombreCapitulo(capitulo.id, e.target.value)
                  }
                  className="flex-1 px-2 py-1 bg-transparent border-0 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-950 rounded"
                />

                <span className="text-sm font-medium text-gray-700 ml-auto">
                  Subtotal: {subtotalCapitulo(capitulo.detalles).toFixed(2)} €
                </span>

                <button
                  onClick={() => onEliminarCapitulo(capitulo.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Detalles del capítulo */}
              {capitulosAbiertos.has(capitulo.id) && (
                <div className="p-4">
                  {capitulo.detalles.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <p className="text-sm mb-3">Sin detalles</p>
                      <button
                        onClick={() => onAgregarDetalle(capitulo.id)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-950 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Añadir detalle
                      </button>
                    </div>
                  ) : (
                    <>
                      <table className="w-full mb-4 text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-2 font-medium text-gray-700">
                              Descripción
                            </th>
                            <th className="text-left py-2 px-2 font-medium text-gray-700 w-20">
                              Ud.
                            </th>
                            <th className="text-right py-2 px-2 font-medium text-gray-700 w-24">
                              Cantidad
                            </th>
                            <th className="text-right py-2 px-2 font-medium text-gray-700 w-28">
                              Precio ud.
                            </th>
                            <th className="text-right py-2 px-2 font-medium text-gray-700 w-28">
                              Subtotal
                            </th>
                            <th className="py-2 px-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {capitulo.detalles.map((detalle) => (
                            <tr
                              key={detalle.id}
                              className="border-b border-slate-100 hover:bg-gray-50"
                            >
                              <td className="py-2 px-2">
                                <input
                                  type="text"
                                  value={detalle.descripcion}
                                  onChange={(e) =>
                                    onActualizarDetalle(
                                      capitulo.id,
                                      detalle.id,
                                      {
                                        descripcion: e.target.value,
                                      },
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                                  placeholder="Descripción del detalle"
                                  title={detalle.descripcion}
                                />
                              </td>
                              <td className="py-2 px-2">
                                <select
                                  value={detalle.unidad}
                                  onChange={(e) =>
                                    onActualizarDetalle(
                                      capitulo.id,
                                      detalle.id,
                                      {
                                        unidad: e.target.value,
                                      },
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                                >
                                  <option>m</option>
                                  <option>m2</option>
                                  <option>ud</option>
                                  <option>m3</option>
                                  <option>h</option>
                                </select>
                              </td>
                              <td className="py-2 px-2">
                                <input
                                  type="number"
                                  value={detalle.cantidad}
                                  onChange={(e) =>
                                    onActualizarDetalle(
                                      capitulo.id,
                                      detalle.id,
                                      {
                                        cantidad:
                                          parseFloat(e.target.value) || 0,
                                      },
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                                />
                              </td>
                              <td className="py-2 px-2">
                                <input
                                  type="number"
                                  value={detalle.precio_unitario}
                                  onChange={(e) =>
                                    onActualizarDetalle(
                                      capitulo.id,
                                      detalle.id,
                                      {
                                        precio_unitario:
                                          parseFloat(e.target.value) || 0,
                                      },
                                    )
                                  }
                                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                                />
                              </td>
                              <td className="py-2 px-2 text-right font-medium text-gray-900">
                                {detalle.subtotal.toFixed(2)} €
                              </td>
                              <td className="py-2 px-2">
                                <button
                                  onClick={() =>
                                    onEliminarDetalle(capitulo.id, detalle.id)
                                  }
                                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <button
                        onClick={() => onAgregarDetalle(capitulo.id)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-950 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Añadir detalle
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeccionCapitulos;
