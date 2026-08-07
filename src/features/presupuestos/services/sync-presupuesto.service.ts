import type { Capitulo } from "../../capitulos/capitulo.types";
import type { Detalle } from "../../detalles/detalle.types";
import { postCapitulo } from "../../capitulos/services/post-capitulo.action";
import { putCapitulo } from "../../capitulos/services/put-capitulo.action";
import { deleteCapitulo } from "../../capitulos/services/delete-capitulo.action";
import { postDetalle } from "../../detalles/services/post-detalle.action";
import { putDetalle } from "../../detalles/services/put-detalle.action";
import { deleteDetalle } from "../../detalles/services/delete-detalle.action";

export const syncDetalles = async (
  detalles: Detalle[],
  detallesSnapshot: Detalle[],
  capituloId: number | string,
): Promise<void> => {
  const detallesOriginales = new Set(detallesSnapshot.map((d) => d.id));
  const detallesActuales = new Set(detalles.map((d) => d.id));

  // Eliminar detalles (paralelizar)
  const deletePromises = detallesSnapshot
    .filter((det) => !detallesActuales.has(det.id))
    .map((det) => deleteDetalle(det.id));
  await Promise.all(deletePromises);

  // Crear y actualizar detalles (paralelizar)
  const upsertPromises = detalles.map(async (det) => {
    if (!detallesOriginales.has(det.id)) {
      await postDetalle({ ...det, capitulo_id: Number(capituloId) });
    } else {
      const detOriginal = detallesSnapshot.find((d) => d.id === det.id);
      if (JSON.stringify(det) !== JSON.stringify(detOriginal)) {
        await putDetalle(Number(det.id), det);
      }
    }
  });
  await Promise.all(upsertPromises);
};

export const syncCapitulos = async (
  capitulos: Capitulo[],
  capitulosSnapshot: Capitulo[],
  presupuestoId: number | string,
): Promise<void> => {
  const capitulosOriginales = new Set(capitulosSnapshot.map((c) => c.id));
  const capitulosActuales = new Set(capitulos.map((c) => c.id));

  // Eliminar capítulos (paralelizar)
  const deletePromises = capitulosSnapshot
    .filter((cap) => !capitulosActuales.has(cap.id))
    .map((cap) => deleteCapitulo(cap.id));
  await Promise.all(deletePromises);

  // Crear y actualizar capítulos (secuencial por dependencias de detalles)
  for (const cap of capitulos) {
    if (!capitulosOriginales.has(cap.id)) {
      // Nuevo capítulo: crear primero, luego sus detalles
      const created = await postCapitulo({
        presupuesto_id: Number(presupuestoId),
        nombre: cap.nombre,
        numero: cap.numero,
        orden: cap.orden,
      });
      if (cap.detalles.length > 0) {
        await syncDetalles(cap.detalles, [], created.id);
      }
    } else {
      // Capítulo existente: actualizar nombre si cambió
      const original = capitulosSnapshot.find((c) => c.id === cap.id);
      if (original && original.nombre !== cap.nombre) {
        await putCapitulo(cap.id, { nombre: cap.nombre });
      }

      // Sincronizar detalles del capítulo
      if (original) {
        await syncDetalles(cap.detalles, original.detalles, cap.id);
      }
    }
  }
};
