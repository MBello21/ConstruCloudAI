import { ChevronLeft } from "lucide-react"

interface CabeceraFormularioProps {
    title?: string
    subtitle?: string
    onVolver: () => void;
    fase?: "formulario" | "revision" | "guardado";
}

export const CabeceraFormulario = ({
    title = "Nuevo presupuesto",
    subtitle = "Introduzca un titulo y una descripción",
    onVolver,
    fase = "formulario"
}: CabeceraFormularioProps) => {
    const getTitleForFase = (): { title: string; subtitle: string } => {
        switch (fase) {
            case "revision":
                return {
                    title: "Revisar presupuesto generado",
                    subtitle: "Edita la estructura generada por IA antes de guardar",
                };
            case "guardado":
                return {
                    title: "Presupuesto guardado",
                    subtitle: "Tu presupuesto ha sido creado exitosamente",
                };
            default:
                return { title, subtitle };
        }
    };

    const { title: displayTitle, subtitle: displaySubtitle } = getTitleForFase();

    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto border-b border-gray-200 px-6 py-4 mb-8">
                <button
                    onClick={onVolver}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 focus:outline-none"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Volver a presupuestos
                </button>
                <h1>{displayTitle}</h1>
                <p>{displaySubtitle}</p>
            </div>
        </div>
    )
}
