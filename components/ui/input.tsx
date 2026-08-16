import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, error, ...props }, ref) => (
    <div className="w-full">
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-12 rounded-2xl border border-border bg-input px-4 text-sm text-ink placeholder:text-slate-400 transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
            icon && "pl-11",
            error && "border-danger focus-visible:ring-danger/20",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
