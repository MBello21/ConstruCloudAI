import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Edit, Trash2 } from "lucide-react";
import BadgeEstado from "../components/ui/BadgeEstado";
import MetricCard from "../components/Panel/MetricCard";
import ResumenPresupuestosCliente from "../components/clientes/ResumenPresupuestosCliente";
import ContactoCliente from "../components/clientes/ContactoCliente";
import NotasCliente from "../components/clientes/NotasCliente";
import type { Cliente } from "../types/cliente.types";
import { formatearPrecio } from "../helpers";
import { getClienteById } from "../services/actions/clientes/get-cliente-by-id.action";

const CLIENTE_MOCK: Cliente = {
  id: 0,
  nombre_cliente: "",
  poblacion: "",
  telefono: "",
  presupuestos: [],
};

export const ClienteDetalle = () => {
  const { id } = useParams();
  const clienteId = Number(id);
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente>(CLIENTE_MOCK);
  const [notas, setNotas] = useState("");

  const handleVolver = () => {
    navigate(-1);
  };

  const handleEditar = () => {
    console.log("Editar cliente:", cliente.id);
  };

  const handleEliminar = () => {
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.",
      )
    ) {
      console.log("Eliminar cliente:", cliente.id);
    }
  };

  const handleGuardarNotas = (nuevasNotas: string) => {
    setNotas(nuevasNotas);
    console.log("Guardar notas:", nuevasNotas);
  };

  const clienteDesde = new Date().getFullYear();
  const presupuestosTotal = cliente.presupuestos?.length || 0;
  const volumPresupuestado =
    cliente.presupuestos?.reduce((sum, p) => sum + p.total, 0) || 0;
  const presupuestosAdjudicados =
    cliente.presupuestos?.filter((p) => p.estado === "Aprobado").length || 0;
  const importeAdjudicado =
    cliente.presupuestos?.reduce(
      (sum, p) => (p.estado === "Aprobado" ? sum + p.total : sum),
      0,
    ) || 0;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClienteById(clienteId);
      setCliente(data);
    };
    fetchData();
  }, [clienteId]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={handleVolver}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 focus:outline-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver atrás
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Card principal del cliente */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                  ID: {cliente.id}
                </span>
                <BadgeEstado estado={cliente.estado || "Activo"} />
                <span className="text-sm text-gray-600">Tipo: Empresa</span>
                <span className="text-sm text-gray-600">
                  Cliente desde {clienteDesde}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditar}
                className="inline-flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={handleEliminar}
                className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {cliente.nombre_cliente || "Sin nombre"}
            </h1>
            <p className="text-gray-600">{cliente.email || "Sin email"}</p>
          </div>
        </div>

        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricCard
            titulo="Presupuestos asociados"
            valor={presupuestosTotal}
            subtitulo="Total de presupuestos"
          />
          <MetricCard
            titulo="Volumen presupuestado"
            valor={formatearPrecio(volumPresupuestado)}
            subtitulo="Importe total"
          />
          <MetricCard
            titulo="Adjudicados"
            valor={presupuestosAdjudicados}
            subtitulo={`Total: ${formatearPrecio(importeAdjudicado)}`}
            destacado={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ResumenPresupuestosCliente
            presupuestos={cliente.presupuestos || []}
          />
          <div className="flex flex-col gap-3">
            <ContactoCliente cliente={cliente} />
            <NotasCliente notas={notas} onGuardar={handleGuardarNotas} />
          </div>
        </div>

        <div className="mb-8"></div>
      </div>
    </div>
  );
};
