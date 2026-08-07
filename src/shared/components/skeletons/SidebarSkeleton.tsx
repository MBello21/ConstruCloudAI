export const SidebarSkeleton = () => {
  return (
    <aside className="flex flex-col border-r border-slate-200 max-h-full h-full">
      {/* Header skeleton */}
      <div className="flex items-center p-3 border-b border-slate-200 h-16">
        <div className="flex gap-3 h-full w-70.5">
          {/* Logo placeholder */}
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse shrink-0" />
          {/* Title and subtitle placeholder */}
          <div className="flex flex-col justify-center gap-2 flex-1">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      </div>

      {/* Navigation section skeleton */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {/* Navigation title placeholder */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-4" />

        {/* Navigation items skeleton */}
        <ul className="space-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index}>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md">
                {/* Icon placeholder */}
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse shrink-0" />
                {/* Label placeholder */}
                <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
