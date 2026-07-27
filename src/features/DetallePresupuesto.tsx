import { useEffect, useState } from "react";
import CabeceraDetalle from "../components/presupuestos/CabeceraDetalle";
import InfoGeneral from "../components/presupuestos/InfoGeneral";
import SeccionCapitulosDetalle from "../components/presupuestos/SeccionCapitulosDetalle";
import ResumenEconomico from "../components/presupuestos/ResumenEconomico";
import type { PresupuestoDetalle, Capitulo } from "../types";
import { getPresupuestosByID } from "../services/actions/get-presupuest.by-id.action";
import { useNavigate, useParams } from "react-router";

export const DetallePresupuesto = () => {
  const { id } = useParams();
  const [presupuesto, setPresupuesto] = useState<PresupuestoDetalle | null>(
    null,
  );

  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPresupuestosByID(Number(id));
      setPresupuesto(data);
      setCapitulos(data.capitulos || []);
    };
    fetchData();
  }, [id]);

  const handleVolver = () => {
    navigate(-1);
  };

  const handleEliminar = () => {
    if (!presupuesto) return;
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar este presupuesto? Esta acción no se puede deshacer.",
      )
    ) {
      console.log("Eliminar presupuesto:", presupuesto.id);
    }
  };

  const handleExportar = () => {
    // TODO: Implementar exportación a PDF
    if (!presupuesto) return;
    console.log("Exportar presupuesto:", presupuesto.id);
  };

  const handleActualizarPresupuesto = (
    campo: string,
    valor: string | number,
  ) => {
    if (!presupuesto) return;
    setPresupuesto({
      ...presupuesto,
      [campo]: valor,
    });
    // TODO: Implementar API call para actualizar
  };

  const handleAgregarCapitulo = () => {
    const nuevoCapitulo: Capitulo = {
      id: Date.now(),
      numero: capitulos.length + 1,
      nombre: `Capítulo ${capitulos.length + 1}`,
      abierto: true,
      detalles: [],
    };
    setCapitulos((prev) => [...prev, nuevoCapitulo]);
    // TODO: Implementar API call
  };

  const handleEliminarCapitulo = (id: number | string) => {
    if (confirm("¿Deseas eliminar este capítulo?")) {
      setCapitulos((prev) => prev.filter((c) => c.id !== id));
      // TODO: Implementar API call
    }
  };

  const handleToggleCapitulo = (id: number | string) => {
    setCapitulos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, abierto: !c.abierto } : c)),
    );
  };

  const handleActualizarNombreCapitulo = (
    id: number | string,
    nombre: string,
  ) => {
    setCapitulos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, nombre } : c)),
    );
  };

  const handleAgregarDetalle = (capituloId: number | string) => {
    setCapitulos((prev) =>
      prev.map((c) => {
        if (c.id === capituloId) {
          return {
            ...c,
            detalles: [
              ...c.detalles,
              {
                id: Date.now(),
                numero: c.detalles.length + 1,
                descripcion: "Nueva línea",
                cantidad: 1,
                unidad: "ud",
                precio_unitario: 0,
                subtotal: 0,
              },
            ],
          };
        }
        return c;
      }),
    );
    // TODO: Implementar API call
  };

  const handleEliminarDetalle = (
    capituloId: number | string,
    detalleId: number | string,
  ) => {
    if (confirm("¿Deseas eliminar esta línea?")) {
      setCapitulos((prev) =>
        prev.map((c) => {
          if (c.id === capituloId) {
            return {
              ...c,
              detalles: c.detalles.filter((d) => d.id !== detalleId),
            };
          }
          return c;
        }),
      );
      // TODO: Implementar API call
    }
  };

  const handleActualizarDetalle = (
    capituloId: number | string,
    detalleId: number | string,
    campo: string,
    valor: string | number,
  ) => {
    setCapitulos((prev) =>
      prev.map((c) => {
        if (c.id === capituloId) {
          return {
            ...c,
            detalles: c.detalles.map((d) => {
              if (d.id === detalleId) {
                const updated = { ...d, [campo]: valor };
                if (campo === "cantidad" || campo === "precio_unitario") {
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

  if (!presupuesto) return <div>Cargando...</div>;

  return (
    <section className="min-h-screen bg-gray-100 ">
      <CabeceraDetalle
        presupuesto={presupuesto}
        onVolver={handleVolver}
        onEliminar={handleEliminar}
        onExportar={handleExportar}
      />
      <div className="max-w-4xl mx-auto">
        <InfoGeneral
          presupuesto={presupuesto}
          onActualizar={handleActualizarPresupuesto}
        />

        <SeccionCapitulosDetalle
          capitulos={capitulos}
          onAgregarCapitulo={handleAgregarCapitulo}
          onEliminarCapitulo={handleEliminarCapitulo}
          onToggleCapitulo={handleToggleCapitulo}
          onActualizarNombreCapitulo={handleActualizarNombreCapitulo}
          onAgregarDetalle={handleAgregarDetalle}
          onEliminarDetalle={handleEliminarDetalle}
          onActualizarDetalle={handleActualizarDetalle}
        />

        <ResumenEconomico
          subtotal={presupuesto.subtotal}
          iva={presupuesto.iva}
        />
      </div>
    </section>
  );
};
