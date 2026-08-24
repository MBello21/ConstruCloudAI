import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setError("");
  };

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError("El email es requerido");
      return false;
    }
    if (!password.trim()) {
      setError("La contraseña es requerida");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El formato del email no es válido");
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
      await login({ email, password });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al iniciar sesión");
      }
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
};
