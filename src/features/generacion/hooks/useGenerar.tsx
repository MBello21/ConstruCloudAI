import { useState, useEffect } from "react";
import { useGenerarFormulario } from "./useGenerarFormulario";
import { useCapitulosManager } from "../../capitulos/hooks/useCapitulosManager";
import { guardarPresupuestoGenerado } from "../services/guardar-presupuesto-generado.action";
import { getClientes } from "../../clientes/services/get-clientes.action";
import type { PresupuestoDetalle } from "../../presupuestos/types/presupuesto.types";
import type { Capitulo } from "../../capitulos/capitulo.types";
import type { Detalle } from "../../detalles/detalle.types";
import type { PresupuestoGenerado } from "../services/post-presupuesto-ia.actions";
import type { Cliente, ClientesResponse } from "../../clientes/cliente.types";

type Fase = "formulario" | "revision" | "guardado";

export const useGenerar = () => {
  const {
    data,
    handleChange,
    handleSubmit: handleGenerarIA,
    isGenerating,
    error,
  } = useGenerarFormulario();
  const [fase, setFase] = useState<Fase>("formulario");
  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
  const [capitulosAbiertos, setCapitulosAbiertos] = useState<
    Set<string | number>
  >(new Set());
  const [presupuestoGenerado, setPresupuestoGenerado] =
    useState<PresupuestoGenerado | null>(null);
  const [clientes, setClientes] = useState<ClientesResponse | null>(null);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [presupuestoGuardadoId, setPresupuestoGuardadoId] = useState<
    string | number | null
  >(null);
  const [modalClienteAbierto, setModalClienteAbierto] = useState(false);

  const {
    handleAgregarCapitulo,
    handleActualizarNombreCapitulo,
    handleAgregarDetalle,
    handleActualizarDetalle,
  } = useCapitulosManager({
    capitulos,
    setCapitulos,
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        console.error("Error cargando clientes:", err);
      }
    };
    fetchClientes();
  }, []);

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
      handleActualizarDetalle(
        capituloId,
        detalleId,
        campo,
        valor as string | number,
      );
    });
  };

  const handleGenerar = async () => {
    const response = await handleGenerarIA();
    console.log("📊 Response from handleGenerarIA:", response);
    if (response) {
      setCapitulos(response.presupuesto.capitulos);
      setCapitulosAbiertos(
        new Set(response.presupuesto.capitulos.map((c:Capitulo) => c.id)),
      );
      setPresupuestoGenerado(response.presupuesto);
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
    if (!presupuestoGenerado) {
      setSaveError("Error interno: presupuesto no generado");
      setIsSaving(false);
      return null;
    }
    if (!clienteId) {
      setSaveError("Debes seleccionar un cliente antes de guardar");
      setIsSaving(false);
      return null;
    }
    try {
      const presupuestoConCliente = {
        ...presupuestoGenerado,
        cliente_id: clienteId,
      };
      const presupuesto = await guardarPresupuestoGenerado({
        presupuesto: presupuestoConCliente,
      });
      setFase("guardado");
      setPresupuestoGuardadoId(presupuesto.id);
      return presupuesto;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setSaveError(errorMessage);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const handleClienteCreado = (clienteNuevo: Cliente) => {
    if (clientes) {
      setClientes([...clientes, clienteNuevo]);
    }
    setClienteId(clienteNuevo.id);
    setModalClienteAbierto(false);
  };
  const handleEliminarCapitulo = (id: number | string) => {
    setCapitulos((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEliminarDetalle = (
    capituloId: number | string,
    detalleId: number | string,
  ) => {
    setCapitulos((prev) =>
      prev.map((c) =>
        c.id === capituloId
          ? { ...c, detalles: c.detalles.filter((d) => d.id !== detalleId) }
          : c,
      ),
    );
  };
  return {
    fase,
    capitulos,
    capitulosAbiertos,
    clientes,
    setClientes,
    clienteId,
    setClienteId,
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
    presupuestoGuardadoId,
    presupuestoGenerado,
    modalClienteAbierto,
    setModalClienteAbierto,
    handleClienteCreado,
  };
};
