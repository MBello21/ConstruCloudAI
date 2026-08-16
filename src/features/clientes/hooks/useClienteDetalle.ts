import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { Cliente, UpdateClienteRequest } from "../cliente.types";
import { getClienteById } from "../services/get-cliente-by-id.action";
import { putCliente } from "../services/put-cliente.action";
import { deleteCliente } from "../services/delete-cliente.action";
import type { EditingField, EditValues, ConfirmDelete } from "../../../shared/types";
import { toast } from "sonner";

export const useClienteDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clienteId = Number(id);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [editingFields, setEditingFields] = useState<EditingField>({});
  const [editValues, setEditValues] = useState<EditValues>({});
  const [confirmDelete, setConfirmDelete] = useState<ConfirmDelete | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      const data = await getClienteById(clienteId);
      setCliente(data);
    };
    fetchCliente();
  }, [clienteId]);

  const handleVolver = () => {
    navigate(-1);
  };

  const toggleEditField = (
    fieldKey: string,
    initialValue?: string | number,
  ) => {
    setEditingFields((prev) => {
      const isEditing = !prev[fieldKey];
      if (isEditing && initialValue !== undefined) {
        setEditValues((prev) => ({ ...prev, [fieldKey]: initialValue }));
      }
      return { ...prev, [fieldKey]: isEditing };
    });
  };

  const handleFieldChange = (fieldKey: string, value: string | number) => {
    setEditValues((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleFieldBlur = async (fieldKey: string, campo: string) => {
    const value = editValues[fieldKey];
    if (value !== undefined && cliente) {
      try {
        const updateData: Partial<UpdateClienteRequest> = {
          [campo]: value,
        };

        const updatedCliente = await putCliente(
          cliente.id,
          updateData as UpdateClienteRequest,
        );
        setCliente(updatedCliente);
        toggleEditField(fieldKey);
      } catch (_error) {
        toast.error("Error al actualizar cliente");
        toggleEditField(fieldKey);
      }
    } else {
      toggleEditField(fieldKey);
    }
  };

  const handleEliminar = () => {
    if (!cliente?.id) return;
    setConfirmDelete({ tipo: "cliente", id: cliente.id });
  };

  const confirmarDelete = async () => {
    try {
      if (!confirmDelete?.id) return;
      await deleteCliente(Number(confirmDelete.id));
      navigate(-1);
    } catch (_error) {
      toast.error("No se pudo eliminar el cliente");
    }
  };

  const handleGuardarNotas = async (nuevasNotas: string) => {
    if (!cliente?.id) return;
    try {
      const actualizado = await putCliente(cliente.id, { notas: nuevasNotas });
      setCliente(actualizado);
    } catch (_error) {
      // Error al guardar notas
    }
  };

  const presupuestosTotal = cliente?.presupuestos?.length || 0;
  const volumPresupuestado =
    cliente?.presupuestos?.reduce((sum, p) => sum + p.total, 0) || 0;
  const presupuestosAdjudicados =
    cliente?.presupuestos?.filter((p) => p.estado === "Aprobado").length || 0;
  const importeAdjudicado =
    cliente?.presupuestos?.reduce(
      (sum, p) => (p.estado === "Aprobado" ? sum + p.total : sum),
      0,
    ) || 0;

  return {
    cliente,
    editingFields,
    editValues,
    toggleEditField,
    handleFieldChange,
    handleFieldBlur,
    handleVolver,
    confirmDelete,
    handleEliminar,
    confirmarDelete,
    setConfirmDelete,
    handleGuardarNotas,
    presupuestosTotal,
    volumPresupuestado,
    presupuestosAdjudicados,
    importeAdjudicado,
  };
};
