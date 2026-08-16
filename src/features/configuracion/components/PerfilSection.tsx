import { useState } from "react";
import { Save, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../../../shared/components/Button";
import { useAuth } from "../../auth/context/AuthContext";
import { putUser } from "../services/put-user.action";
import { toast } from "sonner";

export const PerfilSection = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    nombre_completo: user?.nombre_completo || "",
    cargo: user?.cargo || "",
    telefono: user?.telefono || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isDirty = JSON.stringify(formData) !== JSON.stringify({
    nombre_completo: user?.nombre_completo || "",
    cargo: user?.cargo || "",
    telefono: user?.telefono || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess(false);

    try {
      const updatedUser = await putUser({
        nombre_completo: formData.nombre_completo,
        cargo: formData.cargo,
        telefono: formData.telefono,
      });
      setUser(updatedUser);
      setSuccess(true);
      toast.success("Perfil actualizado correctamente");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (nombre: string | null): string => {
    if (!nombre) return "?";
    return nombre
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">Tu perfil</h2>
        <p className="text-sm text-slate-600 mt-1">
          Información personal y de contacto
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
          <div className="w-16 h-16 rounded-full bg-blue-950 text-white flex items-center justify-center text-lg font-semibold">
            {getInitials(formData.nombre_completo)}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">{user?.email}</p>
            <p className="text-xs text-slate-500 mt-1">
              {user?.rol === "admin" ? "Administrador" : user?.rol === "gestor" ? "Gestor" : "Usuario"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Nombre Completo */}
          <div>
            <label htmlFor="nombre_completo" className="block text-sm font-medium text-slate-700 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre_completo"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              disabled={isSaving}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Cargo */}
          <div>
            <label htmlFor="cargo" className="block text-sm font-medium text-slate-700 mb-2">
              Cargo
            </label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              placeholder="Ej: Gestor de Proyectos"
              disabled={isSaving}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-600 placeholder-slate-400 bg-slate-50 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-1">Email de tu cuenta (no editable)</p>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-slate-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+34 600 123 456"
              disabled={isSaving}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-700">Perfil actualizado correctamente</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Button */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <Button
            type="submit"
            variant="primary"
            disabled={!isDirty || isSaving}
            className={!isDirty || isSaving ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isSaving ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar cambios
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
