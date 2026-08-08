import { ChevronLeft } from "lucide-react"

interface CabeceraFormulario {
    title: string
    subtitle: string
    onVolver: () => void;

}
export const CabeceraFormulario = ({ title, subtitle, onVolver }: CabeceraFormulario) => {
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
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}
