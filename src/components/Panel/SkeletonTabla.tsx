import { ChevronLeft, ChevronRight } from "lucide-react";

export const SkeletonTabla = () => {
  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-left text-sm text-gray-500 bg-gray-50">
            <th className="p-3 font-medium">CÓDIGO</th>
            <th className="p-3 font-medium">PROYECTO / CLIENTE</th>
            <th className="p-3 font-medium">IMPORTE</th>
            <th className="p-3 font-medium">FECHA</th>
            <th className="p-3 font-medium">ESTADO</th>
            <th className="p-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 7 }).map((_, i) => (
            <tr key={i} className="border-b border-gray-100 bg-white">
              <td className="px-3 py-5">
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
              </td>
              <td className="px-3 py-5">
                <div className="w-48 h-4 bg-gray-200 animate-pulse rounded" />
              </td>
              <td className="px-3 py-5">
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
              </td>
              <td className="px-3 py-5">
                <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
              </td>
              <td className="px-3 py-5">
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
              </td>
              <td className="px-3 py-5">
                <div className="w-12 h-4 bg-gray-200 animate-pulse rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-4 bg-white border-t border-gray-300">
        <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
        <div className="flex gap-2">
          <button
            disabled
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Página anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            disabled
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Página siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};
