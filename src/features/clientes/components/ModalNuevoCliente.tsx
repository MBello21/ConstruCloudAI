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
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Nuevo Cliente</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
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

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              placeholder="Ej: +34 912 345 678"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
            />
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
              Población
            </label>
            <input
              type="text"
              value={formData.poblacion}
              onChange={(e) => handleInputChange("poblacion", e.target.value)}
              placeholder="Ej: Madrid"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
            />
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
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
