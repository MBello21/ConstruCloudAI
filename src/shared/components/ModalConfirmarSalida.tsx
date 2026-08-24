import { AlertTriangle } from "lucide-react";
import type { Blocker } from "react-router";

interface ModalConfirmarSalidaProps {
  blocker: Blocker;
}

export const ModalConfirmarSalida = ({
  blocker,
}: ModalConfirmarSalidaProps) => {
  if (blocker.state !== "blocked") return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Cambios sin guardar
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Si sales ahora perderás los cambios realizados. ¿Deseas continuar?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => blocker.reset()}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Quedarse
          </button>
          <button
            onClick={() => blocker.proceed()}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Salir sin guardar
          </button>
        </div>
      </div>
    </div>
  );
};
