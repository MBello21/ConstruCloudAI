import React from "react";
import { SquareArrowOutUpRight, SquarePen, Trash2 } from "lucide-react";
import BadgeEstado from "../ui/BadgeEstado";
import type { Cliente } from "../../types/cliente.types";
import { formatearPrecio } from "../../helpers";

interface TablaClientesProps {
  clientes: Cliente[];
}

const TablaClientes: React.FC<TablaClientesProps> = ({ clientes }) => {
  if (clientes.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No hay clientes para mostrar</p>
      </div>
    );
  }

  return (
    <table className="w-full border-collapse bg-gray-100">
      <thead>
        <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
          <th className="p-3 font-medium">CLIENTE</th>
          <th className="p-3 font-medium">CONTACTO</th>
          <th className="p-3 font-medium">UBICACIÓN</th>
          <th className="p-3 font-medium">TIPO</th>
          <th className="p-3 font-medium">PRESUPUESTOS</th>
          <th className="p-3 font-medium">VOLUMEN</th>
          <th className="p-3 font-medium">ESTADO</th>
          <th className="p-3 font-medium"></th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr
            key={cliente.id}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white"
          >
            <td className="px-3 py-5 text-sm font-medium text-neutral-800">
              {cliente.nombre_cliente}
            </td>
            <td className="px-3 py-5 text-sm text-neutral-600">
              {cliente.email && (
                <>
                  <p className="font-medium">{cliente.telefono}</p>
                  <p className="text-xs text-gray-500">{cliente.email}</p>
                </>
              )}
              {!cliente.email && <p>{cliente.telefono}</p>}
            </td>
            <td className="px-3 py-5 text-sm text-neutral-600">
              {cliente.poblacion}
              {cliente.direccion && (
                <p className="text-xs text-gray-500">{cliente.direccion}</p>
              )}
            </td>
            <td className="px-3 py-5 text-sm text-neutral-600">Empresa</td>
            <td className="px-3 py-5 text-sm font-medium text-center">
              {cliente.presupuestos?.length || 0}
            </td>
            <td className="px-3 py-5 text-sm font-medium text-neutral-800">
              {formatearPrecio(
                cliente.presupuestos?.reduce((sum, p) => sum + p.total, 0) || 0,
              )}
            </td>
            <td className="px-3 py-5 text-sm">
              <BadgeEstado estado={cliente.estado || "Activo"} />
            </td>
            <td className="px-3 py-5 text-sm">
              <div className="flex gap-2">
                <button className="hover:text-blue-900 transition-colors">
                  <SquareArrowOutUpRight className="h-5 w-5" />
                </button>
                <button className="hover:text-blue-900 transition-colors">
                  <SquarePen className="h-5 w-5" />
                </button>
                <button className="hover:text-red-600 transition-colors">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaClientes;
