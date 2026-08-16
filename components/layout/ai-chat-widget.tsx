"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

const initialMessages = [
  { role: "ai", text: "Hi John! 👋 How can I help with your career today?" },
];

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "Great question! Based on your profile, I'd focus on system design and one strong backend project first — want a step-by-step plan?",
        },
      ]);
    }, 1400);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-glow"
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-40 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-card border border-border/70 bg-card shadow-glow"
          >
            <div className="flex items-center gap-2 border-b border-border/70 bg-brand-gradient px-4 py-4 text-white">
              <Sparkles className="h-4 w-4" />
              <div>
                <p className="text-sm font-semibold">AI Career Coach</p>
                <p className="text-[11px] text-white/75">Always online</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm",
                      m.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-subtle text-ink rounded-bl-md"
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-subtle px-3.5 py-2.5 w-fit">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border/70 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your career..."
                className="h-10 flex-1 rounded-xl border border-border bg-subtle px-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-transform active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
