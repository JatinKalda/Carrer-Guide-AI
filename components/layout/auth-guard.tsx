"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasSession } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!hasSession()) {
      router.replace("/login");
    } else {
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
