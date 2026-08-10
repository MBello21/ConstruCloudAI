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

type AuthState = "loading" | "authenticated" | "unauthenticated";

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
  const [authState, setAuthState] = useState<AuthState>("loading");
  const { registerLoading, resolveLoading } = useGlobalLoading();

  useEffect(() => {
    const initializeAuth = async () => {
      registerLoading("auth");
      try {
        const savedToken = localStorage.getItem("access_token");
        if (!savedToken) {
          setAuthState("unauthenticated");
          return;
        }
        setToken(savedToken);
        const data = await getUser();
        setUser(data);
        setAuthState("authenticated");
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        setToken(null);
        setUser(null);
        setAuthState("unauthenticated");
      } finally {
        resolveLoading("auth");
      }
    };

    initializeAuth();
  }, [registerLoading, resolveLoading]);

  const handleLogin = async (credentials: LoginRequest) => {
    try {
      const response = await login(credentials);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("token_type", response.token_type);
      setToken(response.access_token);
      const data = await getUser();
      setUser(data);
      setAuthState("authenticated");
      navigate("/panel");
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      setToken(null);
      setUser(null);
      setAuthState("unauthenticated");
      throw error;
    }
  };

  const handleSignup = async (credentials: SignupRequest) => {
    try {
      const response = await signup(credentials);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("token_type", response.token_type);
      setToken(response.access_token);
      const data = await getUser();
      setUser(data);
      setAuthState("authenticated");
      navigate("/panel");
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      setToken(null);
      setUser(null);
      setAuthState("unauthenticated");
      throw error;
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    setAuthState("unauthenticated");
    navigate("/login");
  };

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated: authState === "authenticated",
    isLoading: authState === "loading",
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