import { useState } from "react";
import { toast } from "sonner";
import type { Cliente, CreateClienteRequest } from "../cliente.types";
import { postCliente } from "../services/post-cliente.action";

interface FormData {
  nombre_cliente: string;
  telefono: string;
  email: string;
  direccion: string;
  poblacion: string;
  cif: string;
  tipo: string;
  estado: string;
  notas: string;
}

interface UseNuevoClienteReturn {
  formData: FormData;
  isLoading: boolean;
  errors: Record<string, string>;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleSubmit: (onClienteCreado: (cliente: Cliente) => void, onClose: () => void) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: FormData = {
  nombre_cliente: "",
  telefono: "",
  email: "",
  direccion: "",
  poblacion: "",
  cif: "",
  tipo: "Empresa",
  estado: "Activo",
  notas: "",
};

export const useNuevoCliente = (): UseNuevoClienteReturn => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre_cliente.trim()) {
      newErrors.nombre_cliente = "El nombre del cliente es obligatorio";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    }

    if (!formData.poblacion.trim()) {
      newErrors.poblacion = "La población es obligatoria";
    }

    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (
    onClienteCreado: (cliente: Cliente) => void,
    onClose: () => void,
  ) => {
    if (!validateForm()) {
      toast.error("Por favor completa los campos requeridos correctamente");
      return;
    }

    setIsLoading(true);
    try {
      const base = {
        nombre_cliente: formData.nombre_cliente.trim(),
        telefono: formData.telefono.trim(),
        poblacion: formData.poblacion.trim(),
        tipo: formData.tipo,
        estado: formData.estado,
      };

      const finalData = {
        ...base,
        ...(formData.email.trim() && { email: formData.email.trim() }),
        ...(formData.direccion.trim() && { direccion: formData.direccion.trim() }),
        ...(formData.cif.trim() && { cif: formData.cif.trim() }),
        ...(formData.notas.trim() && { notas: formData.notas.trim() }),
      };

      const nuevoCliente = await postCliente(finalData as CreateClienteRequest);
      toast.success("Cliente creado correctamente");
      onClienteCreado(nuevoCliente);
      resetForm();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error al crear cliente",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return {
    formData,
    isLoading,
    errors,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};
