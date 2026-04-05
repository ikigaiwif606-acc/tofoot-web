import type { HTMLAttributes } from "react";

const variants = {
  cyan: "tag tag-cyan",
  magenta: "tag tag-magenta",
  yellow: "tag tag-yellow",
  accent: "tag tag-cyan",
  secondary: "tag tag-magenta",
  gold: "tag tag-yellow",
  success: "tag tag-cyan",
  danger: "tag tag-magenta",
} as const;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export default function Badge({
  variant = "cyan",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
