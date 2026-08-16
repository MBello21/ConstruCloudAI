import React from "react";
import { Mail, Phone, MapPin, Calendar, FileText } from "lucide-react";
import type { Cliente } from "../cliente.types";
import { clienteDesde } from "../../../shared/helpers";
import type { EditingField, EditValues } from "../../../shared/types";
import EditableField from "../../../shared/components/EditableField";

interface ContactoClienteProps {
  cliente: Cliente | undefined;
  editingFields: EditingField;
  editValues: EditValues;
  toggleEditField: (
    fieldKey: string,
    initialValue?: string | number | undefined,
  ) => void;
  handleFieldChange: (fieldKey: string, value: string | number) => void;
  handleFieldBlur: (fieldKey: string, campo: string) => Promise<void> | void;
}

const ContactoCliente: React.FC<ContactoClienteProps> = ({
  cliente,
  editingFields,
  editValues,
  handleFieldBlur,
  handleFieldChange,
  toggleEditField,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Datos de contacto
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
          <div className="flex-1">
            <EditableField
              label="CIF/NIF"
              value={editValues["cif"] ?? cliente?.cif ?? ""}
              displayValue={cliente?.id ? cliente?.cif?.toString().padStart(8, "0") : "-"}
              type="text"
              isEditing={editingFields["cif"]}
              onToggle={() => toggleEditField("cif", cliente?.cif ?? "")}
              onChange={(value) => handleFieldChange("cif", value)}
              onBlur={() => handleFieldBlur("cif", "cif")}
            />
          </div>
        </div>

        {cliente?.email && (
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
            <div className="flex-1">
              <EditableField
                label="Email"
                value={editValues["email"] ?? cliente?.email ?? ""}
                displayValue={cliente.email}
                type="text"
                isEditing={editingFields["email"]}
                onToggle={() =>
                  toggleEditField("email", cliente?.email ?? "")
                }
                onChange={(value) => handleFieldChange("email", value)}
                onBlur={() => handleFieldBlur("email", "email")}
              />
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
          <div className="flex-1">
            <EditableField
              label="Teléfono"
              value={editValues["telefono"] ?? cliente?.telefono ?? ""}
              displayValue={cliente?.telefono}
              type="text"
              isEditing={editingFields["telefono"]}
              onToggle={() =>
                toggleEditField("telefono", cliente?.telefono ?? "")
              }
              onChange={(value) => handleFieldChange("telefono", value)}
              onBlur={() => handleFieldBlur("telefono", "telefono")}
            />
          </div>
        </div>

        {cliente?.direccion && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
            <div className="flex-1 space-y-3">
              <EditableField
                label="Dirección"
                value={editValues["direccion"] ?? cliente?.direccion ?? ""}
                displayValue={cliente?.direccion}
                type="text"
                isEditing={editingFields["direccion"]}
                onToggle={() =>
                  toggleEditField("direccion", cliente?.direccion ?? "")
                }
                onChange={(value) => handleFieldChange("direccion", value)}
                onBlur={() => handleFieldBlur("direccion", "direccion")}
              />
              <EditableField
                label="Población"
                value={editValues["poblacion"] ?? cliente?.poblacion ?? ""}
                displayValue={cliente?.poblacion}
                type="text"
                isEditing={editingFields["poblacion"]}
                onToggle={() =>
                  toggleEditField("poblacion", cliente?.poblacion ?? "")
                }
                onChange={(value) => handleFieldChange("poblacion", value)}
                onBlur={() => handleFieldBlur("poblacion", "poblacion")}
              />
            </div>
          </div>
        )}

        <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
          <Calendar className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Cliente desde</p>
            <p className="text-sm text-gray-900 font-medium">{clienteDesde}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoCliente;
