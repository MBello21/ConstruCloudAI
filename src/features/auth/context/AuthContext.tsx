import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/login.action";
import { signup } from "../services/signup.action";
import type { LoginRequest } from "../services/login.action";
import type { SignupRequest } from "../services/signup.action";
import { useGlobalLoading } from "../../../shared/hooks/useGlobalLoading";
import { getUser } from "../services/get-user.action";

export interface User {
  id: number;
  email: string;
  razon_social: string | null;
  direccion_fiscal: string | null;
  documento: string | null;
  telefono: string | null;
  web: string | null;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (credentials: SignupRequest) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { registerLoading, resolveLoading } = useGlobalLoading();

  useEffect(() => {
    const initializeAuth = async () => {
      registerLoading("auth");
      try {
        const savedToken = localStorage.getItem("access_token");
        if (savedToken) {
          setToken(savedToken);
          const data = await getUser()
          setUser(data)
        }
        setIsLoading(false);
      } finally {
        resolveLoading("auth");
      }
    };

    initializeAuth();
  }, [registerLoading, resolveLoading]);

  const handleLogin = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await login(credentials);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("token_type", response.token_type);
      setToken(response.access_token)
      navigate("/panel");
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      setToken(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  console.log(user)
  const handleSignup = async (credentials: SignupRequest) => {
    setIsLoading(true);
    try {
      const response = await signup(credentials);
      setToken(response.access_token);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("token_type", response.token_type);
      navigate("/panel");
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      setToken(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    navigate("/login");
  };

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated: !!token,
    isLoading,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
