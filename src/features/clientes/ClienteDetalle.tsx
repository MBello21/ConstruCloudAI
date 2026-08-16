import { ChevronLeft, Trash2 } from "lucide-react";
import BadgeEstado from "../../shared/components/BadgeEstado";
import MetricCard from "../../features/panel/components/MetricCard";
import ResumenPresupuestosCliente from "./components/ResumenPresupuestosCliente";
import ContactoCliente from "./components/ContactoCliente";
import NotasCliente from "./components/NotasCliente";
import { clienteDesde, formatearPrecio } from "../../shared/helpers";
import { useClienteDetalle } from "./hooks/useClienteDetalle";
import { Modal } from "../../shared/components/Modal";

export const ClienteDetalle = () => {
  const {
    cliente,
    handleVolver,
    editingFields,
    editValues,
    toggleEditField,
    handleFieldChange,
    handleFieldBlur,
    confirmDelete,
    handleEliminar,
    confirmarDelete,
    setConfirmDelete,
    handleGuardarNotas,
    presupuestosTotal,
    volumPresupuestado,
    presupuestosAdjudicados,
    importeAdjudicado,
  } = useClienteDetalle();
  return (
    <section className="min-h-screen bg-gray-100">
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <button
            onClick={handleVolver}
            className="inline-flex items-center gap-2 text-md text-neutral-600 hover:text-gray-900 mb-4 focus:outline-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver atrás
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                  ID: {cliente?.id}
                </span>
                <BadgeEstado estado={cliente?.estado || "Activo"} />
                <span className="text-sm text-gray-600">Tipo: Empresa</span>
                <span className="text-sm text-gray-600">
                  Cliente desde {clienteDesde}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEliminar}
                className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            {editingFields["nombre_cliente"] ? (
              <input
                type="text"
                value={
                  editValues["nombre_cliente"] ?? cliente?.nombre_cliente ?? ""
                }
                onChange={(e) =>
                  handleFieldChange("nombre_cliente", e.target.value)
                }
                onBlur={() =>
                  handleFieldBlur("nombre_cliente", "nombre_cliente")
                }
                autoFocus
                className="text-2xl font-bold text-gray-900 border border-blue-950 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-950"
              />
            ) : (
              <h1
                className="text-2xl font-bold text-gray-900 mb-1 cursor-pointer"
                onClick={() =>
                  toggleEditField(
                    "nombre_cliente",
                    cliente?.nombre_cliente ?? "",
                  )
                }
              >
                {cliente?.nombre_cliente || "Sin nombre"}
              </h1>
            )}
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
            presupuestos={cliente?.presupuestos || []}
          />
          <div className="flex flex-col gap-3">
            <ContactoCliente
              cliente={cliente ? cliente : undefined}
              editingFields={editingFields}
              editValues={editValues}
              toggleEditField={toggleEditField}
              handleFieldChange={handleFieldChange}
              handleFieldBlur={handleFieldBlur}
            />
            <NotasCliente
              key={cliente?.notas ?? ""}
              notas={cliente?.notas ?? ""}
              onGuardar={handleGuardarNotas}
            />
          </div>
        </div>
      </div>
      {confirmDelete && (
        <Modal
          eliminate={`a ${cliente?.nombre_cliente ? cliente?.nombre_cliente : null}`}
          setEliminate={setConfirmDelete}
          handleConfirm={confirmarDelete}
        />
      )}
    </section>
  );
};
