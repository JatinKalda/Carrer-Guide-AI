"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Toast({ show, message }: { show: boolean; message: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-glow"
        >
          <CheckCircle2 className="h-4 w-4 text-success" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
