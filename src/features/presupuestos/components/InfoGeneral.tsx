import React, { useEffect, useMemo, useState } from "react";
import type { PresupuestoDetalle } from "../presupuesto.types";
import type { Cliente } from "../../../features/clientes/cliente.types";
import type { EditingField } from "../../../shared/types";
import { getClientes } from "../../../features/clientes/services/get-clientes.action";
import ClienteCombobox from "../../../features/clientes/components/ClienteCombobox";

interface InfoGeneralProps {
  presupuesto: PresupuestoDetalle;
  onActualizar: (campo: string, valor: string | number) => void;
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
  setIsModalNuevoCliente: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoGeneral: React.FC<InfoGeneralProps> = ({
  presupuesto,
  onActualizar,
  clientes,
  setClientes,
  setIsModalNuevoCliente,
}) => {
  const [editingFields, setEditingFields] = useState<EditingField>({});
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    getClientes().then(setClientes);
  }, [setClientes]);

  const clienteNombre = useMemo(() => {
    if (!clientes || !presupuesto) return "Sin cliente asignado";
    const found = clientes.find(
      (c: Cliente) =>
        c.id === (presupuesto.cliente_id || presupuesto.cliente?.cliente_id),
    );
    return found?.nombre_cliente || "Sin cliente asignado";
  }, [clientes, presupuesto]);

  const toggleEdit = (field: string) => {
    setEditingFields((prev) => {
      if (prev[field]) {
        return { ...prev, [field]: false };
      } else {
        if (field === "cliente") {
          // No necesita setEditValues, el combobox maneja su propio estado
        } else if (field === "validez") {
          setEditValues((prev) => ({
            ...prev,
            [field]: String(presupuesto.validez_dias || 30),
          }));
        } else if (field === "condiciones") {
          setEditValues((prev) => ({
            ...prev,
            [field]: presupuesto.condiciones_pago || "Contado",
          }));
        } else {
          setEditValues((prev) => ({
            ...prev,
            [field]: String(
              presupuesto[field as keyof PresupuestoDetalle] || "",
            ),
          }));
        }
        return { ...prev, [field]: true };
      }
    });
  };

  const handleBlur = (field: string) => {
    console.log("handleBlur:", field, "value:", editValues[field]);
    const value = editValues[field];
    if (value !== undefined) {
      if (field === "cliente") {
        onActualizar("cliente_id", Number(value));
      } else if (field === "validez") {
        onActualizar("validez_dias", Number(value));
      } else if (field === "condiciones") {
        onActualizar("condiciones_pago", value);
      } else {
        onActualizar(field, field === "iva" ? parseFloat(value) : value);
      }
    }
    toggleEdit(field);
  };

  const handleChange = (field: string, value: string) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Información General
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
            Cliente
          </label>
          {editingFields["cliente"] ? (
            <ClienteCombobox
              clientes={clientes}
              value={
                presupuesto.cliente_id ??
                presupuesto.cliente?.cliente_id ??
                null
              }
              onChange={(clienteId) => {
                if (clienteId !== null) {
                  onActualizar("cliente_id", clienteId);
                  setEditingFields((prev) => ({ ...prev, cliente: false }));
                }
              }}
              onCrearNuevo={() => setIsModalNuevoCliente(true)}
              placeholder="Seleccionar cliente..."
            />
          ) : (
            <p
              onClick={() => toggleEdit("cliente")}
              className="text-gray-900 cursor-pointer hover:text-blue-950 transition-colors"
            >
              {clienteNombre}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
            IVA (%)
          </label>
          {editingFields["iva"] ? (
            <input
              type="number"
              value={editValues["iva"] || ""}
              onChange={(e) => handleChange("iva", e.target.value)}
              onBlur={() => handleBlur("iva")}
              autoFocus
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
            />
          ) : (
            <p
              onClick={() => toggleEdit("iva")}
              className="text-gray-900 cursor-pointer hover:text-blue-950 transition-colors"
            >
              {presupuesto.iva}%
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
            Validez
          </label>
          {editingFields["validez"] ? (
            <input
              type="text"
              value={editValues["validez"] || ""}
              onChange={(e) => handleChange("validez", e.target.value)}
              onBlur={() => handleBlur("validez")}
              autoFocus
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
            />
          ) : (
            <p
              onClick={() => toggleEdit("validez")}
              className="text-gray-900 cursor-pointer hover:text-blue-950 transition-colors"
            >
              {presupuesto.validez_dias ?? "30 días"}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
            Condiciones de Pago
          </label>
          {editingFields["condiciones"] ? (
            <input
              type="text"
              value={editValues["condiciones"] || ""}
              onChange={(e) => handleChange("condiciones", e.target.value)}
              onBlur={() => handleBlur("condiciones")}
              autoFocus
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
            />
          ) : (
            <p
              onClick={() => toggleEdit("condiciones")}
              className="text-gray-900 cursor-pointer hover:text-blue-950 transition-colors"
            >
              {presupuesto.condiciones_pago ?? "Contado"}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
          Descripción
        </label>
        {editingFields["descripcion"] ? (
          <textarea
            value={editValues["descripcion"] || ""}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            onBlur={() => handleBlur("descripcion")}
            autoFocus
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
          />
        ) : (
          <p
            onClick={() => toggleEdit("descripcion")}
            className="text-gray-900 cursor-pointer hover:text-blue-950 transition-colors whitespace-pre-wrap"
          >
            {presupuesto.descripcion || "Sin descripción"}
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoGeneral;
