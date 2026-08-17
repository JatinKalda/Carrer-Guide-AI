"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";
import { chatSuggestions } from "@/lib/data";
import { Bot, Mic, Paperclip, Send, Sparkles, Plus, MessageSquare, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "ai"; text: string };

const history = [
  "Backend Engineer roadmap at FAANG",
  "Improve my LinkedIn headline",
  "System design interview prep",
  "Salary negotiation tips",
];

export default function AiCoachPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hello! I'm your CareerOS AI Coach. How can I help with your career today?" },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  async function ask(text: string) {
    if (!text.trim() || streaming) return;
    setError(null);

    // Snapshot history BEFORE appending new user message (exclude greeting for context)
    const historySnapshot = messages.slice(1); // skip initial greeting

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setStreaming(true);

    // Add empty AI placeholder
    setMessages((m) => [...m, { role: "ai", text: "" }]);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historySnapshot }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const captured = accumulated;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "ai", text: captured };
          return copy;
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Failed to get a response. Please try again.";
      setError(msg);
      // Remove the empty AI placeholder on error
      setMessages((m) => m.slice(0, -1));
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  return (
    <>
      <Navbar title="AI Career Coach" subtitle="Your personal AI career assistant" />
      <main className="flex h-[calc(100vh-80px)] gap-6 p-6 lg:p-10">
        {/* History sidebar */}
        <Card className="hidden w-64 shrink-0 md:flex md:flex-col">
          <div className="p-4">
            <button
              onClick={() => {
                abortRef.current?.abort();
                setMessages([{ role: "ai", text: "Hello! I'm your CareerOS AI Coach. How can I help with your career today?" }]);
                setError(null);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient py-2.5 text-sm font-medium text-white shadow-soft"
            >
              <Plus className="h-4 w-4" /> New Chat
            </button>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
            <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wide text-muted">
              Career Memory
            </p>
            {history.map((h) => (
              <button
                key={h}
                onClick={() => ask(h)}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-muted transition-colors hover:bg-slate-50 hover:text-ink"
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{h}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat */}
        <Card className="flex flex-1 flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-6">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    m.role === "ai" ? "bg-brand-gradient text-white" : "bg-slate-200 text-ink"
                  )}
                >
                  {m.role === "ai" ? <Bot className="h-4 w-4" /> : "JD"}
                </div>
                <div
                  className={cn(
                    "max-w-[75%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    m.role === "ai"
                      ? "bg-slate-100 text-ink rounded-tl-md"
                      : "bg-primary text-white rounded-tr-md"
                  )}
                >
                  {m.text || (streaming && i === messages.length - 1 ? "" : "…")}
                  {m.role === "ai" && streaming && i === messages.length - 1 && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-ink/60 align-middle" />
                  )}
                </div>
              </div>
            ))}

            {/* Error banner */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {messages.length === 1 && (
              <div className="grid gap-2 sm:grid-cols-2">
                {chatSuggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => ask(q)}
                    className="flex items-center gap-2 rounded-2xl border border-border/70 p-3.5 text-left text-sm text-ink transition-colors hover:border-primary-200 hover:bg-primary-50"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" /> {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-border/70 p-4"
          >
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border text-muted hover:text-ink">
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your career..."
              disabled={streaming}
              className="h-11 flex-1 rounded-2xl border border-border bg-slate-50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:opacity-60"
            />
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border text-muted hover:text-ink">
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </Card>
      </main>
    </>
  );
}
