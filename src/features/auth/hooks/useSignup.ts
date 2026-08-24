import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const useSignup = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "nombreCompleto") {
      setNombreCompleto(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    setError("");
  };

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError("El email es requerido");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El formato del email no es válido");
      return false;
    }
    if (!password.trim()) {
      setError("La contraseña es requerida");
      return false;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signup({ email, password, nombre_completo: nombreCompleto });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al crear la cuenta");
      }
      setIsLoading(false);
    }
  };

  return {
    email,
    nombreCompleto,
    password,
    confirmPassword,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
};
