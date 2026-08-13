import { pdf } from "@react-pdf/renderer";
import { useState } from "react";
import PresupuestoPDF from "./PresupuestoPDF";
import type { PresupuestoDetalle } from "../../types/presupuesto.types";
import type { Cliente } from "../../../clientes/cliente.types";

interface Props {
  presupuesto: PresupuestoDetalle;
  cliente?: Cliente | null;
  empresa?: {
    razon_social: string;
    direccion_fiscal?: string;
    telefono?: string;
    email?: string;
    documento?: string;
  };
}

export const PresupuestoPDFButton = ({
  presupuesto,
  cliente,
  empresa,
}: Props) => {
  const [generando, setGenerando] = useState(false);

  const handleDescargar = async () => {
    setGenerando(true);
    try {
      const blob = await pdf(
        <PresupuestoPDF
          presupuesto={presupuesto}
          cliente={cliente}
          empresa={empresa}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `presupuesto-${presupuesto.id ?? "nuevo"}.pdf`;
      document.body.appendChild(link); // ← añadir
      link.click();
      document.body.removeChild(link); // ← limpiar
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert(String(error));
    } finally {
      setGenerando(false);
    }
  };

  return (
    <button
      onClick={handleDescargar}
      disabled={generando}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      {generando ? "Generando..." : "Exportar PDF"}
    </button>
  );
};
