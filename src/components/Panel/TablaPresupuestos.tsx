import React from "react";
import { SquareArrowOutUpRight, SquarePen } from "lucide-react";
import BadgeEstado from "../ui/BadgeEstado";
import type { TablaPresupuestosProps } from "../../types";
import { Link } from "react-router";

const TablaPresupuestos: React.FC<TablaPresupuestosProps> = ({
  presupuestos,
  formatearFecha,
  formatearPrecio,
}) => {
  return (
    <table className="w-full border-collapse bg-gray-100">
      <thead>
        <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
          <th className="p-3 font-medium">CÓDIGO</th>
          <th className="p-3 font-medium">PROYECTO / CLIENTE</th>
          <th className="p-3 font-medium">IMPORTE</th>
          <th className="p-3 font-medium">FECHA</th>
          <th className="p-3 font-medium">ESTADO</th>
          <th className="p-3 font-medium"></th>
        </tr>
      </thead>
      <tbody>
        {presupuestos.map((item) => (
          <tr
            key={item.id}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white"
          >
            <td className="px-3 py-5 text-sm">
              <Link
                className="cursor-pointer text-neutral-800 hover:underline hover:text-blue-900 "
                to={`/presupuesto/${item.id}`}
              >
                {item.codigo}
              </Link>
            </td>
            <td className="px-3 py-5 text-sm">
              <Link
                className="cursor-pointer text-neutral-800 font-semibold  hover:text-blue-900 "
                to={`/presupuesto/${item.id}`}
              >
                {item.titulo}
              </Link>
            </td>
            <td className="px-3 py-5 text-sm font-medium">
              {formatearPrecio(item.total)}
            </td>
            <td className="px-3 py-5 text-sm text-gray-500">
              {formatearFecha(item.created_at)}
            </td>
            <td className="px-3 py-5 text-sm">
              <BadgeEstado estado={item.estado} />
            </td>
            <td className="px-3 py-5 text-sm">
              <div className="flex gap-2">
                <SquareArrowOutUpRight className="h-5 w-5" />
                <SquarePen className="h-5 w-5" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPresupuestos;
