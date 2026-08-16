import { cn } from "@/lib/utils";

export function Avatar({
  initials,
  className,
  size = "md",
}: {
  initials: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-16 w-16 text-lg" };
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-brand-gradient font-display font-semibold text-white shadow-soft",
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
