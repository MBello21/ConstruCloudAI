import { useEffect, useState } from "react";
import FormularioGeneracion from "./components/FormularioGeneracion";
import SeccionCapitulos from "./components/SeccionCapitulos";
import BotonesFormulario from "./components/BotonesFormulario";
import { useGenerarPresupuesto } from "./hooks/useGenerarPresupuesto";
import { useNavigate } from "react-router";
import { CabeceraFormulario } from "./components/CabeceraFormulario";
import { useUnsavedChangesGuard } from "../../shared/hooks/useUnsavedChangesGuard";
import ClienteCombobox from "../clientes/components/ClienteCombobox";
import ModalNuevoCliente from "../clientes/components/ModalNuevoCliente";
import type { Cliente } from "../clientes/cliente.types";

export const GenerarPresupuesto = () => {
  const {
    fase,
    capitulos,
    capitulosAbiertos,
    data,
    handleChange,
    handleGenerar,
    handleRegenerar,
    handleGuardar,
    agregarCapitulo,
    eliminarCapitulo,
    toggleCapitulo,
    actualizarNombreCapitulo,
    agregarDetalle,
    eliminarDetalle,
    actualizarDetalle,
    isGenerating,
    isSaving,
    error,
    saveError,
    clienteId,
    setClienteId,
    clientes,
  } = useGenerarPresupuesto();
  const navigate = useNavigate();
  const [isModalNuevoClienteOpen, setIsModalNuevoClienteOpen] = useState(false);
  const [clientesActualizados, setClientesActualizados] = useState<Cliente[]>(clientes);
  void useUnsavedChangesGuard(fase === "revision");

  useEffect(() => {
    setClientesActualizados(clientes);
  }, [clientes]);

  const handleVolver = () => {
    navigate(-1);
  };

  const handleGuardarClick = async () => {
    const presupuesto = await handleGuardar();
    if (presupuesto) {
      navigate(`/presupuestos/${presupuesto.id}`);
    }
  };

  const handleClienteCreado = (nuevoCliente: Cliente) => {
    setClientesActualizados((prev) => [...prev, nuevoCliente]);
    setClienteId(nuevoCliente.id);
    setIsModalNuevoClienteOpen(false);
  };

  useEffect(() => {
    if (fase === "guardado" && !isSaving) {
      const timer = setTimeout(() => {
        navigate("/presupuestos");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [fase, isSaving, navigate]);

  return (
    <section className="min-h-screen bg-gray-100">
      <CabeceraFormulario
        onVolver={handleVolver}
        fase={fase}
      />

      <div className="max-w-3xl mx-auto">
        {/* Fase: Formulario */}
        {fase === "formulario" && (
          <>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Título del proyecto
              </label>
              <input
                type="text"
                id="title"
                name="titulo"
                value={data.titulo}
                onChange={handleChange}
                placeholder="Reforma completa baño principal"
                disabled={isGenerating}
                className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all duration-200 shadow-sm disabled:opacity-50"
              />
            </div>
            <div className="mb-6">
              <FormularioGeneracion
                handleChange={handleChange}
                descripcion={data.descripcion}
                handleSubmit={handleGenerar}
                isGenerating={isGenerating}
              />
            </div>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </>
        )}

        {/* Fase: Revisión */}
        {fase === "revision" && (
          <>
            <div className="mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  Revisa y edita el presupuesto generado. Puedes ajustar cualquier valor antes de guardar.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cliente asignado
                </label>
                <ClienteCombobox
                  clientes={clientesActualizados}
                  value={clienteId}
                  onChange={setClienteId}
                  onCrearNuevo={() => setIsModalNuevoClienteOpen(true)}
                  placeholder="Seleccionar cliente..."
                />
              </div>

              <SeccionCapitulos
                capitulos={capitulos}
                capitulosAbiertos={capitulosAbiertos}
                onAgregarCapitulo={agregarCapitulo}
                onEliminarCapitulo={eliminarCapitulo}
                onToggleCapitulo={toggleCapitulo}
                onActualizarNombreCapitulo={actualizarNombreCapitulo}
                onAgregarDetalle={agregarDetalle}
                onEliminarDetalle={eliminarDetalle}
                onActualizarDetalle={actualizarDetalle}
              />
            </div>
            {saveError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{saveError}</p>
              </div>
            )}
            <BotonesFormulario
              fase={fase}
              onRegenetar={handleRegenerar}
              onGuardar={handleGuardarClick}
              isLoading={isSaving}
            />

            <ModalNuevoCliente
              isOpen={isModalNuevoClienteOpen}
              onClose={() => setIsModalNuevoClienteOpen(false)}
              onClienteCreado={handleClienteCreado}
            />
          </>
        )}

        {/* Fase: Guardado */}
        {fase === "guardado" && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Presupuesto guardado
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Tu presupuesto ha sido creado exitosamente.
            </p>
            <p className="text-xs text-gray-500">
              Redirigiendo...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
