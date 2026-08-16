import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const tones = {
  primary: "bg-primary-50 text-primary-700",
  accent: "bg-accent-50 text-accent-600",
  success: "bg-success-50 text-success",
  danger: "bg-danger-50 text-danger",
  neutral: "bg-slate-100 text-muted",
};

export function Badge({
  className,
  tone = "primary",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
