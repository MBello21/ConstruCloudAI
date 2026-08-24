export const SectionHeaderSkeleton = () => {
  return (
    <div className="flex w-full justify-between">
      <div className="w-[80%]">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2" />
        {/* Section skeleton */}
        <div className="h-8 bg-gray-200 rounded animate-pulse w-56 mb-2" />
        {/* Subtitle skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
      </div>
      <div className="flex justify-end items-end min-h-full w-[20%]">
        {/* Button skeleton */}
        <div className="h-9 bg-gray-200 rounded animate-pulse w-40" />
      </div>
    </div>
  );
};
