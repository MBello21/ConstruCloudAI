import { Link } from "react-router";
import { CircleOff, LayoutDashboard, FileText } from "lucide-react";
import { Button } from "../shared/components/Button";

export const NotFound = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-2xl shadow-sm p-12 max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-full p-4">
            <CircleOff className="w-12 h-12 text-gray-700" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-center mb-4">404</h1>

        <h2 className="text-xl font-semibold text-center mb-3">
          Página no encontrada
        </h2>

        <p className="text-gray-500 text-center mb-8">
          La página que buscas no existe o se ha movido.
        </p>

        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Ir al panel
            </Button>
          </Link>
          <Link to="/presupuestos">
            <Button variant="secondary" className="gap-2">
              <FileText className="w-4 h-4" />
              Ver presupuestos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
