"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Tabs({
  tabs,
  defaultTab,
  onChange,
}: {
  tabs: string[];
  defaultTab?: string;
  onChange?: (tab: string) => void;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]);
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl bg-slate-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActive(tab);
            onChange?.(tab);
          }}
          className={cn(
            "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200",
            active === tab ? "bg-white text-ink shadow-soft" : "text-muted hover:text-ink"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
