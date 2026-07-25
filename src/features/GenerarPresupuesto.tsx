import { ChevronLeft } from "lucide-react";
import {
  FormularioGeneracion,
  SeccionCapitulos,
  BotonesFormulario,
} from "../components/presupuestos";
import { useState } from "react";

interface Detalle {
  id: string;
  descripcion: string;
  unidad: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

interface Capitulo {
  id: string;
  nombre: string;
  abierto: boolean;
  detalles: Detalle[];
}

export const GenerarPresupuesto = () => {
  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
  const agregarCapitulo = () => {
    const nuevoCapitulo: Capitulo = {
      id: crypto.randomUUID(),
      nombre: "Nuevo capítulo",
      abierto: true,
      detalles: [],
    };
    setCapitulos([...capitulos, nuevoCapitulo]);
  };

  const eliminarCapitulo = (id: string) => {
    setCapitulos(capitulos.filter((c) => c.id !== id));
  };

  const toggleCapitulo = (id: string) => {
    setCapitulos(
      capitulos.map((c) => (c.id === id ? { ...c, abierto: !c.abierto } : c)),
    );
  };

  const actualizarNombreCapitulo = (id: string, nombre: string) => {
    setCapitulos(capitulos.map((c) => (c.id === id ? { ...c, nombre } : c)));
  };

  const agregarDetalle = (capituloId: string) => {
    setCapitulos(
      capitulos.map((c) => {
        if (c.id === capituloId) {
          const nuevoDetalle: Detalle = {
            id: crypto.randomUUID(),
            descripcion: "",
            unidad: "ud",
            cantidad: 1,
            precio_unitario: 0,
            subtotal: 0,
          };
          return { ...c, detalles: [...c.detalles, nuevoDetalle] };
        }
        return c;
      }),
    );
  };

  const eliminarDetalle = (capituloId: string, detalleId: string) => {
    setCapitulos(
      capitulos.map((c) => {
        if (c.id === capituloId) {
          return {
            ...c,
            detalles: c.detalles.filter((d) => d.id !== detalleId),
          };
        }
        return c;
      }),
    );
  };

  const actualizarDetalle = (
    capituloId: string,
    detalleId: string,
    cambios: Partial<Detalle>,
  ) => {
    setCapitulos(
      capitulos.map((c) => {
        if (c.id === capituloId) {
          return {
            ...c,
            detalles: c.detalles.map((d) => {
              if (d.id === detalleId) {
                const updated = { ...d, ...cambios };
                if (
                  cambios.cantidad !== undefined ||
                  cambios.precio_unitario !== undefined
                ) {
                  updated.subtotal = updated.cantidad * updated.precio_unitario;
                }
                return updated;
              }
              return d;
            }),
          };
        }
        return c;
      }),
    );
  };

  return (
    <section className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
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
            placeholder="Reforma completa baño principal"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all duration-200 shadow-sm"
          />
        </div>
        <div className="mb-6">
          <FormularioGeneracion />
        </div>
        <div className="mb-8">
          <SeccionCapitulos
            capitulos={capitulos}
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
