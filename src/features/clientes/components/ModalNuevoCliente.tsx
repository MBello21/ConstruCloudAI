import { X } from "lucide-react";
import type { ModalNuevoClienteProps } from "../../../shared/types";
import { useNuevoCliente } from "../hooks/useNuevoCliente";

const ModalNuevoCliente: React.FC<ModalNuevoClienteProps> = ({
  isOpen,
  onClose,
  onClienteCreado,
}) => {
  const { formData, isLoading, errors, handleInputChange, handleSubmit } =
    useNuevoCliente();

  if (!isOpen) return null;

  const handleSave = async () => {
    await handleSubmit(onClienteCreado, onClose);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-gray-900">Nuevo Cliente</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Nombre del Cliente */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
              Nombre del Cliente *
            </label>
            <input
              type="text"
              value={formData.nombre_cliente}
              onChange={(e) =>
                handleInputChange("nombre_cliente", e.target.value)
              }
              placeholder="Ej: Juan García"
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 ${
                errors.nombre_cliente ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.nombre_cliente && (
              <p className="text-xs text-red-600 mt-1">
                {errors.nombre_cliente}
              </p>
            )}
          </div>

          {/* CIF / NIF | Tipo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                CIF / NIF
              </label>
              <input
                type="text"
                value={formData.cif}
                onChange={(e) => handleInputChange("cif", e.target.value)}
                placeholder="Ej: B-12345678"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                Tipo
              </label>
              <select
                value={formData.tipo}
                onChange={(e) => handleInputChange("tipo", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 bg-white"
              >
                <option value="Empresa">Empresa</option>
                <option value="Particular">Particular</option>
                <option value="Autónomo">Autónomo</option>
              </select>
            </div>
          </div>

          {/* Teléfono * | Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                placeholder="Ej: +34 912 345 678"
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 ${
                  errors.telefono ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.telefono && (
                <p className="text-xs text-red-600 mt-1">{errors.telefono}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Ej: juan@ejemplo.com"
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Dirección | Población * */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                Dirección
              </label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => handleInputChange("direccion", e.target.value)}
                placeholder="Ej: Calle Principal 123"
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                Población *
              </label>
              <input
                type="text"
                value={formData.poblacion}
                onChange={(e) => handleInputChange("poblacion", e.target.value)}
                placeholder="Ej: Madrid"
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 ${
                  errors.poblacion ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.poblacion && (
                <p className="text-xs text-red-600 mt-1">{errors.poblacion}</p>
              )}
            </div>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
              Estado
            </label>
            <select
              value={formData.estado}
              onChange={(e) => handleInputChange("estado", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 bg-white"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Potencial">Potencial</option>
            </select>
          </div>

          {/* Notas */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
              Notas
            </label>
            <textarea
              value={formData.notas}
              onChange={(e) => handleInputChange("notas", e.target.value)}
              placeholder="Observaciones sobre el cliente..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg sticky bottom-0">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-950 text-white rounded-md text-sm font-medium hover:bg-blue-900 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Guardando..." : "Guardar cliente"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNuevoCliente;
