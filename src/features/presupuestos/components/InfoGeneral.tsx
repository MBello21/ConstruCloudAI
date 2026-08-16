import type { Cliente } from "../../../features/clientes/cliente.types";
import ClienteCombobox from "../../../features/clientes/components/ClienteCombobox";
import type { PresupuestoDetalle } from "../types/presupuesto.types";
import { useActualizarPresupuesto } from "../hooks/useActualizarPresupuesto";
import EditableField from "../../../shared/components/EditableField";

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
  const {
    editingFields,
    setEditingFields,
    editValues,
    clienteNombre,
    toggleEdit,
    handleBlur,
    handleChange,
  } = useActualizarPresupuesto({
    presupuesto,
    onActualizar,
    clientes,
    setClientes,
  });

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

        <EditableField
          label="IVA (%)"
          value={editValues["iva"] || presupuesto.iva}
          displayValue={`${presupuesto.iva}%`}
          type="number"
          isEditing={editingFields["iva"]}
          onToggle={() => toggleEdit("iva")}
          onChange={(value) => handleChange("iva", value)}
          onBlur={() => handleBlur("iva")}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <EditableField
          label="Validez"
          value={editValues["validez"] || presupuesto.validez_dias || ""}
          displayValue={String(presupuesto.validez_dias) || "30 días"}
          type="text"
          isEditing={editingFields["validez"]}
          onToggle={() => toggleEdit("validez")}
          onChange={(value) => handleChange("validez", value)}
          onBlur={() => handleBlur("validez")}
        />

        <EditableField
          label="Condiciones de Pago"
          value={
            editValues["condiciones"] || presupuesto.condiciones_pago || ""
          }
          displayValue={presupuesto.condiciones_pago ?? "Contado"}
          type="text"
          isEditing={editingFields["condiciones"]}
          onToggle={() => toggleEdit("condiciones")}
          onChange={(value) => handleChange("condiciones", value)}
          onBlur={() => handleBlur("condiciones")}
        />
      </div>

      <EditableField
        label="Descripción"
        value={editValues["descripcion"] || presupuesto.descripcion || ""}
        displayValue={presupuesto.descripcion || "Sin descripción"}
        type="textarea"
        isEditing={editingFields["descripcion"]}
        onToggle={() => toggleEdit("descripcion")}
        onChange={(value) => handleChange("descripcion", value)}
        onBlur={() => handleBlur("descripcion")}
      />
    </div>
  );
};

export default InfoGeneral;
