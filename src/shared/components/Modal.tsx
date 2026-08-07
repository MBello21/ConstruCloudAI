import type { Dispatch, SetStateAction } from "react";

interface ModalProps {
  eliminate: string | null;
  setEliminate: Dispatch<
    SetStateAction<{ tipo: string; id: string | number } | null>
  >;
  handleConfirm: () => void;
}
export const Modal = ({
  eliminate,
  setEliminate,
  handleConfirm,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          ¿Eliminar {eliminate}?
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setEliminate(null)}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
