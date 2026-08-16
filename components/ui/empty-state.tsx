import { ReactNode } from "react";
import { Button } from "./button";

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-border bg-white/60 px-8 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-display font-semibold text-ink">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      </div>
      {actionLabel && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
