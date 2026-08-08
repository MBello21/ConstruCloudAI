import { useState } from "react";

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return {
    data,
    handleChange,
  };
};
