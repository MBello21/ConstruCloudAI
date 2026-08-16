import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "../components/Button";
import { Plus } from "lucide-react";
import { BOTONES_POR_RUTA } from "../constants/navbar-button-data.constant";
import ModalNuevoCliente from "../../features/clientes/components/ModalNuevoCliente";
import type { Cliente } from "../../features/clientes/cliente.types";
import { useAuth } from "../../features/auth/context/AuthContext";

export const Navbar = () => {
  const { pathname } = useLocation();
  const [modalAbierto, setModalAbierto] = useState(false);
  const boton = BOTONES_POR_RUTA.find((b) => b.path === pathname);
  const { user } = useAuth();

  const handleClienteCreado = (_cliente: Cliente) => {
    setModalAbierto(false);
  };

  return (
    <nav className="h-14 flex justify-between items-center px-6 border-b border-gray-300 bg-white">
      <div className="flex items-center gap-3 border-gray-300 h-full w-full justify-end">
        <div className="flex justify-center items-center gap-3 border-l border-gray-300 w-60 ">
          {boton ? (
            "action" in boton ? (
              <>
                <Button variant="primary" onClick={() => setModalAbierto(true)}>
                  <Plus size={18} />
                  {boton.label}
                </Button>
                <ModalNuevoCliente
                  isOpen={modalAbierto}
                  onClose={() => setModalAbierto(false)}
                  onClienteCreado={handleClienteCreado}
                />
              </>
            ) : (
              <Link to={boton.to}>
                <Button variant="primary">
                  <Plus size={18} />
                  {boton.label}
                </Button>
              </Link>
            )
          ) : (
            <>
              <div className="bg-blue-950 w-10 h-10 flex justify-center items-center rounded-full shadow-sm border-r border-black">
                <h3 className="text-h5 font-semibold text-white">
                  {user?.nombre_completo
                    ? user.nombre_completo
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()
                    : "?"}
                </h3>
              </div>
              <div>
                <h3 className="text-h6 font-semibold text-gray-900">
                  {user?.nombre_completo || "Bienvenido"}
                </h3>
                <p className="text-xs">Panel de Gestión</p>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
