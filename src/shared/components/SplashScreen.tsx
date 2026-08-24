import { HardHat } from "lucide-react";
import { useEffect, useState } from "react";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-linear-to-b from-slate-50 to-slate-100 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Center container */}
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="bg-blue-950 w-16 h-16 flex justify-center items-center rounded-lg shadow-lg">
          <HardHat className="text-white w-10 h-10" />
        </div>

        {/* App name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">ConstruCloud AI</h1>
          <p className="text-sm text-slate-600 mt-2">Gestión de presupuestos de obra</p>
        </div>

        {/* Spinner and loading text */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="w-8 h-8 border-3 border-slate-300 border-t-blue-950 rounded-full animate-spin" />
          <p className="text-sm text-slate-600 font-medium">Cargando...</p>
        </div>

        {/* Skeleton lines */}
        <div className="w-64 flex flex-col gap-3 mt-8">
          <div className="h-2 bg-linear-to-r from-gray-300 via-gray-200 to-transparent rounded animate-pulse" />
          <div className="h-2 bg-linear-to-r from-gray-200 via-gray-300 to-transparent rounded animate-pulse" />
          <div className="h-2 w-3/4 bg-linear-to-r from-gray-300 via-gray-200 to-transparent rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
