import { Link } from "react-router";
import type { SectionHeaderConfig } from "../types";
import { Button } from "./Button";
import { Plus } from "lucide-react";

export const SectionHeader = ({
  title,
  section,
  subtitle,
  pathname,
}: SectionHeaderConfig) => {
  return (
    <div className="flex w-full justify-between">
      <div className="w-[80%]">
        <h2 className="font-sans uppercase text-xs text-neutral-500 font-semibold">
          {title}
        </h2>
        <h3 className="font-sans font-bold text-[30px]">{section}</h3>
        <p className="text-neutral-400 text-[15px]">{subtitle}</p>
      </div>
      <div className="flex justify-end items-end min-h-full w-[20%]">
        {pathname === "/" && (
          <Link to="/nuevo-presupuesto">
            <Button variant="primary">
              <Plus size={18} />
              Nuevo presupuesto
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
