import { useState } from "react";
import { ConfigSidebar } from "./components/ConfigSidebar";
import { EmpresaSection } from "./components/EmpresaSection";
import { PerfilSection } from "./components/PerfilSection";
import { UsuariosSection } from "./components/UsuariosSection";

export const Configuracion = () => {
  const [activeSection, setActiveSection] = useState("empresa");

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1">
            <ConfigSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>

          {/* Content */}
          <div className="col-span-3">
            {activeSection === "empresa" && <EmpresaSection />}
            {activeSection === "perfil" && <PerfilSection />}
            {activeSection === "usuarios" && <UsuariosSection />}
            {!["empresa", "perfil", "usuarios"].includes(activeSection) && (
              <div className="bg-white rounded-lg border border-slate-200 p-8">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Próximamente
                  </h3>
                  <p className="text-slate-600 mt-1">
                    Esta sección estará disponible muy pronto
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
