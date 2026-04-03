import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  const baseClasses =
    "w-full rounded-lg border bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 transition-colors";
  const stateClasses = error
    ? "border-danger focus:border-danger focus:ring-danger/50"
    : "border-card-border focus:border-accent focus:ring-accent/50";

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-muted">
          {label}
        </label>
      )}
      <input className={`${baseClasses} ${stateClasses} ${className}`} {...props} />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
