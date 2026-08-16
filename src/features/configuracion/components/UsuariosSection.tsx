import {
  Mail,
  Lock,
  Trash2,
  Loader,
  Shield,
  Briefcase,
  User,
} from "lucide-react";
import { Button } from "../../../shared/components/Button";
import { useGestionUsuarios } from "../hooks/useGestionUsuarios";

const rolConfig: Record<
  string,
  { label: string; description: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  admin: {
    label: "Administrador",
    description: "Acceso total, puede crear y gestionar usuarios",
    icon: Shield,
    color: "bg-blue-100 text-blue-700 border-blue-300",
  },
  gestor: {
    label: "Gestor",
    description: "Gestiona presupuestos, obras y clientes",
    icon: Briefcase,
    color: "bg-green-100 text-green-700 border-green-300",
  },
  usuario: {
    label: "Usuario",
    description: "Solo consulta de información",
    icon: User,
    color: "bg-gray-100 text-gray-700 border-gray-300",
  },
};

export const UsuariosSection = () => {
  const {
    usuarios,
    isLoading,
    isCreating,
    formData,
    handleCrearUsuario,
    handleEliminarUsuario,
    generarPassword,
    setRol,
    updateFormField,
    currentUserId,
  } = useGestionUsuarios();

  const getInitials = (nombre: string | null, email: string): string => {
    if (nombre && nombre.trim()) {
      return nombre
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const getRolBadgeColor = (rol: string | null): string => {
    switch (rol) {
      case "admin":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "gestor":
        return "bg-green-100 text-green-700 border border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getRolLabel = (rol: string | null): string => {
    switch (rol) {
      case "admin":
        return "Administrador";
      case "gestor":
        return "Gestor";
      case "usuario":
        return "Usuario";
      default:
        return rol || "Usuario";
    }
  };

  return (
    <div className="space-y-6">
      {/* Nuevo usuario */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">Nuevo usuario</h2>
          <p className="text-sm text-slate-600 mt-1">
            Crea la cuenta de un miembro del equipo y asígnale su rol...
          </p>
        </div>

        <div className="space-y-6">
          {/* Email y Contraseña */}
          <div className="grid grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateFormField("email", e.target.value)}
                  placeholder="usuario@empresa.com"
                  disabled={isCreating}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña inicial
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    id="password"
                    value={formData.password}
                    onChange={(e) => updateFormField("password", e.target.value)}
                    placeholder="••••••••"
                    disabled={isCreating}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />
                </div>
                <Button
                  type="button"
                  onClick={generarPassword}
                  disabled={isCreating}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generar
                </Button>
              </div>
            </div>
          </div>

          {/* Nombre completo */}
          <div>
            <label htmlFor="nombre_completo" className="block text-sm font-medium text-slate-700 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre_completo"
              value={formData.nombre_completo}
              onChange={(e) => updateFormField("nombre_completo", e.target.value)}
              placeholder="Juan Pérez García"
              disabled={isCreating}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Rol en la empresa
            </label>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(rolConfig).map(([rolKey, config]) => {
                const RolIcon = config.icon;
                const isSelected = formData.rol === rolKey;
                return (
                  <button
                    key={rolKey}
                    type="button"
                    onClick={() => setRol(rolKey)}
                    disabled={isCreating}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? "border-blue-950 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <RolIcon className="w-5 h-5" />
                      <span className="font-medium text-slate-900">{config.label}</span>
                    </div>
                    <p className="text-xs text-slate-600">{config.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <Button
              type="button"
              onClick={handleCrearUsuario}
              disabled={isCreating || !formData.email.trim() || !formData.password.trim()}
              variant="primary"
              className={isCreating || !formData.email.trim() || !formData.password.trim() ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isCreating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear usuario"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Usuarios de la empresa */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">Usuarios de la empresa</h2>
          <p className="text-sm text-slate-600 mt-1">
            {usuarios.length} cuenta{usuarios.length !== 1 ? "s" : ""} activa{usuarios.length !== 1 ? "s" : ""}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-6 h-6 animate-spin text-slate-400 mr-2" />
            <p className="text-slate-600">Cargando usuarios...</p>
          </div>
        ) : usuarios.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-600">No hay usuarios registrados</p>
          </div>
        ) : (
          <div className="space-y-4">
            {usuarios.map((usuario, index) => (
              <div key={usuario.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-blue-950 text-white flex items-center justify-center font-semibold text-sm">
                      {getInitials(usuario.nombre_completo, usuario.email)}
                    </div>

                    {/* Info */}
                    <div>
                      <p className="font-medium text-slate-900">
                        {usuario.nombre_completo || usuario.email}
                      </p>
                      <p className="text-sm text-slate-500">{usuario.email}</p>
                    </div>
                  </div>

                  {/* Rol y Acciones */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRolBadgeColor(
                        usuario.rol
                      )}`}
                    >
                      {getRolLabel(usuario.rol)}
                    </span>

                    {currentUserId !== usuario.id && (
                      <button
                        onClick={() => handleEliminarUsuario(usuario.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {index < usuarios.length - 1 && (
                  <div className="border-t border-slate-100" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
