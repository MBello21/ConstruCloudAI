import React from "react";

const CabeceraTableSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border-b border-gray-300 bg-white">
      {/* Title and subtitle skeleton */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          {/* Título skeleton */}
          <div className="h-6 bg-gray-200 rounded animate-pulse w-64" />
          {/* Subtítulo skeleton */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
        </div>

        {/* Filtros skeleton */}
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-8 bg-gray-200 rounded-full animate-pulse w-24"
            />
          ))}
        </div>
      </div>

      {/* Headers skeleton */}
      <div className="flex gap-3 px-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" /> {/* CÓDIGO */}
        <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" /> {/* PROYECTO */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24" /> {/* IMPORTE */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" /> {/* FECHA */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20" /> {/* ESTADO */}
      </div>
    </div>
  );
};

export default CabeceraTableSkeleton;
