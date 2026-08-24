import { useEffect, useMemo, useState } from "react";
import { getClientes } from "../../clientes/services/get-clientes.action";
import type { Cliente } from "../../clientes/cliente.types";
import type { PresupuestoDetalle } from "../types/presupuesto.types";
import type { EditingField } from "../../../shared/types";

interface ActualizarProps {
  presupuesto: PresupuestoDetalle;
  onActualizar: (campo: string, valor: string | number) => void;
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
}

export const useActualizarPresupuesto = ({
  presupuesto,
  clientes,
  setClientes,
  onActualizar,
}: ActualizarProps) => {
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

  return {
    editingFields,
    setEditingFields,
    editValues,
    setEditValues,
    clienteNombre,
    handleBlur,
    handleChange,
    toggleEdit,
  };
};
