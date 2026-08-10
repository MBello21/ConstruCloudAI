import React from "react";

const SkeletonFiltrosTabla: React.FC = () => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-8 bg-gray-200 rounded-full animate-pulse w-24"
        />
      ))}
    </div>
  );
};

export default SkeletonFiltrosTabla;
