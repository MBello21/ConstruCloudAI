import React from "react";
import BadgeEstado from "../../../shared/components/BadgeEstado";
import type { PresupuestoResumen } from "../cliente.types";
import { formatearPrecio } from "../../../shared/helpers";
import { Link } from "react-router";

interface ResumenPresupuestosClienteProps {
  presupuestos: PresupuestoResumen[];
}

const ResumenPresupuestosCliente: React.FC<ResumenPresupuestosClienteProps> = ({
  presupuestos,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Presupuestos</h3>
      <div className="space-y-3">
        {presupuestos.length === 0 ? (
          <p className="text-sm text-gray-500">No hay presupuestos</p>
        ) : (
          presupuestos.map((presupuesto) => (
            <Link key={presupuesto.id} to={`/presupuesto/${presupuesto.id}`}>
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {presupuesto.titulo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeEstado estado={presupuesto.estado} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatearPrecio(presupuesto.total)}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ResumenPresupuestosCliente;
