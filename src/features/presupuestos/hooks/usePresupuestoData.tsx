import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import type { PresupuestoDetalle } from "../types/presupuesto.types";
import type { Capitulo } from "../../capitulos/capitulo.types";
import { getPresupuestosByID } from "../services/get-presupuesto-by-id.action";
import { useUnsavedChangesGuard } from "../../../shared/hooks";

export const usePresupuestoData = () => {
  const { id } = useParams();
  const [presupuesto, setPresupuesto] = useState<PresupuestoDetalle | null>(
    null,
  );
  const [presupuestoSnapshot, setPresupuestoSnapshot] =
    useState<PresupuestoDetalle | null>(null);

  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
  const [capitulosSnapshot, setCapitulosSnapshot] = useState<Capitulo[]>([]);

  const isDirty = useMemo(() => {
    if (!presupuestoSnapshot) return false;
    const presChanged =
      JSON.stringify(presupuesto) !== JSON.stringify(presupuestoSnapshot);
    const capChanged =
      JSON.stringify(capitulos) !== JSON.stringify(capitulosSnapshot);
    return presChanged || capChanged;
  }, [presupuesto, capitulos, presupuestoSnapshot, capitulosSnapshot]);

  const blocker = useUnsavedChangesGuard(isDirty);

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
    capitulosSnapshot,
    setCapitulosSnapshot,
    isDirty,
    handleActualizarPresupuesto,
    blocker,
  };
};
