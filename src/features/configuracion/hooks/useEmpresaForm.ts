import { useState, useEffect } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { actualizarUsuario } from "../services/actualizar-usuario.action";

export interface FormData {
  razon_social: string;
  documento: string;
  direccion_fiscal: string;
  telefono: string;
  email: string;
  web: string;
}

export const useEmpresaForm = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    razon_social: "",
    documento: "",
    direccion_fiscal: "",
    telefono: "",
    email: "",
    web: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        razon_social: user.razon_social || "",
        documento: user.documento || "",
        direccion_fiscal: user.direccion_fiscal || "",
        telefono: user.telefono || "",
        email: user.email || "",
        web: user.web || "",
      });
    }
  }, [user]);

  const isDirty = user && (
    formData.razon_social !== (user.razon_social || "") ||
    formData.documento !== (user.documento || "") ||
    formData.direccion_fiscal !== (user.direccion_fiscal || "") ||
    formData.telefono !== (user.telefono || "") ||
    formData.web !== (user.web || "")
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      const updatedUser = await actualizarUsuario({
        razon_social: formData.razon_social || undefined,
        documento: formData.documento || undefined,
        direccion_fiscal: formData.direccion_fiscal || undefined,
        telefono: formData.telefono || undefined,
        web: formData.web || undefined,
      });

      setUser(updatedUser);
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
    isSaving,
    error,
    success,
    isDirty,
    handleChange,
    handleSubmit,
  };
};
