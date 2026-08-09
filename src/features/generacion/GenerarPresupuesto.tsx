import FormularioGeneracion from "./components/FormularioGeneracion";
import SeccionCapitulos from "./components/SeccionCapitulos";
import BotonesFormulario from "./components/BotonesFormulario";
import { useGenerarPresupuesto } from "./hooks/useGenerarPresupuesto";
import { useNavigate } from "react-router";
import { CabeceraFormulario } from "./components/CabeceraFormulario";
import { useUnsavedChangesGuard } from "../../shared/hooks/useUnsavedChangesGuard";
import { ModalConfirmarSalida } from "../../shared/components/ModalConfirmarSalida";
import { CheckCircle } from "lucide-react";

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
    presupuestoGuardadoId,
    presupuestoGenerado,
  } = useGenerarPresupuesto();
  const navigate = useNavigate();
  const blocker = useUnsavedChangesGuard(fase === "revision");

  const handleVolver = () => {
    navigate(-1);
  };

  const handleGuardarClick = async () => {
    await handleGuardar();
  };

  const handleVerPresupuesto = () => {
    if (presupuestoGuardadoId) {
      navigate(`/presupuestos/${presupuestoGuardadoId}`);
    }
  };

  const handleVolverAlPanel = () => {
    navigate("/panel");
  };

  return (
    <>
      <ModalConfirmarSalida blocker={blocker} />

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
            </>
          )}

          {/* Fase: Guardado */}
          {fase === "guardado" && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Presupuesto guardado con éxito!
              </h2>
              {presupuestoGenerado && (
                <p className="text-sm text-gray-600 mb-8">
                  {presupuestoGenerado.titulo}
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleVolverAlPanel}
                  className="px-6 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Volver al panel
                </button>
                <button
                  onClick={handleVerPresupuesto}
                  className="px-6 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Ver presupuesto
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
