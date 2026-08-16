import { useState, useEffect } from "react";
import { getEmpresa } from "../services/get-empresa.action";
import { putEmpresa } from "../services/put-empresa.action";
import type { Empresa, EmpresaUpdate } from "../types/empresa.types";

interface FormData {
  razon_social: string;
  documento: string;
  direccion_fiscal: string;
  telefono: string;
  email: string;
  web: string;
}

export const useEmpresaSection = () => {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [formData, setFormData] = useState<FormData>({
    razon_social: "",
    documento: "",
    direccion_fiscal: "",
    telefono: "",
    email: "",
    web: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadEmpresa = async () => {
      try {
        const data = await getEmpresa();
        setEmpresa(data);
        setFormData({
          razon_social: data.razon_social || "",
          documento: data.documento || "",
          direccion_fiscal: data.direccion_fiscal || "",
          telefono: data.telefono || "",
          email: data.email || "",
          web: data.web || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar los datos");
      } finally {
        setIsLoading(false);
      }
    };

    loadEmpresa();
  }, []);

  const isDirty = empresa && (
    formData.razon_social !== (empresa.razon_social || "") ||
    formData.documento !== (empresa.documento || "") ||
    formData.direccion_fiscal !== (empresa.direccion_fiscal || "") ||
    formData.telefono !== (empresa.telefono || "") ||
    formData.email !== (empresa.email || "") ||
    formData.web !== (empresa.web || "")
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDirty) return;

    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const updateData: EmpresaUpdate = {
        razon_social: formData.razon_social || undefined,
        documento: formData.documento || undefined,
        direccion_fiscal: formData.direccion_fiscal || undefined,
        telefono: formData.telefono || undefined,
        email: formData.email || undefined,
        web: formData.web || undefined,
      };

      const updatedEmpresa = await putEmpresa(updateData);
      setEmpresa(updatedEmpresa);
      setFormData({
        razon_social: updatedEmpresa.razon_social || "",
        documento: updatedEmpresa.documento || "",
        direccion_fiscal: updatedEmpresa.direccion_fiscal || "",
        telefono: updatedEmpresa.telefono || "",
        email: updatedEmpresa.email || "",
        web: updatedEmpresa.web || "",
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar datos");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    formData,
    isLoading,
    isSaving,
    error,
    success,
    isDirty,
    handleChange,
    handleSubmit,
  };
};
