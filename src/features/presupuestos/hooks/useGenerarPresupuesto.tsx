import { useState } from "react";
import { postPresupuesto } from "../services/post-presupuesto-ia.actions";
import { getPresupuestosByID } from "../services/get-presupuesto-by-id.action";
import type { PresupuestoDetalle } from "../presupuesto.types"; import type { Capitulo } from "../../capitulos/capitulo.types"; import type { Detalle } from "../../detalles/detalle.types";

export const useGenerarPresupuesto = () => {
  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
  const [capitulosAbiertos, setCapitulosAbiertos] = useState<Set<string | number>>(new Set());
  const [data, setData] = useState({
    titulo: "",
    descripcion: "",
    materiales_por_cliente: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const agregarCapitulo = () => {
    const nuevoId = crypto.randomUUID();
    const nuevoCapitulo: Capitulo = {
      id: nuevoId,
      presupuesto_id: 0,
      numero: capitulos.length + 1,
      nombre: "Nuevo capítulo",
      orden: capitulos.length,
      detalles: [],
    };
    setCapitulos([...capitulos, nuevoCapitulo]);
    setCapitulosAbiertos(new Set([...capitulosAbiertos, nuevoId]));
  };

  const eliminarCapitulo = (id: string | number) => {
    setCapitulos(capitulos.filter((c) => c.id !== id));
  };

  const toggleCapitulo = (id: string | number) => {
    setCapitulosAbiertos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const actualizarNombreCapitulo = (id: string | number, nombre: string) => {
    setCapitulos(capitulos.map((c) => (c.id === id ? { ...c, nombre } : c)));
  };

  const agregarDetalle = (capituloId: string | number) => {
    setCapitulos(
      capitulos.map((c) => {
        if (c.id === capituloId) {
          const nuevoDetalle: Detalle = {
            id: crypto.randomUUID(),
            capitulo_id: 0,
            numero: c.detalles.length + 1,
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

  const eliminarDetalle = (
    capituloId: string | number,
    detalleId: string | number,
  ) => {
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
    capituloId: string | number,
    detalleId: string | number,
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

  const handleSubmit = async () => {
    const response = await postPresupuesto(data);
    const presupuesto: PresupuestoDetalle = await getPresupuestosByID(
      response.presupuesto_id,
    );
    setCapitulos(presupuesto.capitulos);
    setCapitulosAbiertos(new Set(presupuesto.capitulos.map((c) => c.id)));
  };

  return {
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
  };
};
