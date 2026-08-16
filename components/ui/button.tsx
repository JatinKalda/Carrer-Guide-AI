"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, useState, type ButtonHTMLAttributes, type MouseEvent } from "react";

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-gradient text-white shadow-premium hover:shadow-glow hover:-translate-y-0.5",
        secondary:
          "bg-white text-ink border border-border shadow-soft hover:border-primary-300 hover:-translate-y-0.5",
        ghost: "text-muted hover:bg-slate-100 hover:text-ink",
        danger: "bg-danger text-white hover:bg-red-600",
        outline: "border border-border bg-transparent hover:bg-slate-50",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-[52px] px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, onClick, children, ...props }, ref) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((r) => [
        ...r,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
      ]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
      onClick?.(e);
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-white/40 animate-ripple"
            style={{ left: r.x - 8, top: r.y - 8, width: 16, height: 16 }}
          />
        ))}
      </button>
    );
  }
);
Button.displayName = "Button";
