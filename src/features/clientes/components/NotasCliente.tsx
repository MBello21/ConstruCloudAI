import React, { useState } from "react";
import { Save, X } from "lucide-react";

interface NotasClienteProps {
  notas?: string;
  onGuardar?: (notas: string) => void;
}

const NotasCliente: React.FC<NotasClienteProps> = ({
  notas = "",
  onGuardar,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notasContent, setNotasContent] = useState(notas);

  const handleGuardar = () => {
    if (onGuardar) {
      onGuardar(notasContent);
    }
    setIsEditing(false);
  };

  const handleCancelar = () => {
    setNotasContent(notas);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Notas internas
      </h3>

      {!isEditing ? (
        <>
          {notasContent ? (
            <p className="text-sm text-gray-700 whitespace-pre-wrap mb-4">
              {notasContent}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-4">
              Sin notas añadidas
            </p>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {notasContent ? "Editar notas" : "Añadir notas"}
          </button>
        </>
      ) : (
        <>
          <textarea
            value={notasContent}
            onChange={(e) => setNotasContent(e.target.value)}
            placeholder="Escribe las notas internas del cliente..."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none h-24"
          />
          <div className="flex gap-2">
            <button
              onClick={handleGuardar}
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
            <button
              onClick={handleCancelar}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotasCliente;
