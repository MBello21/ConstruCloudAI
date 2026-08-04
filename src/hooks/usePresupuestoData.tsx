import { useEffect, useMemo, useState } from "react";
import { useParams, useBlocker } from "react-router";
import type { PresupuestoDetalle, Capitulo } from "../types";
import { getPresupuestosByID } from "../services/actions/presupuestos/get-presupuest.by-id.action";

export const usePresupuestoData = () => {
  const { id } = useParams();
  const [presupuesto, setPresupuesto] = useState<PresupuestoDetalle | null>(
    null,
  );
  const [presupuestoSnapshot, setPresupuestoSnapshot] =
    useState<PresupuestoDetalle | null>(null);

  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
  const [capitulosSnapshot, setCapitulosSnapshot] = useState<Capitulo[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{
    tipo: string;
    id: number | string;
  } | null>(null);

  const isDirty = useMemo(() => {
    if (!presupuestoSnapshot) return false;
    const presChanged =
      JSON.stringify(presupuesto) !== JSON.stringify(presupuestoSnapshot);
    const capChanged =
      JSON.stringify(capitulos) !== JSON.stringify(capitulosSnapshot);
    return presChanged || capChanged;
  }, [presupuesto, capitulos, presupuestoSnapshot, capitulosSnapshot]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      if (
        confirm("Tienes cambios sin guardar. ¿Deseas salir sin guardarlos?")
      ) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPresupuestosByID(Number(id));
      setPresupuesto(data);
      setPresupuestoSnapshot(data);
      setCapitulos(data.capitulos || []);
      setCapitulosSnapshot(data.capitulos || []);
    };
    fetchData();
  }, [id]);

  const handleActualizarPresupuesto = (
    campo: string,
    valor: string | number,
  ) => {
    if (!presupuesto) return;
    setPresupuesto({
      ...presupuesto,
      [campo]: valor,
    });
  };

  return {
    presupuesto,
    setPresupuesto,
    presupuestoSnapshot,
    setPresupuestoSnapshot,
    capitulos,
    setCapitulos,
    confirmDelete,
    setConfirmDelete,
    capitulosSnapshot,
    setCapitulosSnapshot,
    isDirty,
    handleActualizarPresupuesto,
  };
};
