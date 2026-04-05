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
    "w-full border bg-[#06060f] px-4 py-3 font-body text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:ring-1 transition-colors";
  const stateClasses = error
    ? "border-neon-magenta focus:border-neon-magenta focus:ring-neon-magenta/50"
    : "border-border-subtle focus:border-neon-cyan focus:ring-neon-cyan/50";

  return (
    <div>
      {label && (
        <label className="mb-1.5 block font-tech text-[10px] tracking-[1px] uppercase text-muted">
          {label}
        </label>
      )}
      <input className={`${baseClasses} ${stateClasses} ${className}`} {...props} />
      {error && <p className="mt-1 font-tech text-[10px] text-neon-magenta">{error}</p>}
    </div>
  );
}
