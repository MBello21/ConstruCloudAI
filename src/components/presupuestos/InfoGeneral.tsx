import React, { useEffect, useMemo, useState } from "react";
import type { Cliente, PresupuestoDetalle } from "../../types";
import { getClientes } from "../../services/actions/clientes/get-clientes.action";

interface InfoGeneralProps {
  presupuesto: PresupuestoDetalle;
  onActualizar: (campo: string, valor: string | number) => void;
}

interface EditingField {
  [key: string]: boolean;
}

const InfoGeneral: React.FC<InfoGeneralProps> = ({
  presupuesto,
  onActualizar,
}) => {
  const [editingFields, setEditingFields] = useState<EditingField>({});
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    getClientes().then(setClientes);
  }, []);
  const clienteNombre = useMemo(() => {
    if (!clientes || !presupuesto) return "Sin cliente";
    const found = clientes.find(
      (c: Cliente) =>
        c.id === (presupuesto.cliente_id || presupuesto.cliente?.cliente_id),
    );
    return found?.nombre_cliente || "Sin cliente";
  }, [clientes, presupuesto]);

  const toggleEdit = (field: string) => {
    setEditingFields((prev) => {
      if (prev[field]) {
        return { ...prev, [field]: false };
      } else {
        if (field === "cliente") {
          setEditValues((prev) => ({
            ...prev,
            [field]: String(presupuesto.cliente?.cliente_id || "Sin cliente"),
          }));
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
            <select
              value={editValues["cliente"] || ""}
              onChange={(e) => {
                handleChange("cliente", e.target.value);
                onActualizar("cliente_id", Number(e.target.value));
                setEditingFields((prev) => ({ ...prev, cliente: false }));
              }}
              onBlur={() =>
                setEditingFields((prev) => ({ ...prev, cliente: false }))
              }
              autoFocus
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-950"
            >
              <option value="">Seleccionar cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre_cliente}
                </option>
              ))}
            </select>
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
