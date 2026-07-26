import { Link } from "react-router";
import type { SectionHeaderConfig } from "../../types";
import { Button } from "./Button";
import { Plus } from "lucide-react";

interface SectionHeaderProps extends SectionHeaderConfig {
  onNuevoPresupuesto?: () => void;
}

export const SectionHeader = ({
  title,
  section,
  subtitle,
}: SectionHeaderProps) => {
  return (
    <div className="flex w-full justify-between">
      <div className="w-[80%]">
        <h2 className="font-sans text-sm text-neutral-500 font-semibold">
          {title}
        </h2>
        <h2 className="font-sans font-bold text-3xl">{section}</h2>
        <p className="text-neutral-400">{subtitle}</p>
      </div>
      <div className="flex justify-end items-end min-h-full w-[20%]">
        <Link to="/nuevo-presupuesto">
          <Button variant="primary">
            <Plus size={18} />
            Nuevo presupuesto
          </Button>
        </Link>
      </div>
    </div>
  );
};
