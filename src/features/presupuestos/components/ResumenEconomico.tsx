import React from "react";
import { formatearPrecio } from "../../../shared/helpers";

interface ResumenEconomicoProps {
  subtotal: number;
  iva: number;
}

const ResumenEconomico: React.FC<ResumenEconomicoProps> = ({
  subtotal,
  iva,
}) => {
  const ivaAmount = subtotal * (iva / 100);
  const total = subtotal + ivaAmount;

  return (
    <div className="bg-white border border-gray-200 rounded-lg mt-6">
      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase p-6 pb-4">
        Resumen Económico
      </p>

      <div className="flex items-stretch border-t border-gray-200 overflow-hidden rounded-b-lg">
        <div className="flex-1 bg-white p-6 flex flex-col justify-center">
          <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">
            Subtotal
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {formatearPrecio(subtotal)}
          </span>
        </div>
        <div className="flex-1 bg-white border-l border-gray-200 p-6 flex flex-col justify-center">
          <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">
            IVA ({iva}%)
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {formatearPrecio(ivaAmount)}
          </span>
        </div>
        <div className="flex-1 bg-blue-950 text-white p-6 flex flex-col justify-center">
          <span className="text-xs text-blue-300 uppercase tracking-widest mb-2">
            Total
          </span>
          <span className="text-2xl font-bold">{formatearPrecio(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResumenEconomico;
