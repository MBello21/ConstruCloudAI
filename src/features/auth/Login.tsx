import { Link } from "react-router";
import { HardHat, Mail, Lock, Loader } from "lucide-react";
import { Button } from "../../shared/components/Button";
import { useLogin } from "./hooks/useLogin";

export const Login = () => {
  const { email, password, isLoading, error, handleChange, handleSubmit } =
    useLogin();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-2xl shadow-sm p-12 max-w-md w-full mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-950 w-12 h-12 flex justify-center items-center rounded-lg shadow-sm mb-4">
            <HardHat className="text-white w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ConstruCloud AI</h1>
          <p className="text-sm text-slate-500 mt-1">Panel de Gestión</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Iniciar sesión
          </h2>
          <p className="text-sm text-slate-500">
            Accede a tu panel de gestión
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="tu@email.com"
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-6 justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          ¿No tienes cuenta?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-950 hover:text-blue-900 transition-colors"
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};
