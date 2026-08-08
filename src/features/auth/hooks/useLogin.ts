import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/login.action";

export const useLogin = () => {
  const navigate = useNavigate();
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
      const response = await login({ email, password });
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("token_type", response.token_type);
      navigate("/panel");
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
