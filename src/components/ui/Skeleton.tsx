export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`card ${className}`}
      style={{ padding: 0 }}
    >
      <div className="skeleton" style={{ aspectRatio: "16/9" }} />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-3 w-24" />
      </div>
    </div>
  );
}

export function SkeletonRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 py-3 ${className}`}>
      <div className="skeleton h-[50px] w-[70px] shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-3 w-28" />
      </div>
    </div>
  );
}

export function SkeletonLine({ width = "100%", height = "12px" }: { width?: string; height?: string }) {
  return <div className="skeleton" style={{ width, height }} />;
}
