import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getUsuarios } from "../services/get-usuarios.action";
import { createUsuario } from "../services/create-usuario.action";
import { deleteUsuario } from "../services/delete-usuario.action";
import type { User } from "../../auth/context/AuthContext";
import { useAuth } from "../../auth/context/AuthContext";

interface FormData {
  email: string;
  password: string;
  nombre_completo: string;
  rol: string;
}

export const useGestionUsuarios = () => {
  const { user: currentUser } = useAuth();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    nombre_completo: "",
    rol: "usuario",
  });

  const fetchUsuarios = async () => {
    try {
      setIsLoading(true);
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCrearUsuario = async () => {
    if (!formData.email.trim()) {
      toast.error("El email es requerido");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("La contraseña es requerida");
      return;
    }

    setIsCreating(true);
    try {
      await createUsuario({
        email: formData.email,
        password: formData.password,
        nombre_completo: formData.nombre_completo,
        rol: formData.rol,
      });
      toast.success("Usuario creado correctamente");
      setFormData({
        email: "",
        password: "",
        nombre_completo: "",
        rol: "usuario",
      });
      await fetchUsuarios();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      toast.error(message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleEliminarUsuario = async (id: number) => {
    try {
      await deleteUsuario(id);
      toast.success("Usuario eliminado correctamente");
      await fetchUsuarios();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      toast.error(message);
    }
  };

  const generarPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password }));
  };

  const setRol = (rol: string) => {
    setFormData((prev) => ({ ...prev, rol }));
  };

  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    usuarios,
    isLoading,
    isCreating,
    formData,
    handleCrearUsuario,
    handleEliminarUsuario,
    generarPassword,
    setRol,
    updateFormField,
    currentUserId: currentUser?.id,
  };
};
