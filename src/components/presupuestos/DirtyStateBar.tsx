import { Button } from "../ui/Button";
import { Loader } from "lucide-react";

interface DirtyStateBarProps {
  isDirty: boolean;
  isSaving: boolean;
  onDescartar: () => void;
  onGuardar: () => void;
}

export const DirtyStateBar = ({
  isDirty,
  isSaving,
  onDescartar,
  onGuardar,
}: DirtyStateBarProps) => {
  if (!isDirty) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">Tienes cambios sin guardar</p>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onDescartar}
            disabled={isSaving}
            className="border-gray-300"
          >
            Descartar cambios
          </Button>
          <Button
            variant="primary"
            onClick={onGuardar}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving && <Loader className="w-4 h-4 animate-spin" />}
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </div>
    </div>
  );
};
