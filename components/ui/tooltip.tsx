"use client";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <span
        className={cn(
          "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs text-white transition-all duration-200",
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        )}
      >
        {label}
      </span>
    </span>
  );
}
