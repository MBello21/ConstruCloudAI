import { Save, Loader, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../../../shared/components/Button";
import { useEmpresaForm } from "../hooks/useEmpresaForm";

export const EmpresaForm = () => {
  const { formData, isSaving, error, success, isDirty, handleChange, handleSubmit } = useEmpresaForm();

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">Datos de la empresa</h2>
        <p className="text-sm text-slate-600 mt-1">
          Aparecerán en tus presupuestos y facturas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Razón Social */}
          <div>
            <label htmlFor="razon_social" className="block text-sm font-medium text-slate-700 mb-2">
              Razón social
            </label>
            <input
              type="text"
              id="razon_social"
              name="razon_social"
              value={formData.razon_social}
              onChange={handleChange}
              placeholder="Tu empresa S.L."
              disabled={isSaving}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* CIF / NIF */}
          <div>
            <label htmlFor="documento" className="block text-sm font-medium text-slate-700 mb-2">
              CIF / NIF
            </label>
            <input
              type="text"
              id="documento"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              placeholder="A12345678"
              disabled={isSaving}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Dirección Fiscal */}
          <div>
            <label htmlFor="direccion_fiscal" className="block text-sm font-medium text-slate-700 mb-2">
              Dirección fiscal
            </label>
            <input
              type="text"
              id="direccion_fiscal"
              name="direccion_fiscal"
              value={formData.direccion_fiscal}
              onChange={handleChange}
              placeholder="Calle, número, CP y ciudad"
              disabled={isSaving}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
            />
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

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-600 placeholder-slate-400 bg-slate-50 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-1">Email de tu cuenta (no editable)</p>
          </div>

          {/* Web */}
          <div>
            <label htmlFor="web" className="block text-sm font-medium text-slate-700 mb-2">
              Web
            </label>
            <input
              type="url"
              id="web"
              name="web"
              value={formData.web}
              onChange={handleChange}
              placeholder="https://tuempresa.com"
              disabled={isSaving}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Messages */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-700">Datos actualizados correctamente</p>
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
