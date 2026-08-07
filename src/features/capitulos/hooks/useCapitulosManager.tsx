import { useState } from "react";
import type { Capitulo } from "../capitulo.types";
import type { DetalleToDelete } from "../../../shared/types";
import { deleteCapitulo } from "../services/delete-capitulo.action";

export interface UseCapitulosManagerProps {
  capitulos: Capitulo[];
  setCapitulos: (capitulos: Capitulo[]) => void;
  presupuestoId?: number;
}

export interface CapitulosManagerActions {
  agregarCapitulo: () => void;
  eliminarCapitulo: (id: string | number) => void;
  toggleCapitulo: (id: string | number) => void;
  actualizarNombreCapitulo: (id: string | number, nombre: string) => void;
  agregarDetalle: (capituloId: string | number) => void;
  eliminarDetalle: (capituloId: string | number, detalleId: string | number) => void;
  actualizarDetalle: (capituloId: string | number, detalleId: string | number, campo: string, valor: string | number) => void;
}

export const useCapitulosManager = ({
  capitulos,
  setCapitulos,
  presupuestoId,
}: UseCapitulosManagerProps) => {
  const [capituloToDelete, setCapituloToDelete] = useState<number | string | null>(null);
  const [detalleToDelete, setDetalleToDelete] = useState<DetalleToDelete | null>(null);

  const handleAgregarCapitulo = () => {
    const nuevoCapitulo: Capitulo = {
      id: Date.now(),
      presupuesto_id: presupuestoId || 0,
      numero: capitulos.length + 1,
      nombre: `Capítulo ${capitulos.length + 1}`,
      orden: capitulos.length + 1,
      detalles: [],
    };
    setCapitulos([...capitulos, nuevoCapitulo]);
  };

  const handleConfirmDeleteCapitulo = async () => {
    if (!capituloToDelete) return;

    try {
      await deleteCapitulo(capituloToDelete);
      setCapitulos(capitulos.filter((c) => c.id !== capituloToDelete));
      setCapituloToDelete(null);
    } catch (error) {
      console.error("Error deleting capitulo:", error);
    }
  };

  const handleConfirmDeleteDetalle = () => {
    if (!detalleToDelete) return;

    const { capituloId, detalleId } = detalleToDelete;
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
    setDetalleToDelete(null);
  };

  const handleEliminarCapitulo = (id: number | string) => {
    setCapituloToDelete(id);
  };

  const handleActualizarNombreCapitulo = (
    id: number | string,
    nombre: string,
  ) => {
    setCapitulos(
      capitulos.map((c) => (c.id === id ? { ...c, nombre } : c)),
    );
  };

  const handleAgregarDetalle = (capituloId: number | string) => {
    setCapitulos(
      capitulos.map((c) => {
        if (c.id === capituloId) {
          return {
            ...c,
            detalles: [
              ...c.detalles,
              {
                id: Date.now(),
                capitulo_id: capituloId as number,
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
  };

  const handleEliminarDetalle = (
    capituloId: number | string,
    detalleId: number | string,
  ) => {
    setDetalleToDelete({ capituloId, detalleId });
  };

  const handleActualizarDetalle = (
    capituloId: number | string,
    detalleId: number | string,
    campo: string,
    valor: string | number,
  ) => {
    setCapitulos(
      capitulos.map((c) => {
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

  return {
    handleAgregarCapitulo,
    handleEliminarCapitulo,
    handleActualizarNombreCapitulo,
    handleAgregarDetalle,
    handleEliminarDetalle,
    handleActualizarDetalle,
    handleConfirmDeleteCapitulo,
    handleConfirmDeleteDetalle,
    capituloToDelete,
    detalleToDelete,
    setCapituloToDelete,
    setDetalleToDelete,
  };
};
