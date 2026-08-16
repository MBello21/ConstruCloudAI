import React, { useEffect, useState } from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import BadgeEstado from "../../../shared/components/BadgeEstado";
import type { PresupuestoDetalle } from "../types/presupuesto.types";
import { PresupuestoPDFButton } from "./pdf/PresupuestoPDFButton";
import type { Cliente } from "../../clientes/cliente.types";
import { getClienteById } from "../../clientes/services/get-cliente-by-id.action";
import { getEmpresa } from "../../configuracion/services/get-empresa.action";
import type { Empresa } from "../../configuracion/types/empresa.types";

interface CabeceraDetalleProps {
  presupuesto: PresupuestoDetalle;
  onVolver: () => void;
  onEliminar: (id: number) => void;
  onExportar: () => void;
}

const CabeceraDetalle: React.FC<CabeceraDetalleProps> = ({
  presupuesto,
  onVolver,
  onEliminar,
}) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  useEffect(() => {
    const request = async () => {
      if (!presupuesto.cliente_id) return;
      const data = await getClienteById(presupuesto.cliente_id);
      setCliente(data);
    };
    request();
  }, [presupuesto.cliente_id]);

  useEffect(() => {
    const loadEmpresa = async () => {
      try {
        const data = await getEmpresa();
        setEmpresa(data);
      } catch (_err) {
        // silently fail, empresa data is optional
      }
    };
    loadEmpresa();
  }, []);
  console.log(cliente);
  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto border-b border-gray-200 px-6 py-4 mb-8">
        <button
          onClick={onVolver}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 focus:outline-none"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a presupuestos
        </button>

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                {presupuesto.codigo}
              </span>
              <BadgeEstado estado={presupuesto.estado} />
              <span className="text-sm text-gray-600">
                {presupuesto.created_at
                  ? new Date(presupuesto.created_at).toLocaleDateString("es-ES")
                  : new Date().toLocaleDateString("es-ES")}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {presupuesto.titulo}
            </h1>
          </div>

          <div className="flex gap-2">
            <PresupuestoPDFButton
              presupuesto={presupuesto}
              cliente={cliente ? cliente : undefined}
              empresa={empresa || undefined}
            />
            <button
              onClick={() => onEliminar(presupuesto.id)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-300 rounded-md font-medium text-sm text-red-700 hover:bg-red-100 focus:outline-none transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabeceraDetalle;
