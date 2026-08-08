import { useState } from "react";
import { useGenerarFormulario } from "./useGenerarFormulario";
import { useCapitulosManager } from "../../capitulos/hooks/useCapitulosManager";
import { guardarPresupuestoGenerado } from "../services/guardar-presupuesto-generado.action";
import type { PresupuestoDetalle } from "../../presupuestos/presupuesto.types";
import type { Capitulo } from "../../capitulos/capitulo.types";
import type { Detalle } from "../../detalles/detalle.types";

type Fase = "formulario" | "revision" | "guardado";

export const useGenerarPresupuesto = () => {
  const { data, handleChange, handleSubmit: handleGenerarIA, isGenerating, error } = useGenerarFormulario();
  const [fase, setFase] = useState<Fase>("formulario");
  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
  const [capitulosAbiertos, setCapitulosAbiertos] = useState<Set<string | number>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  const handleGenerar = async () => {
    const response = await handleGenerarIA();
    console.log("📊 Response from handleGenerarIA:", response);
    if (response) {
      console.log("📊 response.capitulos:", response.capitulos);
      console.log("📊 Type of capitulos:", Array.isArray(response.capitulos) ? "Array" : typeof response.capitulos);
      setCapitulos(response.capitulos);
      setCapitulosAbiertos(new Set(response.capitulos.map((c) => c.id)));
      setFase("revision");
      console.log("✅ Fase changed to 'revision'");
    } else {
      console.log("❌ Response is null or falsy");
    }
  };

  const handleRegenerar = async () => {
    setCapitulos([]);
    setCapitulosAbiertos(new Set());
    setFase("formulario");
    await handleGenerar();
  };

  const handleGuardar = async (): Promise<PresupuestoDetalle | null> => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const presupuesto = await guardarPresupuestoGenerado({
        titulo: data.titulo,
        descripcion: data.descripcion,
        cliente_id: data.cliente_id,
        capitulos,
      });
      setFase("guardado");
      return presupuesto;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setSaveError(errorMessage);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    fase,
    capitulos,
    capitulosAbiertos,
    data,
    handleChange,
    handleGenerar,
    handleRegenerar,
    handleGuardar,
    agregarCapitulo: handleAgregarCapitulo,
    eliminarCapitulo: handleEliminarCapitulo,
    toggleCapitulo,
    actualizarNombreCapitulo: handleActualizarNombreCapitulo,
    agregarDetalle: handleAgregarDetalle,
    eliminarDetalle: handleEliminarDetalle,
    actualizarDetalle,
    isGenerating,
    isSaving,
    error,
    saveError,
  };
};
