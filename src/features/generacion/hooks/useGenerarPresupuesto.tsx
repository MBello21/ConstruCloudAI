import { useState } from "react";
import { useGenerarFormulario } from "./useGenerarFormulario";
import { useCapitulosManager } from "../../capitulos/hooks/useCapitulosManager";
import { postPresupuesto } from "../services/post-presupuesto-ia.actions";
import { getPresupuestosByID } from "../../presupuestos/services/get-presupuesto-by-id.action";
import type { PresupuestoDetalle } from "../../presupuestos/presupuesto.types";
import type { Capitulo } from "../../capitulos/capitulo.types";
import type { Detalle } from "../../detalles/detalle.types";

export const useGenerarPresupuesto = () => {
  const { data, handleChange } = useGenerarFormulario();
  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
  const [capitulosAbiertos, setCapitulosAbiertos] = useState<Set<string | number>>(new Set());

  const {
    handleAgregarCapitulo,
    handleEliminarCapitulo,
    handleActualizarNombreCapitulo,
    handleAgregarDetalle,
    handleEliminarDetalle,
    handleActualizarDetalle,
  } = useCapitulosManager({
    capitulos,
    setCapitulos,
  });

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

  const actualizarDetalle = (
    capituloId: string | number,
    detalleId: string | number,
    cambios: Partial<Detalle>,
  ) => {
    Object.entries(cambios).forEach(([campo, valor]) => {
      handleActualizarDetalle(capituloId, detalleId, campo, valor as string | number);
    });
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
    agregarCapitulo: handleAgregarCapitulo,
    eliminarCapitulo: handleEliminarCapitulo,
    toggleCapitulo,
    actualizarNombreCapitulo: handleActualizarNombreCapitulo,
    agregarDetalle: handleAgregarDetalle,
    eliminarDetalle: handleEliminarDetalle,
    actualizarDetalle,
  };
};
