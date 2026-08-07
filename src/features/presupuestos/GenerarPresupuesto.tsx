import { ChevronLeft } from "lucide-react";
import {
  FormularioGeneracion,
  SeccionCapitulos,
  BotonesFormulario,
} from "./components";
import { useGenerarPresupuesto } from "./hooks/useGenerarPresupuesto";

export const GenerarPresupuesto = () => {
  const {
    capitulos,
    capitulosAbiertos,
    data,
    handleChange,
    handleSubmit,
    agregarCapitulo,
    eliminarCapitulo,
    toggleCapitulo,
    actualizarNombreCapitulo,
    agregarDetalle,
    eliminarDetalle,
    actualizarDetalle,
  } = useGenerarPresupuesto();
  return (
    <section className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <button className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 focus:outline-none">
          <ChevronLeft className="w-4 h-4" />
          Volver a presupuestos
        </button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nuevo presupuesto
          </h1>
          <p className="text-gray-600">Introduce el título y la descripción</p>
        </div>
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
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all duration-200 shadow-sm"
          />
        </div>
        <div className="mb-6">
          <FormularioGeneracion
            handleChange={handleChange}
            descripcion={data.descripcion}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="mb-8">
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

        <BotonesFormulario />
      </div>
    </section>
  );
};
