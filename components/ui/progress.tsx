"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Progress({
  value,
  className,
  barClassName,
  tone = "primary",
}: {
  value: number;
  className?: string;
  barClassName?: string;
  tone?: "primary" | "success" | "danger" | "accent";
}) {
  const colors = {
    primary: "bg-primary",
    success: "bg-success",
    danger: "bg-danger",
    accent: "bg-accent",
  };
  return (
    <div className={cn("h-2 w-full rounded-pill bg-slate-100 overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={cn("h-full rounded-pill", colors[tone], barClassName)}
      />
    </div>
  );
}
