import { useState } from "react";
import {
  postPresupuesto,
  type PresupuestoIAResponse,
} from "../services/post-presupuesto-ia.actions";

interface FormularioData {
  titulo: string;
  descripcion: string;
  materiales_por_cliente: boolean;
}

export const useGenerarFormulario = () => {
  const [data, setData] = useState<FormularioData>({
    titulo: "",
    descripcion: "",
    materiales_por_cliente: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (): Promise<PresupuestoIAResponse | null> => {
    setIsGenerating(true);
    setError(null);
    try {
      console.log("🔄 Calling postPresupuesto...");
      const response = await postPresupuesto({
        titulo: data.titulo,
        descripcion: data.descripcion,
        materiales_por_cliente: data.materiales_por_cliente,
      });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    isGenerating,
    error,
  };
};
