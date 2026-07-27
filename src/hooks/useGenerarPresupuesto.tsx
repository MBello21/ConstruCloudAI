import { useState } from "react";
import { postPresupuesto } from "../services/actions/post-presupuesto-ia.actions";
import { getPresupuestosByID } from "../services/actions/get-presupuest.by-id.action";
import type { Capitulo, Detalle, PresupuestoDetalle } from "../types";

export const useGenerarPresupuesto = () => {
  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
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
    const nuevoCapitulo: Capitulo = {
      id: crypto.randomUUID(),
      nombre: "Nuevo capítulo",
      abierto: true,
      detalles: [],
    };
    setCapitulos([...capitulos, nuevoCapitulo]);
  };

  const eliminarCapitulo = (id: string | number) => {
    setCapitulos(capitulos.filter((c) => c.id !== id));
  };

  const toggleCapitulo = (id: string | number) => {
    setCapitulos(
      capitulos.map((c) => (c.id === id ? { ...c, abierto: !c.abierto } : c)),
    );
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
    setCapitulos(
      presupuesto.capitulos.map((cap) => ({ ...cap, abierto: true })),
    );
  };

  return {
    capitulos,
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
