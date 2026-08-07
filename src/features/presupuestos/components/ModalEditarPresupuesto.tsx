import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { PresupuestoFormData } from "../presupuesto.types";

export interface ModalEditarPresupuestoProps {
  isOpen: boolean;
  onClose: () => void;
  onGuardar?: (data: PresupuestoFormData) => Promise<void> | void;
  presupuesto: {
    id: number;
    titulo?: string;
    estado?: string;
    cliente_id?: number | null;
  };
  clientes: { id: number; nombre_cliente: string }[];
}
const ESTADO_OPTIONS = [
  { value: "Todos", label: "Todos" },
  { value: "Borrador", label: "Borrador" },
  { value: "Enviado", label: "Enviado" },
  { value: "En Revisión", label: "En Revisión" },
  { value: "Aprobado", label: "Aprobado" },
  { value: "Rechazado", label: "Rechazado" },
];

const ModalEditarPresupuesto: React.FC<ModalEditarPresupuestoProps> = ({
  isOpen,
  onClose,
  onGuardar,
  presupuesto,
  clientes,
}) => {
  const [titulo, setTitulo] = useState(presupuesto.titulo);
  const [estado, setEstado] = useState(presupuesto.estado);
  const [clienteId, setClienteId] = useState<number | null>(
    presupuesto.cliente_id || null,
  );
  const handleGuardar = async () => {
    if (!onGuardar) return;

    try {
      if (onGuardar) {
        await onGuardar({
          id: presupuesto.id,
          titulo,
          estado,
          cliente_id: clienteId,
        });
      }

      onClose();
    } catch (_error) {
      toast("Error al guardar los cambios");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Editar presupuesto
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Reforma cocina"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {ESTADO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente
            </label>
            <select
              value={clienteId || ""}
              onChange={(e) =>
                setClienteId(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Seleccionar cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre_cliente}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="px-4 py-2 bg-blue-950 text-white rounded-lg font-medium text-sm hover:bg-blue-900 focus:outline-none transition-colors"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarPresupuesto;
