import { useState } from "react";
import {
  postPresupuesto,
  type PresupuestoIAResponse,
} from "../services/post-presupuesto-ia.actions";

interface FormularioData {
  titulo: string;
  descripcion: string;
  cliente_id: number | null
}

export const useGenerarFormulario = () => {
  const [data, setData] = useState<FormularioData>({
    titulo: "",
    descripcion: "",
    cliente_id: null
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
      console.log("📥 Response from postPresupuesto:", response);
      console.log("📥 Full response structure:", JSON.stringify(response, null, 2));
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      console.log("❌ Error in handleSubmit:", errorMessage);
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
