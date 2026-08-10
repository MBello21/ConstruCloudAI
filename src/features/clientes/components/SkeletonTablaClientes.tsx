import React from "react";

const SkeletonTablaClientes: React.FC = () => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-gray-200 text-left text-sm text-gray-500 bg-gray-50">
          <th className="p-3 font-medium">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
          </th>
          <th className="p-3 font-medium">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
          </th>
          <th className="p-3 font-medium">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-28" />
          </th>
          <th className="p-3 font-medium">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
          </th>
          <th className="p-3 font-medium">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
          </th>
          <th className="p-3 font-medium">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
          </th>
          <th className="p-3 font-medium">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
          </th>
          <th className="p-3 font-medium"></th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 7 }).map((_, i) => (
          <tr key={i} className="border-b border-gray-100 bg-white">
            <td className="px-3 py-5">
              <div className="w-28 h-4 bg-gray-200 animate-pulse rounded" />
            </td>
            <td className="px-3 py-5">
              <div className="space-y-1">
                <div className="w-32 h-4 bg-gray-200 animate-pulse rounded" />
                <div className="w-24 h-3 bg-gray-200 animate-pulse rounded" />
              </div>
            </td>
            <td className="px-3 py-5">
              <div className="space-y-1">
                <div className="w-28 h-4 bg-gray-200 animate-pulse rounded" />
                <div className="w-24 h-3 bg-gray-200 animate-pulse rounded" />
              </div>
            </td>
            <td className="px-3 py-5">
              <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
            </td>
            <td className="px-3 py-5">
              <div className="w-12 h-4 bg-gray-200 animate-pulse rounded" />
            </td>
            <td className="px-3 py-5">
              <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
            </td>
            <td className="px-3 py-5">
              <div className="w-16 h-6 bg-gray-200 animate-pulse rounded-full" />
            </td>
            <td className="px-3 py-5">
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-gray-200 animate-pulse rounded" />
                <div className="w-5 h-5 bg-gray-200 animate-pulse rounded" />
                <div className="w-5 h-5 bg-gray-200 animate-pulse rounded" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkeletonTablaClientes;
