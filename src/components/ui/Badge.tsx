import type { HTMLAttributes } from "react";

const variants = {
  accent: "bg-accent/10 text-accent",
  secondary: "bg-secondary/10 text-secondary",
  gold: "bg-gold/10 text-gold",
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
} as const;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export default function Badge({
  variant = "accent",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
