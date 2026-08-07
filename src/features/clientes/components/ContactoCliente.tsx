import React from "react";
import { Mail, Phone, MapPin, Calendar, FileText } from "lucide-react";
import type { Cliente } from "../cliente.types";

interface ContactoClienteProps {
  cliente: Cliente;
}

const ContactoCliente: React.FC<ContactoClienteProps> = ({ cliente }) => {
  const clienteDesde = new Date().getFullYear();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Datos de contacto
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
          <div>
            <p className="text-xs text-gray-500 mb-1">CIF/NIF</p>
            <p className="text-sm text-gray-900 font-medium">
              {cliente.id && `ES${cliente.id.toString().padStart(8, "0")}`}
            </p>
          </div>
        </div>

        {cliente.email && (
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 mb-1">Email</p>
              <p className="text-sm text-gray-900 font-medium">{cliente.email}</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Teléfono</p>
            <p className="text-sm text-gray-900 font-medium">
              {cliente.telefono}
            </p>
          </div>
        </div>

        {cliente.direccion && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 mb-1">Dirección</p>
              <div className="text-sm text-gray-900 font-medium">
                <p>{cliente.direccion}</p>
                <p className="text-gray-600">{cliente.poblacion}</p>
              </div>
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
