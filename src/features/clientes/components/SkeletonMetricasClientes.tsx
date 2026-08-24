import React from "react";

const SkeletonMetricasClientes: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded w-28 mb-3" />
          <div className="h-8 bg-gray-200 rounded w-12 mb-3" />
          <div className="h-3 bg-gray-200 rounded w-32" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonMetricasClientes;
