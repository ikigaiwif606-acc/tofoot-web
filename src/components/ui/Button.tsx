import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-accent text-white font-semibold hover:bg-accent-hover transition-colors",
  secondary:
    "border border-card-border text-foreground hover:bg-surface-hover transition-colors",
  danger:
    "bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 transition-colors",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-lg",
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
      {...props}
    >
      {children}
    </button>
  );
}
