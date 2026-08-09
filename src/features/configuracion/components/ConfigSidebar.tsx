import { Building2, User, Bell, Globe, Shield, CreditCard } from "lucide-react";

export interface ConfigSection {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

const sections: ConfigSection[] = [
  {
    id: "empresa",
    icon: Building2,
    label: "Empresa",
    description: "Datos fiscales y de contacto",
  },
  {
    id: "perfil",
    icon: User,
    label: "Perfil",
    description: "Tu información personal",
  },
  {
    id: "notificaciones",
    icon: Bell,
    label: "Notificaciones",
    description: "Email y alertas",
  },
  {
    id: "apariencia",
    icon: Globe,
    label: "Apariencia",
    description: "Tema e idioma",
  },
  {
    id: "seguridad",
    icon: Shield,
    label: "Seguridad",
    description: "Contraseña y 2FA",
  },
  {
    id: "facturacion",
    icon: CreditCard,
    label: "Facturación",
    description: "Plan y método de pago",
  },
];

interface ConfigSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const ConfigSidebar = ({ activeSection, onSectionChange }: ConfigSidebarProps) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 h-fit">
      <nav className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-start gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                isActive
                  ? "bg-blue-950 text-white"
                  : "text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isActive ? "text-white" : "text-slate-500"}`} />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{section.label}</span>
                <span className={`text-xs ${isActive ? "text-blue-100" : "text-slate-500"}`}>
                  {section.description}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
