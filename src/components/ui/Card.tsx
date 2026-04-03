import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "feature";
  interactive?: boolean;
}

export default function Card({
  variant = "surface",
  interactive = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const base = variant === "feature" ? "card-feature" : "card";
  const hover = interactive ? "card-interactive cursor-pointer" : "";

  return (
    <div className={`${base} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
}
