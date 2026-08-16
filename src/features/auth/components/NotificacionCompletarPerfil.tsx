import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import type { User } from "../context/AuthContext";

interface NotificacionCompletarPerfilProps {
  user: User | null;
}

export const NotificacionCompletarPerfil = ({
  user,
}: NotificacionCompletarPerfilProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("notificacion_perfil_dismissed");
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  if (!user || !isVisible) {
    return null;
  }

  const isDatosIncompletos = !user.nombre_completo;

  if (!isDatosIncompletos) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("notificacion_perfil_dismissed", "true");
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-amber-900 font-medium">
          Completa los datos de tu empresa
        </p>
        <p className="text-sm text-amber-800 mt-1">
          Para generar presupuestos profesionales, necesitamos información de tu empresa.
        </p>
      </div>
      <button
        onClick={handleClose}
        className="shrink-0 text-amber-600 hover:text-amber-700 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
