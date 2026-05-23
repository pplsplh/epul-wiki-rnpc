export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-4 ${className}`}>
      <div className="h-px flex-1 bg-parchment-dark" />
      <span className="text-stone text-sm">✦</span>
      <div className="h-px flex-1 bg-parchment-dark" />
    </div>
  );
}
