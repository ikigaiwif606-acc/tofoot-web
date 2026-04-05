import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "border border-[rgba(0,255,255,0.4)] text-neon-cyan font-display text-[10px] tracking-[2px] uppercase hover:bg-[rgba(0,255,255,0.1)] hover:border-neon-cyan transition-all duration-200",
  secondary:
    "border border-border-subtle text-text-dim font-display text-[10px] tracking-[2px] uppercase hover:text-neon-cyan hover:border-border-default transition-all duration-200",
  danger:
    "border border-[rgba(255,0,255,0.4)] text-neon-magenta font-display text-[10px] tracking-[2px] uppercase hover:bg-[rgba(255,0,255,0.1)] transition-all duration-200",
} as const;

const sizes = {
  sm: "px-3 py-1.5",
  md: "px-5 py-2.5",
  lg: "px-6 py-3",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center ${variants[variant]} ${sizes[size]} ${className}`}
      style={
        variant === "primary"
          ? { textShadow: "0 0 8px #00ffff" }
          : variant === "danger"
            ? { textShadow: "0 0 8px #ff00ff" }
            : undefined
      }
      {...props}
    >
      {children}
    </button>
  );
}
